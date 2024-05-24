import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import NavItem from "../components/NavItem";
import { getItem,clear } from "../utils/AsyncStorage";
import { useState, useEffect } from "react";

import ButtonCustom from "../components/common/ButtonCustom";
import Icon from "react-native-vector-icons/FontAwesome";
function ProfileScreen({navigation}) {
  let [user, setuser] = useState();

  async function getUser() {
    setuser(await getItem("user"));
  }
  async function removeUser() {
    await clear()
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
        <ButtonCustom styleButton={styles.styleButton} onPress={()=>{removeUser();navigation.navigate("Home")}}>
        <Text style={styles.styleText}>Log out</Text>
        <Icon name="arrow-right" size={20} color={"#fff"} />
      </ButtonCustom>
    </View>
  );
}
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    padding: 30,
  }, styleButton: {
    backgroundColor: "#000",
    width: "90%",
    justifyContent: "space-around",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },  styleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
