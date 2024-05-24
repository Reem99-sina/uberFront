import { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Modal,
  Pressable,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView, {
  MapPolygon,
  Marker,
  Polygon,
  Polyline,
} from "react-native-maps";
import { Divider } from "react-native-paper";
import ButtonCustom from "../components/common/ButtonCustom";
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
} from "react-native-autocomplete-dropdown";
import { getItem, setItem } from "../utils/AsyncStorage";

function MapPage({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalLargeVisible, setmodalLargeVisible] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [loading, setLoading] = useState(false);
  let [location, setLocation] = useState("search");
  const [selectedItem, setSelectedItem] = useState({
    latitudeDelta: 0.0722,
    longitudeDelta: 0.0321,
  });
  let [Destination, setDestination] = useState("Where to ?");
  const { coords } = route?.params?.location;
  const searchRef = useRef(null);
  const dropdownController = useRef(null);
  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();

    if (typeof q !== "string" || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    const response = await fetch(
      `https://geocode.search.hereapi.com/v1/geocode?q=${filterToken}&apiKey=aTvCJcMYTR13okJY7uTe_yQkd16OK8Bs1gBlWr2R8yk`,
      { method: "get" }
    );
    const { items } = await response.json();

    setSuggestionsList(items);
    setLoading(false);
  }, []);
  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  const onOpenSuggestionsList = useCallback(
    (isOpened) => {
      if (isOpened) {
        dropdownController.current.toggle();
      }
      //
    },
    [suggestionsList]
  );
  async function getDestinationstore() {
    setDestination(await getItem("destination"));
  }
  useEffect(() => {
    if (Boolean(Destination)) {
      setmodalLargeVisible(false);
      setModalVisible(true);
      setSelectedItem({ latitudeDelta: 1.08, longitudeDelta: 1.98 });
      setItem("destination", Destination);
    }
  }, [Destination]);
  useEffect(() => {
    getDestinationstore();
  }, []);
  
  return (
    <AutocompleteDropdownContextProvider>
      <View style={styles.container}>
        {/* {Platform.OS != 'web'?<MapView style={styles.map} />:<></>} */}

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coords?.latitude,
            longitude: coords?.longitude,
            latitudeDelta: selectedItem?.latitudeDelta,
            longitudeDelta: selectedItem?.longitudeDelta,
          }}
        >
          <Marker
            coordinate={{
              latitude: coords?.latitude,
              longitude: coords?.longitude,
            }}
            pinColor={"black"} // any color
            title={"your location"}
            description={""}
          />

          <Marker
            coordinate={{
              latitude: Destination?.position?.lat,
              longitude: Destination?.position?.lng,
            }}
            pinColor={"black"} // any color
            title={"your location"}
            description={""}
          />
          {Boolean(Destination?.position) && Boolean(coords) && (
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
          )}
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
          <View style={styles.modal}>
            <Pressable
              onPress={() =>
                navigation.navigate("Main", { user: route?.params?.user })
              }
              style={{
                backgroundColor: "lightgray",
                padding: 10,
                borderRadius: "50%",
                position: "absolute",
                top: 20,
                left: 10,
                zIndex: 100,
              }}
            >
              <Icon name="arrow-left" size={20} color="#000" />
            </Pressable>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Set your destination</Text>
              <Text stxyle={styles.textStyle}>Drag map to move pin</Text>
              <Divider style={{ marginVertical: 20 }} />
              <Pressable
                style={styles.inputSmall}
                onPress={() => {
                  setmodalLargeVisible(!modalLargeVisible);
                  setModalVisible(!modalVisible);
                }}
              >
                <Icon name="square-o" size={20} color="#000" />
                <TextInput
                  placeholder="search"
                  onChangeText={() => {
                    setmodalLargeVisible(true);
                    setModalVisible(false);
                  }}
                  value={Destination?.title}
                  style={{ marginHorizontal: 20, color: "black" }}
                />
              </Pressable>
            </View>
            <ButtonCustom
              styleButton={styles.button}
              onPress={() => {
                if (Destination?.title) {
                  navigation.navigate("Time", {
                    coords,
                    Destination,
                    user: route.params.user,
                  });
                  setModalVisible(false);
                }
              }}
            >
              <Text style={{ color: Destination?.title ? "black" : "gray" }}>
                Confirm destination
              </Text>
            </ButtonCustom>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalLargeVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalLargeVisible);
          }}
        >
          <View style={styles.modalLage}>
            <View style={styles.modalLargeView}>
              <Pressable
                onPress={() => {
                  setmodalLargeVisible(false);
                  setModalVisible(true);
                  if(navigation.canGoBack()==false){
                    navigation.navigate("Main", { user: route?.params?.user })
                  }
                }}
              >
                <Icon
                  name="arrow-left"
                  size={20}
                  color="#000"
                  style={{ marginRight: 40 }}
                />
              </Pressable>
              <Text style={[styles.modalText, { alignSelf: "center" }]}>
                Plan your ride
              </Text>
            </View>
            <View style={styles.currentLocation}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <Icon name="dot-circle-o" size={20} color={"lightblue"} />
                <TextInput
                  placeholder={"current location"}
                  value={location == "search" ? "current location" : location}
                  onChangeText={setLocation}
                  style={{ width: "auto", marginLeft: 20, color: "lightblue" }}
                />
              </View>
              <Divider style={{ marginVertical: 20 }} />
              {/* <TextInput /> */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                {/* { } */}
                <Icon name="square-o" size={20} color={"black"} />
                <AutocompleteDropdown
                  clearOnFocus={false}
                  closeOnBlur={true}
                  onSelectItem={setDestination}
                  onChangeText={getSuggestions}
                  dataSet={suggestionsList}
                  renderItem={(item, text) => (
                    <Text style={{ color: "#000", padding: 15 }}>
                      {item?.title}
                    </Text>
                  )}
                  inputContainerStyle={{
                    backgroundColor: "transparent",
                    width: 200,
                  }}
                />
              </View>
              {/* "AIzaSyA1gltaB5CogQfFcJxhCwX9ugHk6pl2sNo" */}
            </View>

            <FlatList
              ListEmptyComponent={() => (
                <Text style={{ color: "#000", padding: 15 }}>no list</Text>
              )}
              style={{ height: 600, width: "100%" }}
              data={suggestionsList}
              renderItem={({ item }) => (
                <Pressable onPress={() => setDestination(item)}>
                  <Text key={item?.id} style={{ color: "#000", padding: 15 }}>
                    {item?.title}
                  </Text>
                </Pressable>
              )}
            />
           
          </View>
        </Modal>
      </View>
    </AutocompleteDropdownContextProvider>
  );
}
export default MapPage;
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
    height: 250,
    marginTop: "auto",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    position: "relative",
  },
  modalLage: {
    backgroundColor: "white",
    height: 650,
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
});
