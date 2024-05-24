import { Image, StyleSheet, Text, TextInput, View } from "react-native"
import country from "../../data/country.json"
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

function PhoneInput({selectValue,setSelect,Phone,setPhone}) {

  return (
    <View style={styles.container}>
   <Picker selectedValue={selectValue} onValueChange={setSelect} mode={'dropdown'} enabled style={styles.country}>
    {country.map((ele)=> <Picker.Item key={ele.emoji} value={ele.value} label={ele.emoji} style={{fontSize:30}}/>)}
   </Picker>
   <TextInput value={Phone} onChangeText={setPhone} style={styles.input} placeholder="enter phone number"/>
   </View>
  )
}
export default PhoneInput
const styles=StyleSheet.create({
    country:{
        width:"40%"
    },input:{
        backgroundColor:"gainsboro",
        height:50,
        padding:10,
        width:"60%",
        borderRadius:16
    },container:{
        flexDirection:"row",
        alignItems:"center"
    }
})