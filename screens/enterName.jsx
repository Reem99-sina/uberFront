import { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

function EnterName({navigation}) {
    let [FirstName,seiFirstName]=useState("")
    let [LastName,seiLastName]=useState("")
    useEffect(()=>{
        navigation.setParams({LastName,FirstName})
    },[FirstName,LastName])
    
  return (
    <View style={styles.container}>
        <Text style={styles.mainText}>enter your first name and last name</Text>
        <Text style={styles.text}>Add your first name and last name to aid in account recovery</Text>
        <View style={{flexDirection:"row",gap:20}}>
        <TextInput value={FirstName} onChangeText={seiFirstName} style={styles.input} placeholder="first name"/>
        <TextInput value={LastName} onChangeText={seiLastName} style={styles.input} placeholder="last name"/>
        </View>
    </View>
  )
}
export default EnterName
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
        width:"45%",
        padding:10,
        borderRadius:10
    }
})