import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import NavItem from "../components/NavItem";
import { getAllItems, getItem, setItem } from "../utils/AsyncStorage";

function MainHome({ route,navigation }) {
  // Geolocation.setRNConfiguration(config);
  let [location, setLocation] = useState();
  let [user, setUser] = useState();

  let [loading, setloading] = useState(false);

  let [Destination, setDestination] = useState();
  async function get(){
   setUser(await getItem("user"))
  }
  async function getAll(){
    let all=await getAllItems()
   }
  useEffect(() => {
    const getPermission = async () => {
      // console.log(await Location.getCurrentPositionAsync())

      let { status } = await Location.requestForegroundPermissionsAsync();
      setloading(true);

      if (status !== "granted") {
        return console.log("Permission to access location was denied");
      }
     
      Location.getCurrentPositionAsync({}).then((result) => {
        setLocation(result);
        setloading(false);
      });
      //   setLocation(location);

      // let backPerm = await Location.requestBackgroundPermissionsAsync();
    };

    getPermission();
    get()
    getAll()
  }, []);
  useEffect(()=>{
    Location.watchPositionAsync({ accuracy: Location.Accuracy.BestForNavigation, timeInterval: 1000, distanceInterval: 10 }, location => {
      setLocation(location)
    })
    return () => {
      // Clean up the location tracking when the component unmounts
      Location.stopLocationUpdatesAsync('location');
    };
  },[Location])
  async function setLocationInApp(){
    await setItem("location",location)
  }
  useEffect(()=>{
    if(location){
      setLocationInApp()
    }
  },[location])
  // console.log(JSON.stringify(location),"location")
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Uber</Text>
      <Pressable
        style={styles.input}
        onPress={() =>
          location&&user? navigation.navigate("Map", { location: location,user:route?.params?.user||user }):Alert.alert("wait till loading end")
        }
      >
        <Icon name="search" size={20} color="#000" />
        <TextInput
          placeholder="Where to?"
          onChangeText={setDestination}
          value={Destination}
          style={{ marginHorizontal: 20 }}
        />

        <View style={styles.mapIcon}>
          <Icon name="clock-o" size={20} color="#000" />
          {loading&&<ActivityIndicator size={"large"}/>}
          <TextInput
            placeholder="Now"
            onChangeText={() => {}}
            value={"Now"}
            style={{ marginHorizontal: 20, fontSize: 18 }}
          />
          <Icon name="arrow-down" size={15} color="#000" />
        </View>
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Suggestions</Text>
        <Text style={{ fontSize: 15 }}>see all</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "auto",
          gap: 10,
          marginVertical: 20,
        }}
      >
        <NavItem
          image={require("../assets/Ride-with-Uber.webp")}
          text={"Ride"}
        />
        <NavItem
          image={require("../assets/PlanningReserve.webp")}
          text={"Reserve"}
        />
      </View>
    </View>
  );
}
export default MainHome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  input: {
    backgroundColor: "lightgray",
    // /height: 60,
    borderRadius: 16,
    marginVertical: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  mapIcon: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});
