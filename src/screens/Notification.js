import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, TouchableOpacity,StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS,SIZES} from '../constants'
import {useSelector, useDispatch} from 'react-redux';
import {getNotification} from '../redux/actions/userAction';
import {GetNotification} from '../redux/selectors'

const Notification = ({navigation}) => {
    const dispatch = useDispatch();
    const notify = useSelector(GetNotification).sort((a,b)=>a.createdAt<b.createdAt)
    const [notifications, setNotifications] = useState([]);
    const {notiView, setNotiView} = useState([])
    useEffect(async()=>{
        const result = await dispatch(getNotification());
    },[])
    useEffect(()=>{
        setNotifications(notify)
    },[notify]);
    return (
            <ScrollView styles={styles.container}>
            <TouchableOpacity style={{position: 'absolute', top: 10, left: 15, width: 50, height: 50, borderRadius: 100, zIndex: 2}} 
             onPress={()=>{navigation.goBack()}}>
                <Ionicons name="chevron-back-outline" size={30} color={COLORS.black} />
            </TouchableOpacity>
                <Text style={{width: '100%', textAlign: 'center', fontSize:20, fontWeight: 'bold', marginTop: 10}}>Notification</Text>
                <View style={{marginTop: 20}}>
                    {notifications.map((item,index)=> (
                    item.type==1?
                    <View style={styles.noti_container} key={index}>
                        <Text style={styles.nomal_text} numberOfLines={3}>{item.message}</Text>
                    </View>
                    :item.type==2?
                    <View style={item.readed?styles.noti_container:styles.noti_container2} key={index}>
                        <Text style={styles.nomal_text} numberOfLines={3}> <Text>{"{"+item.message+"}, "}</Text><Text style={[styles.bold_text]}>{item.postName}</Text> has {item.message} at {item.createdAt}</Text>
                    </View> 
                    :item.type==3?
                    <View style={item.readed?styles.noti_container:styles.noti_container2} key={index}>
                        <Text style={styles.nomal_text} numberOfLines={3}><Text style={styles.bold_text}>{item.data}</Text> people <Text style={styles.bold_text}>{item.message}</Text> your post <Text style={styles.bold_text}>{item.postName}</Text></Text>
                    </View> 
                    :item.type==4?
                    <View style={item.readed?styles.noti_container:styles.noti_container2} key={index}>
                        <Text style={styles.nomal_text} numberOfLines={3}><Text style={styles.bold_text}>{item.data}</Text> new <Text style={styles.bold_text}>{item.message}</Text> in your post <Text style={styles.bold_text}>{item.postName}</Text></Text>
                    </View> 
                    : null   
                    ))}
                </View>
            </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noti_container:{
        maxHeight: 90, 
        width: '100%', 
        flexDirection: "row",
        padding: 2,
        paddingLeft: 10,
        borderBottomWidth: 1
    },
    noti_container2:{
        maxHeight: 90, 
        width: '100%', 
        flexDirection: "row",
        padding: 2,
        paddingLeft: 10,
        backgroundColor: COLORS.gainsboro,
        borderBottomWidth: 1
    },
    nomal_text:{
        fontSize: 17
    },
    bold_text: {
        fontSize: 17, 
        fontWeight: 'bold'
    }, 
    post_name:{
        width: 100,
    }
});

export default Notification