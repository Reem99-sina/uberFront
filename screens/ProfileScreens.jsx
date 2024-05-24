import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import NavItem from "../components/NavItem";
import { getItem } from "../utils/AsyncStorage";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

function ProfileScreen() {
  let [user, setuser] = useState();

  async function getUser() {
    setuser(await getItem("user"));
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "auto",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          {user?.name} User
        </Text>
        <Image source={require("../assets/avatar.png")} style={styles.avatar} />
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {user?.email}
        </Text>
        <Text style={{ fontSize: 18,margin:20 }}>
          {user?.phoneNumber}
        </Text>
    </View>
  );
}
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
