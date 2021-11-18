import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native'
import {userData} from '../component/AsyncStorage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS,images, SIZES} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import { Checkbox, TextInput, Button } from 'react-native-paper';
const UserEdit = ({ navigation}) => {
    const [loading,setLoading] = useState(false);
    const [user, setUser] = useState({})
    const [data, setData] = useState({
        avatar: '',
        name: '', 
        password: '',
        new_password:'',
        change_password: false,
        change_avatar: false,

    })
    useEffect(async() =>{
        const x= await userData();
        setUser(x)
        setData({...data, name: user.name})
    },[])
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
                style={{width: 150, height: 150}}
                source={user.avatar===undefined||user.avatar==""? images.defaultAvatar: images.defaultAvatar}
                />
                <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems:"center",width: '100%'}}>
                    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: COLORS.button, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                        <Text style={{color: COLORS.white}}>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 100, height: 30, backgroundColor: COLORS.main, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                        <Text style={{color: COLORS.white}}>Upload</Text>
                    </TouchableOpacity>
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
                <Button mode="contained" loading={loading} style={{width: 150}}>Update</Button>
            </View>          
        </ScrollView>
    )
}

export default UserEdit

const styles = StyleSheet.create({})
