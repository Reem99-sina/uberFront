import { StyleSheet, Text, View } from "react-native"
import NavItem from "../components/NavItem"

function ServicesScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30,fontWeight:"bold" }}>Services</Text>
      <Text style={{ fontSize: 20,fontWeight:"bold",margin:20 }}>
        Go anywhere, get anything
      </Text>
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
  )
}
export default ServicesScreen
const styles=StyleSheet.create({
container:{
padding:30,

}
})