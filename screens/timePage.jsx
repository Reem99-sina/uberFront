import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/FontAwesome";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import ButtonCustom from "../components/common/ButtonCustom";
import axios from "axios";

function TimePage({ route,navigation }) {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const {email}=route.params.user
  const {position}=route.params.Destination
  const current=route.params.coords

  const setDateInforme=(event, date)=>{
    setDate(new Date(date))
  }
  

    async function updateUser(){
      setLoading(true)
    await axios.patch("https://ubeback.onrender.com/user/update",{
            email:email,
            destination:position,
            currentLocation:{"lat":current?.latitude,"lng":current?.longitude},
            time:date
        }).then(({data})=>{navigation.navigate("MapTOdriver",{user:data});})
        .catch((error)=>console.log(error))
        .finally(()=>setLoading(false))
        // console.log(result.status,"result")
    }
  return (
    <View style={styles.container}>
        <View>
      <View style={styles.timeContainer}>
        <Icon name="arrow-left" size={30} onPress={() => navigation.goBack()} />
        <Text style={styles.mainText}>choose a time</Text>
      </View>
      <DateTimePicker mode="datetime" value={date}  display="spinner" onChange={setDateInforme}/>
      </View>
      <ButtonCustom styleButton={styles.button} onPress={()=>{
        updateUser()
          }}>
             {loading?<ActivityIndicator size={"large"}/>: <Text style={{ color: "#fff",fontSize:20,fontWeight:"bold",textAlign:"center" }}>Next</Text>}
              
            </ButtonCustom>
      {/* <DatePicker date={date} onDateChange={setDate} mode="datetime" /> */}
    </View>
  );
}
export default TimePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
   
    justifyContent:"space-between"
  },
  timeContainer: {
    justifyContent: "space-around",
    marginVertical: 20,
  },
  mainText: {
    fontSize: 30,
    marginVertical: 20,
  },button:{
    backgroundColor:"black",
    padding:15,
    borderRadius:16,
    // alignSelf:"flex-end"
  }
});
