import axios from "axios";

export async function sendotp(phone){
    const result=await axios.post("https://ubeback.onrender.com/user/OTP",{
       to:phone
     })
    return result
   }