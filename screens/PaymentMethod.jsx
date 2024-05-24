import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ButtonCustom from "../components/common/ButtonCustom";
function PaymentMethod({route,navigation}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Icon
          name="arrow-left"
          size={30}
          color="black"
          style={{ alignSelf: "flex-start" }}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.modalText}>Add Payment Method</Text>
      </View>
      <ButtonCustom
              styleButton={[styles.button]}
              onPress={() => {
                navigation.navigate("creditcard",{user:route?.params?.user})
              }}
            >
              <Icon name="credit-card" color={"black"} size={20} />
              <Text style={{ color: "black" }}>credit card</Text>
              <Icon
                name="arrow-right"
                color={"black"}
                size={20}
                style={{ alignSelf: "flex-end" }}
              />
            </ButtonCustom>
    </View>
  );
}
export default PaymentMethod;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:30
  },modalText:{
    alignSelf:"center"
  },button:{
    flexDirection:"row",
    justifyContent:"space-around",
    width:"auto",
    marginVertical:35,
    alignItems:"center"
  }
});
