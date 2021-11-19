import AsyncStorage from '@react-native-async-storage/async-storage';
import loadImageUrl from "./LoadImage"
export const isLogged  = async ()=>{
    try{
        const x = await AsyncStorage.getItem("isLogin");
        if (x === null) return false;
        else return true;
    } catch(e){
        console.error(e);
        return false;
    }
    
}
export const userData  = async ()=>{
    try{
        const x = await AsyncStorage.getItem("userData");
        if (x === null) return null;
        else return JSON.parse(x);
    } catch(e){
        console.error(e);
        return null;
    }
}
export const userDataImage  = async ()=>{
    try{
        const x = await AsyncStorage.getItem("userData");
        if (x === null) return null;
        else 
        {
            const data =  JSON.parse(x)
            if (data.avatar==="") 
            { data.avatarURL="";}
            else {
                const image = await loadImageUrl(data.avatar);
                data.avatarURL = image;
            }
            return data;
        };
    } catch(e){
        console.error(e);
        return null;
    }
}