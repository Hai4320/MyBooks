import React,{useState,useEffect} from 'react'
import { View, Text, ScrollView, Image, StyleSheet,TouchableOpacity} from 'react-native'
import { userData } from '../component/AsyncStorage'
import {images, COLORS} from '../constants'
import {LoadImageUrl} from '../component/LoadImage'
import Ionicons from 'react-native-vector-icons/Ionicons';

const User = () => {
    const [user,setUser] =useState({name: '', avatar:'',email: '', role: '',});
    useEffect(async ()=>{

        const x = await userData();
        if (x!==null){
            if (x.avatar!=='') x.avatarURL = await LoadImageUrl(x.avatar);
            setUser(x);
        }
        
    },[]);
    return (
        <ScrollView style={styles.container}>
          <View style={styles.containerData}> 
            <TouchableOpacity
                style={styles.avatarContainer}
                onPress={()=>{}}>
                <Image style={styles.avatar} source={user.avatar===''? images.defaultAvatar:{uri: user.avatarURL}}/>    
            </TouchableOpacity>
            <View style={styles.dataView}>
                <Text style={styles.userDataView} numberOfLines={1}>{user.name.toUpperCase()}</Text>
                <Text style={styles.userDataView} numberOfLines={1}>{user.email}</Text>
            </View>
            <TouchableOpacity
                style={styles.logoutContainer}
                onPress={()=>{}}
            >
            <Ionicons name="log-out-outline" style={styles.logout}/>
            </TouchableOpacity>
          </View>
        </ScrollView>
       
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.white,
    },
    containerData: {
        width: '100%',
        height: 100, 
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,

    },
    avatar: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: COLORS.white,
        resizeMode: 'cover'
    },
    avatarContainer:{
        width: 100,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    dataView: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    userDataView:{
        width: '100%',
        fontSize: 15,
        
    },
    logoutContainer:{
        width: 80, 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logout:{
        fontSize: 30,
        color: COLORS.main,
    }
});

export default User
