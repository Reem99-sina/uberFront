import {
    Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRef, useState,useMemo } from "react";
import ButtonCustom from "../components/common/ButtonCustom";
import axios from "axios";
function CreditCard({route,navigation}) {
  let [creditNumber, setCreditNumber] = useState("creditNumber");
  let [exper, setexperDate] = useState("exper");
  let [cvc, setCvv] = useState("cvc");
  let [Nickname, setNickname] = useState("");
    async function sendCredit(){
        if(creditNumber&&exper&&cvc){
            await axios.patch("https://ubeback.onrender.com/user/updateUserCredit",{email:route?.params?.user?.email,
            creditCard:creditNumber,
            EXpDate:exper,
            cvv:cvc
            }).then((res)=>navigation.navigate("Home",{user:res.data})).catch((error)=>console.log(error,"error"))
        }else{
            Alert.alert(`you need some data of this credit ${creditNumber||exper||cvc}`)
        }
       
    }
    const Check=useMemo(()=>{
        return Boolean(creditNumber)&&Boolean(exper)&&Boolean(cvc)
    },[creditNumber,exper,cvc])
    
  return (
    <KeyboardAvoidingView style={styles.container}  behavior="padding">
         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Icon
            name="arrow-left"
            size={30}
            color="black"
            style={{ alignSelf: "flex-start" }}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.modalText}>Add Card</Text>
        </View>
      <ScrollView style={{flex:1}}>
       
        <View style={{ marginVertical: 20 }}>
          <Text>Card Number</Text>

          <View style={styles.input}>
            <Icon name="credit-card" color="lightgray" size={25} />
            <TextInput
              keyboardType="numeric"
              onChangeText={setCreditNumber}
              value={creditNumber}
              style={{ width: "100%" }}
            />
          </View>
          <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Text>Exp. Date</Text>
              <View style={styles.input}>
                <TextInput
                  placeholder="MM/YY"
                  keyboardType="numbers-and-punctuation"
                  onChangeText={setexperDate}
                  value={exper}
                  style={{ width: "100%" }}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text>CVV</Text>
              <View style={styles.input}>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={setCvv}
                  value={cvc}
                  style={{ width: "100%" }}
                  placeholder="123"
                />
              </View>
            </View>
          </View>
          <Text>Nickname (optional)</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText={setNickname}
              value={Nickname}
              style={{ width: "100%" }}
              placeholder="joint account or work card"
            />
          </View>
         
        </View>
      
      </ScrollView>
      <ButtonCustom styleButton={styles.button}disabled={!Check} onPress={()=>{sendCredit();}}>
          <Text style={{color:creditNumber&&exper&&cvc&&Nickname?"black":"gray"}}>save</Text>
        </ButtonCustom>
    </KeyboardAvoidingView>
  );
}
export default CreditCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  modalText: {
    alignSelf: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "auto",
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 8,

  },
  input: {
    borderWidth: 3,
    borderColor: "lightgray",
    borderRadius: 16,
    borderStyle: "solid",
    alignItems: "center",
    padding: 20,
    marginVertical: 20,
    flexDirection: "row",
    width: "100%",
  },
});
