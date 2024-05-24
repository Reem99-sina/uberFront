import { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

function EnterEmail({navigation}) {
    let [email,seiEmail]=useState("")
    useEffect(()=>{
        navigation.setParams({email})
    },[email])
  return (
    <View style={styles.container}>
        <Text style={styles.mainText}>enter your email address</Text>
        <Text style={styles.text}>Add your email to aid in account recovery</Text>
        <TextInput value={email} onChangeText={seiEmail} style={styles.input} placeholder="name@example.com"/>
    </View>
  )
}
export default EnterEmail
const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },mainText:{
        fontSize:20,
        marginVertical:20,
        fontWeight:"bold",
    },text:{
        marginVertical:20,

    },input:{
        backgroundColor:"lightgray",
        height:40,
        width:"auto",
        padding:10,
        borderRadius:10
    }
})