import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, TouchableOpacity,StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS,SIZES} from '../constants'
const Notification = ({navigation}) => {
    
    const data= [
        {_id: "6", type: 3, postID: "New Post", message: "liked", data: 17, createdAt: "20/11/2021", readed: false},
        {_id: "5", type: 4, postID: "Những cuốn sách hay nên đọc một lần trong đời (2021)", message: "comment", data: 3, createdAt: "20/11/2021", readed: false},
        {_id: "4", type: 3, postID: "Những cuốn sách hay nên đọc một lần trong đời (2021)", message: "liked", data: 10, createdAt: "20/11/2021", readed: true},
        {_id: "3", type: 2, postID: "Những cuốn sách hay nên đọc một lần trong đời (2021)", message: "accepted", data: 1, createdAt: "11/11/2021", readed: false},
        {_id: "2", type: 2, postID: "Những cuốn sách hay nên đọc một lần trong đời (2021)", message: "uploaded", data: 0, createdAt: "11/11/2021", readed: true},
        {_id: "1", type: 1, message: "Welcome to MyBooks", createdAt: "10/11/2021", readed: true},

    ];
    const [notifications, setNotifications] = useState(data);
    const showNotifications = (item)=>{
        if (item===null) return;
        switch (item.type) {
            case 1: 
            return (
                <View style={styles.noti_container} key={item._id}>
                    <Text style={styles.nomal_text} numberOfLines={3}>{item.message}</Text>
                </View> 
            )
            case 2: 
            return (
                <View style={item.readed?styles.noti_container:styles.noti_container2} key={item._id}>
                   
                    <Text style={styles.nomal_text} numberOfLines={3}> <Text>{"{"+item.message+"}, "}</Text><Text style={[styles.bold_text]}>{item.postID}</Text> has {item.message} at {item.createdAt}</Text>
                </View> 
            )
            case 3: 
            return (
                <View style={item.readed?styles.noti_container:styles.noti_container2} key={item._id}>
                    <Text style={styles.nomal_text} numberOfLines={3}><Text style={styles.bold_text}>{item.data}</Text> people <Text style={styles.bold_text}>{item.message}</Text> your post <Text style={styles.bold_text}>{item.postID}</Text></Text>
                </View> 
            )
            case 4: 
            return (
                <View style={item.readed?styles.noti_container:styles.noti_container2} key={item._id}>
                    <Text style={styles.nomal_text} numberOfLines={3}><Text style={styles.bold_text}>{item.data}</Text> people  <Text style={styles.bold_text}>{item.message}</Text> your post <Text style={styles.bold_text}>{item.postID}</Text></Text>
                </View> 
            )
            default: return; 
        }
    }
    return (
            <ScrollView styles={styles.container}>
            <TouchableOpacity style={{position: 'absolute', top: 10, left: 15, width: 50, height: 50, borderRadius: 100, zIndex: 2}} 
             onPress={()=>{navigation.goBack()}}>
                <Ionicons name="chevron-back-outline" size={30} color={COLORS.black} />
            </TouchableOpacity>
                <Text style={{width: '100%', textAlign: 'center', fontSize:20, fontWeight: 'bold', marginTop: 10}}>Notification</Text>
                <View>
                    {notifications.map(item=> showNotifications(item))}
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