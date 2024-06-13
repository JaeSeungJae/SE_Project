import axios from "axios";

const getUserInfo = async () =>{
    try{
        const response = await axios.get('http://bitcoin-kw.namisnt.com:8082/rest/getUserInfo');
        console.log(response)
        return response.data
    }catch(error){
        console.error('Error fetching user Info:',error);
        return {logged:false}
    }
};

export {getUserInfo};