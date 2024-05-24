import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Modal,
  Pressable,
  Text,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import MapView, {
  MapPolygon,
  Marker,
  Polygon,
  Polyline,
} from "react-native-maps";
import { Divider, Switch } from "react-native-paper";
import ButtonCustom from "../components/common/ButtonCustom";
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";
import axios from "axios";
import { setItem } from "../utils/AsyncStorage";

function MapDriver({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [Payment, setPayment] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [driver, setdriver] = useState();

  const coords = useMemo(() => {
    return route?.params?.user?.currentLocation;
  }, [route?.params]);
  const destination = useMemo(() => {
    return route?.params?.user?.destination;
  }, [route?.params]);
  const email = useMemo(() => {
    return route?.params?.user?.email;
  }, [route?.params]);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  async function getDriver() {
    await axios
      .get("https://ubeback.onrender.com/user/driver")
      .then((res) => {
        setdriver(res.data);
        setItem("driver", res.data);
      })
      .catch((error) => {
        Alert.alert(error?.response?.data?.message);
        navigation.navigate("Main");
      });
  }
  useEffect(() => {
    getDriver();
  }, []);
  async function updateDriver() {
    await axios
      .patch("https://ubeback.onrender.com/user/updateDriver", {
        email,
        driver_id: driver._id,
      })
      .then(async(res) => {
        await setItem("user",res.data)
        navigation.navigate("Main", { user: res.data })
      })
      .catch((error) => console.log(error, "error"));
  }
  useEffect(() => {
    getDriver();
  }, []);

  return (
    <AutocompleteDropdownContextProvider>
      <View style={styles.container}>
        {/* {Platform.OS != 'web'?<MapView style={styles.map} />:<></>} */}

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coords?.lat,
            longitude: coords?.lng,
            latitudeDelta: 0.0745,
            longitudeDelta: 0.0345,
          }}
        >
          <Marker
            coordinate={{
              latitude: coords?.lat,
              longitude: coords?.lng,
            }}
            pinColor={"black"} // any color
            title={"your location"}
            description={""}
          />

          <Marker
            coordinate={{
              latitude: destination?.lat,
              longitude: destination?.lng,
            }}
            pinColor={"black"} // any color
            title={"your location"}
            description={""}
          />
          {/* {Boolean(Destination?.position) && Boolean(coords) && (
            <Polyline
              strokeColor="#000"
              strokeWidth={6}
              coordinates={[
                {
                  latitude: Destination?.position?.lat,
                  longitude: Destination?.position?.lng,
                },
                {
                  latitude: coords?.latitude,
                  longitude: coords?.longitude,
                },
              ]}
              tappable={true}
            />
          )} */}
        </MapView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={[styles.modal, { height: 550 }]}>
            <View style={styles.modalView}>
              <Pressable
                onPress={() => navigation.navigate("Main")}
                style={{
                  backgroundColor: "lightgray",
                  padding: 10,
                  borderRadius: "50%",
                
                }}
              >
                <Icon name="arrow-left" size={20} color="#000" />
              </Pressable>
              <Text style={styles.modalText}>choose a ride</Text>

            </View>
            <Divider style={{ marginVertical: 20 }} />

            <View style={styles.driverContainer}>
              <Image
                source={require("../assets/how-to-become-an-uber-driver.webp")}
                style={{ width: 100, height: 100 }}
              />
              <View>
                <Text style={styles.textStyle}>{driver?.name}</Text>

                <ButtonCustom
                  styleButton={[styles.button, styles.buttonRecommended]}
                  onPress={() => {
                    if ("") {
                      navigation.navigate("Time");
                      setModalVisible(false);
                    }
                  }}
                >
                  <Text style={{ color: "white" }}>recommended</Text>
                </ButtonCustom>
              </View>
            </View>
            <ButtonCustom
              styleButton={[styles.button, styles.buttonPayment]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setPayment(!Payment);
              }}
            >
              <Icon name="credit-card" color={"black"} size={20} />
              <Text style={{ color: "black" }}>Add Payment Method</Text>
              <Icon
                name="arrow-right"
                color={"black"}
                size={20}
                style={{ alignSelf: "flex-end" }}
              />
            </ButtonCustom>
            <ButtonCustom
              styleButton={[styles.button, styles.buttonChooseRider]}
              onPress={() => {
                updateDriver();
              }}
            >
              <Text style={{ color: "white" }}>Choose Uber X Saver</Text>
            </ButtonCustom>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={Payment}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setPayment(!Payment);
          }}
        >
          <View style={[styles.modal, styles.modelPayment]}>
            <View style={styles.modalPaymentheader}>
              <Icon
                name="close"
                size={30}
                color="black"
                style={{ alignSelf: "flex-start" }}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.modalText}>Payment options</Text>
            </View>
            <Divider style={{ marginVertical: 20 }} />
            <View style={{}}>
              <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Uber cash
                </Text>
                <ButtonCustom
                  styleButton={[
                    styles.button,
                    styles.buttonPayment,
                    {
                      backgroundColor: "transparent",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    },
                  ]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setPayment(!Payment);
                  }}
                >
                  <Icon name="credit-card" color={"black"} size={20} />
                  <Text style={{ color: "black" }}>Add Payment Method</Text>

                  <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </ButtonCustom>
              </View>
              <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Payment Method
                </Text>
                <ButtonCustom
                  styleButton={[
                    styles.button,
                    styles.buttonPayment,
                    {
                      backgroundColor: "transparent",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    },
                  ]}
                  onPress={() => {
                    setPayment(false);
                    navigation.navigate("paymentMethod", {
                      user: route?.params?.user,
                    });
                  }}
                >
                  <Ionicons name="add" color={"black"} size={20} />
                  <Text style={{ color: "black" }}>Add Payment Method</Text>
                </ButtonCustom>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </AutocompleteDropdownContextProvider>
  );
}
export default MapDriver;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  modal: {
    backgroundColor: "white",
    height: 450,
    marginTop: "auto",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  modalLage: {
    backgroundColor: "white",
    height: 700,
    marginTop: "auto",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  modalText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  textStyle: {
    fontSize: 16,
    color: "gray",
  },
  inputSmall: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "lightgray",
    padding: 20,
    margin: 20,
    borderRadius: 8,
    width: "100%",
  },
  modalLargeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
  },
  currentLocation: {
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 16,
    padding: 20,
    margin: 20,
  },
  modalView:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
  },
  driverContainer: {
    borderColor: "black",
    borderWidth: 5,
    borderStyle: "solid",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonRecommended: {
    backgroundColor: "blue",
    padding: 10,
  },
  buttonPayment: {
    flexDirection: "row",
    gap: 5,
    width: "100%",
    alignItems: "center",
  },
  modelPayment: {
    height: 670,
    backgroundColor: "white",

    marginTop: "auto",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  modalPaymentheader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "100%",
  },
  buttonChooseRider: {
    backgroundColor: "black",
  },
});
