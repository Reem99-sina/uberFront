import { useEffect, useState } from "react"
import { StyleSheet, Text,  View } from "react-native"
import { TextInput } from "react-native-paper"

function AccountEmail({navigation}) {
    const[text,setText]=useState("")
    useEffect(()=>{
        navigation.setParams({email:text})
    },[text])
    // console.log(,"navigation")
  return (
    <View style={styles.container}>
        <Text style={styles.mainText}>What's your account's email address?</Text>
        <Text style={styles.text}>we'll use your email address to recover your account</Text>
        <TextInput
      value={text}
      onChangeText={setText}
      placeholder="enter your email"
      keyboardType="email-address"
      style={{backgroundColor:"lightgray"}}
    />
    </View>
  )
}
export default AccountEmail
const styles=StyleSheet.create({
    container:{
        flex:1,
        marginVertical:20,
        padding:20
    },mainText:{
        fontSize:20,
        marginVertical:20,
        fontWeight:"bold",
    },text:{
        marginVertical:20,
    }
})