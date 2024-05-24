import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { getItem } from "../utils/AsyncStorage";
import { useEffect, useState } from "react";
function NavItem({ image, text }) {
  let navigate = useNavigation();
  let [location, setLocation] = useState();
  let [user, setuser] = useState();

  async function getLocation() {
    setLocation(await getItem("location"));
  }
  async function getUser() {
    setuser(await getItem("user"));
  }
  useEffect(() => {
    getLocation();
    getUser();
  }, []);
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigate.navigate("Map", { location: location, user: user });
      }}
    >
      <Image
        source={image}
        style={{ height: 70, width: "100%" }}
        resizeMode="contain"
      />
      <Text> {text}</Text>
    </Pressable>
  );
}
export default NavItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    borderRadius: 16,
    padding: 20,
    flex: 1,
  },
});
