import { useEffect, useMemo, useState } from "react"
import { Alert, Keyboard, Pressable, StyleSheet, Text, View } from "react-native"
import { OtpInput } from "react-native-otp-entry"
import ButtonCustom from "../components/common/ButtonCustom"
import { sendotp } from "../action/sendOtp"
import axios from "axios"

// import OtpInputs from "react-native-otp-inputs"

function Otp({route,navigation}) {
    let [code,setCode]=useState(route?.params?.code||"+20")
    const user=useMemo(()=>{
        if(route.params.user){
            return route.params.user
        }
    },[route.params.user])
    const number=useMemo(()=>{
        if(route?.params?.number){
            return route?.params?.number
        }
    },[route.params.number])
    const checkifrightcode=useMemo(()=>{
      return  code==route?.params?.code
    },[code,route?.params?.code])
    useEffect(()=>{
        navigation.setParams({code,check:checkifrightcode})
    },[code])
   
  return (
    <View style={styles.container}>
        {user?<Text style={styles.mainText}>Welcome back {user?.name}</Text>
        :<Text style={styles.mainText}>Enter the 4-digit code sent to you at {number}</Text>}
        <Pressable onPress={()=>{navigation?.navigate("acountEmail")}}>
        <Text style={styles.text}>Changed your mobile number?</Text>
        </Pressable>
         <OtpInput numberOfDigits={3} onTextChange={(text) => console.log(text)}
         autoFocus={false}
           focusColor="green"
           focusStickBlinkingDuration={500}
           onFilled={(text) => {setCode(text);Keyboard.dismiss()}}
           theme={{pinCodeContainerStyle:{backgroundColor:"lightgray"}}}
         />
         {!checkifrightcode&&<Text style={styles.error}>not right code</Text>}
         <ButtonCustom styleButton={styles.button} onPress={()=>{
            sendotp(number)?.then((res)=>setCode(res?.data?.code)).catch((error)=>Alert.alert(error))
         }}>
            <Text>Resend me code</Text>
         </ButtonCustom>
    </View>
  )
}
export default Otp
const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },mainText:{
        fontSize:25,
        fontWeight:"bold"
    },text:{
        textDecorationLine:"underline",
        marginVertical:20
    },button:{
        backgroundColor:"lightgray",borderRadius:10,width:"auto",padding:10,marginVertical:10
    },error:{
        color:"red",
    }
})