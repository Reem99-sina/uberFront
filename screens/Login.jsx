import { TouchableOpacity,Image, StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import PhoneInput from "../components/common/PhoneInput";
import ButtonCustom from "../components/common/ButtonCustom";
import { Divider, Icon, Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import DividerCustom from "../components/common/divider";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication"
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
import { sendotp } from "../action/sendOtp";
import { mergeItem, setItem } from "../utils/AsyncStorage";

global.atob = decode;
WebBrowser.maybeCompleteAuthSession();
function Login({route,navigation}) {
  let [selectValue, setSelect] = useState(route?.params?.code||"+20");
  let [Phone, setPhone] = useState(route?.params?.phone||"");
  let [accessToken, setAccsessToken] = useState(null);
  let [User, setUser] = useState(null);
  let [appleAuth,setAppleAuth]=useState(false)
  let [Loading,setLoading]=useState(false)

  let [searchQuery,setSearchQuery]=useState("")
  let [cODE,setcODE]=useState("")
  let [status,setstatus]=useState("")
  let [request,responce,promtAsync]=Google.useIdTokenAuthRequest({
    clientId:"238522378548-jt0lug16uac1n1peb2qvjngqktc8678u.apps.googleusercontent.com",
    androidClientId:"238522378548-kdhrkdh4el2mkubjjlc1vg75b723tvvh.apps.googleusercontent.com",
    iosClientId:"238522378548-lgnqdv5u8b5enq0al1pkjs4dvoi11mdg.apps.googleusercontent.com"
  })
  useEffect(()=>{
    if(responce?.type==="success"){
        setAccsessToken(responce.authentication.accessToken)
        accessToken && fetchuserINFO()
    }
  },[])
  async function fetchuserINFO(){
    let responce=await fetch("https://www.googleapis.com/userinfo/v2/me",{
        headers:{
            Authentication:`Bearer ${accessToken}`
        }
    })
    let userInfo=await responce.json()
    setUser(userInfo)
  }
  
  const login=async()=>{
   await AppleAuthentication.signInAsync({
        requestedScopes:[AppleAuthentication.AppleAuthenticationScope.FULL_NAME
          ,AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
    }).then((credential)=>setSearchQuery(jwtDecode(credential?.identityToken))).catch((error)=>{
      Alert.alert("error")
    })
  }
 async function fetchifEmailexist(){
    if(searchQuery){
      await axios.get("https://ubeback.onrender.com/user/",{
        email:searchQuery?.email
        }).then((res)=>{
          if(res.status==400){
            setstatus(400)
          }
        }).catch((error)=>{Alert.alert("account not exist error"); setstatus(400)})
    }
  }
  function getAppleAuth(){
    return <AppleAuthentication.AppleAuthenticationButton
     buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
     buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
     cornerRadius={5}
     style={styles.button}
     onPress={login}
    />

  }
 async function sendOtp(){
  setLoading(true)
  sendotp(`${selectValue}${Phone}`).then((res)=>{
    // navigation.navigate("otp",{user:res.data.user,number:`${selectValue}${Phone}`})
    Alert.alert(`your code is ${res.data.code}`)
    setcODE(res.data)
  }).catch((error)=>{Alert.alert(error);console.log(error,"resotp")}).finally(()=>{
    setLoading(false)
  })
  
  }
  function handleOtpRequest(){
    if(selectValue&&Phone){
      sendOtp()
    }else{
      Alert.alert("where phone number","enter please phone number")
    }
    navigation.setParams({phone:Phone,code:selectValue})
  }
  useEffect(()=>{
      const checkAvaiable=async()=>{
          const isAvaible=await AppleAuthentication.isAvailableAsync()
          setAppleAuth(isAvaible)
      }
      checkAvaiable()
  },[])
  useEffect(()=>{
    fetchifEmailexist()
  },[searchQuery])
  useEffect(()=>{
    if(cODE.code&&status!=400){
    navigation.navigate("otp",{user:cODE.user,number:`${selectValue}${Phone}`,code:cODE.code})
    mergeItem("user",cODE?.user)    

    }else if(status==400&&!cODE){
      navigation.navigate("profile")
    }else{
      console.log(cODE,status)
    }

  },[cODE,status])
  // useEffect(()=>{
  //   if(route?.params?.phone&&route?.params?.code){
  //     setSelect(route?.params?.code)
  //     setPhone(route?.params?.pg)
  //   }
  // },[route.params])
  // console.log(navigation,route.params.phone) 
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Enter your mobile number</Text>
      <PhoneInput
        key={0}
        selectValue={selectValue}
        setSelect={setSelect}
        Phone={Phone}
        setPhone={setPhone}
      /> 
      <ButtonCustom styleButton={styles.styleButton} onPress={handleOtpRequest}>
      {Loading?<ActivityIndicator size={"small"}/>: <Text style={styles.styleText}>Continue</Text>}
      </ButtonCustom>
      <DividerCustom />
      <TouchableOpacity onPress={()=>promtAsync()} style={styles.subScription}>
        <Icon source={"google"}size={20} color="red"/>
        <Text style={{color:"gray",marginHorizontal:10}}>Continue with google</Text>
      </TouchableOpacity>
      {appleAuth&&getAppleAuth()}
      <DividerCustom />
     
      <ButtonCustom styleButton={styles.searchAccount} onPress={()=>{}}>
        <Icon source={"search-web"} size={20}/>
        <Text style={styles.AccountText}>Find my account</Text>
      </ButtonCustom>
    </View>
  );
}

export default Login;
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    padding:10
  },
  styleButton: {
    backgroundColor: "#000",
    width: "auto",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  styleText: {
    color: "#fff",
    fontSize: 20,
  },
  subScription:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"lightgray",
    padding:10,
    borderRadius:10,
    marginVertical:10
  },button:{
    width:"auto",
    height:65,

},searchAccount:{
    width:"auto",
    height:50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"row"
},AccountText:{
    color:"#000",
    marginHorizontal:10
}
});
