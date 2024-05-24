import { Image, StyleSheet, Text, View } from "react-native";
import ButtonCustom from "../components/common/ButtonCustom";
import Icon from "react-native-vector-icons/FontAwesome";

function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Uber</Text>
      <Image
        source={require("../assets/uber.png")}
        style={{ width: 200, height: 100 }}
        resizeMode="contain"
      />
      <Text style={styles.mainText}>Move with safety</Text>
      <ButtonCustom styleButton={styles.styleButton} onPress={()=>navigation.navigate("Login")}>
        <Text style={styles.styleText}>Get started</Text>
        <Icon name="arrow-right" size={20} color={"#fff"} />
      </ButtonCustom>
    </View>
  );
}
export default Home;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  mainText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    // marginBottom:20
  },
  styleButton: {
    backgroundColor: "#000",
    width: "90%",
    justifyContent: "space-around",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row"
  },
  styleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
