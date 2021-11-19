import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,Alert} from 'react-native'
import {userDataImage} from '../component/AsyncStorage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS,images, SIZES} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import { Checkbox, TextInput, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {updateUser} from '../redux/actions/userAction'
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserEdit = ({ navigation}) => {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [uploading, setUploading] = useState(false)
    const [change,setChange] = useState(false)
    const [user, setUser] = useState({avatar: ""})
    const [data, setData] = useState({
        avatar: '',
        avatarURL: '',
        name: '', 
        password: '',
        new_password:'',
        change_password: false,
        change_avatar: false,
    })
    useEffect(async() =>{
        const x= await userDataImage();
        setUser(x);
        setData({...data, avatar: x.avatar,  avatarURL: x.avatarURL, name: x.name,}) 
    },[])
    // pICK image 
    const pickImage = async()=>{
        const result = await ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true
          });
        setData({...data, avatarURL: result.path})
    }
    //upload Image
    const uploadImage = async()=>{      
        setUploading(true);
        setChange(true);
        const path = 'users/'+user.id+'/'; 
        const filename = data.avatarURL.substring(data.avatarURL.lastIndexOf('/') + 1);
        const reference = storage().ref(path+filename);
        await reference.putFile(data.avatarURL);
        setUploading(false);
        setData({...data, avatar: path+filename, change_avatar: true})

    }
    // handle Update
    const handleUpdate = async()=>{
        const result = await dispatch(updateUser(data,setLoading));
        if (result.status )
           {
                Alert.alert(result.data.message);
                if (result.status===200) {
                    await AsyncStorage.setItem('userData',JSON.stringify(result.data.data))
                }
           } 
    }
    return (
        <ScrollView>
            <TouchableOpacity 
                style={{position: 'absolute', top: 10, left: 10, width: 40, height: 40, zIndex: 2}} 
                onPress={()=>navigation.goBack()}>
                <Ionicons name="chevron-back-outline" style={{fontSize: 30}}color={COLORS.black} />
            </TouchableOpacity>
            <View style={{width: '100%',height: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize:20, fontWeight: 'bold'}}>Edit User</Text>
            </View>
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                style={{width: 150, height: 150, borderRadius: 100, margin: 10}}
                source={data.avatarURL===""? images.defaultAvatar: {uri: data.avatarURL}}
                />
                <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems:"center",width: '100%'}}>
                    <Button
                    mode="contained"
                    disabled={change}
                    style={{backgroundColor: COLORS.main}}
                    onPress={() =>pickImage()}>
                        Change
                    </Button>
                    <Button
                    mode={data.avatarURL!==user.avatarURL?"contained":"outlined"}
                    loading={uploading}
                    disabled={data.avatarURL===user.avatarURL|| data.change_avatar===true}
                    onPress={() =>uploadImage()}
                    >
                        Upload
                    </Button>
                </View>
               
            </View>
            <View style={{marginTop: 10}}>
                <TextInput
                mode="outlined"
                label="Username"
                numberOfLines={1}
                value={data.name}
                onChangeText={text => setData({...data, name: text})}/>
            </View>
            <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox 
                    status={data.change_password? "checked":'unchecked'}
                    onPress={() => setData({...data, change_password: !data.change_password})}/>
                <Text style={{fontSize:15, fontWeight: 'bold'}}>Change Password</Text>
            </View>
            { data.change_password?
            <View style={{marginTop: 5}}>
                <TextInput
                mode="outlined"
                label="Password"
                secureTextEntry
                returnKeyType="done"
                numberOfLines={1}
                value={data.password}
                onChangeText={text => setData({...data, password: text})}/>
                <TextInput
                mode="outlined"
                label="New password"
                secureTextEntry
                returnKeyType="done"
                numberOfLines={1}
                value={data.new_password}
                onChangeText={text => setData({...data, new_password: text})}/>
            </View>: null}
            <View style={{width: '100%', flexDirection: "row", justifyContent: "space-evenly", marginTop: 20}}>
                <Button mode="outlined" 
                    style={{width: 150}}
                    onPress={() => navigation.goBack()}>
                    Cancel
                    </Button>
                <Button 
                mode="contained" 
                loading={loading} 
                onPress={() =>handleUpdate()}
                style={{width: 150}}>Update</Button>
            </View>          
        </ScrollView>
    )
}

export default UserEdit

const styles = StyleSheet.create({})
