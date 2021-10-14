import AsyncStorage from '@react-native-async-storage/async-storage';
export const isLogged  = async ()=>{
    const x = await AsyncStorage.getItem("isLogin");
    if (x === null) return false;
    else return true;
}