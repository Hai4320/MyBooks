import AsyncStorage from '@react-native-async-storage/async-storage';
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