import { useEffect, useMemo, useState } from "react"
import { Alert, Keyboard, Pressable, StyleSheet, Text, View } from "react-native"
import { OtpInput } from "react-native-otp-entry"
import ButtonCustom from "../components/common/ButtonCustom"
import { sendotp } from "../action/sendOtp"
import axios from "axios"


function OtpEmail({route,navigation}) {
    let [MainCode,setMainCode]=useState(Math.ceil(Math.random()*1000))
    let [code,setCode]=useState(Math.ceil(Math.random()*1000))
   
    const checkCode=useMemo(()=>{
        return MainCode==code
    },[MainCode,code])
    // const number=useMemo(()=>{
    //     if(route.params.number){
    //         return route.params.number
    //     }
    // },[route.params.number])
    const email=useMemo(()=>{
      return  route?.params?.email
    },[route?.params?.email])
    async function getOtpEmail(){
      
      await axios.get("https://ubeback.onrender.com/user/OTPEmail",
        {
          email:route.params.text,
        })
      .then(({data})=>{setMainCode(data.code);Alert.alert(`code email is ${data.code}`)})
      .catch((error)=>console.log("error",error))
  }
  useEffect(()=>{
    if(route.params.email){
      getOtpEmail()
    }
  },[])
  useEffect(()=>{
    navigation.setParams({checkPhone:checkCode})
    
  },[checkCode])

  return (
    <View style={styles.container}>
        
        <Text style={styles.mainText}>Enter the 4-digit code sent to you at {email?.slice(0,1)}******{email?.slice(9)}</Text>
        {/* <Pressable onPress={()=>navigation.navigate("acountEmail")}>
        <Text style={styles.text}>Changed your mobile number</Text>
        </Pressable> */}
         <OtpInput numberOfDigits={4} onTextChange={(text) => console.log(text)}
         autoFocus={false}
           focusColor="green"
           focusStickBlinkingDuration={500}
           onFilled={(text) => {setCode(text);Keyboard.dismiss()}}
           theme={{pinCodeContainerStyle:{backgroundColor:"lightgray"}}}
         />
        <Text style={styles.text}>Tip: Be sure to check your inbox and spam folders</Text>

         <ButtonCustom styleButton={styles.button} onPress={()=>{
            getOtpEmail()
         }}>
            <Text>Resend me code</Text>
         </ButtonCustom> 
    </View>
  )
}
export default OtpEmail
const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },mainText:{
        fontSize:25,
        fontWeight:"bold"
    },text:{
        // textDecorationLine:"underline",
        marginVertical:20
    },button:{
        backgroundColor:"lightgray",borderRadius:10,width:"auto",padding:10,marginVertical:10
    }
})