import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import NavItem from "../components/NavItem";
import { getItem } from "../utils/AsyncStorage";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

function ActivityScreen() {
  let [user, setuser] = useState();

  async function getUser() {
    setuser(await getItem("driver"));
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>Activity</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold", margin: 20 }}>
        upcoming
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "auto",
          gap: 10,
          marginVertical: 20,
          borderWidth: 2,
          borderColor: "lightgray",
          borderRadius: 4,
        }}
      >
        <View style={{flex:2}}>
          <Text style={{ fontSize: 20, fontWeight: "bold", margin: 20 }}>
            you have upcoming {user?.name} driver
          </Text>
          <Pressable style={{ flexDirection: "row",alignItems:"center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                margin: 20,
                color: "gray",
              }}
            >
              Reserve your ride
            </Text>
            <Icon name="arrow-right" color={"gray"} />
          </Pressable>
        </View>
        <View style={{flex:1}}>
            <Image source={require("../assets/car.jpeg")}/>
        </View>
      </View>
    </View>
  );
}
export default ActivityScreen;
const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
});
