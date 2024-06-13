import axios from "axios";

const getUserInfo = async () =>{
    try{
        const response = await axios.get('https://347fc465-5208-472e-8b0c-c9841b017f75.mock.pstmn.io/rest/getUserInfo',{withCredentials:true});
        return response.data
    }catch(error){
        console.error('Error fetching user Info:',error);
        return {logged:false}
    }
};

export {getUserInfo};