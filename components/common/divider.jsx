import { Text, View } from "react-native"
import { Divider } from "react-native-paper"

function DividerCustom() {
  return (
    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
       <Divider style={{backgroundColor:"gray",height:1,marginVertical:20,flexBasis:150}}/>
       <Text>Or</Text>
       <Divider style={{backgroundColor:"gray",height:1,marginVertical:20,flexBasis:150}}/>

       </View>
  )
}
export default DividerCustom