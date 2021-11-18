import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity,StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS,SIZES} from '../constants'
const Notification = ({navigation}) => {
    return (
            <View styles={styles.container}>
            <TouchableOpacity style={{position: 'absolute', top: 10, left: 15, width: 50, height: 50, borderRadius: 100, zIndex: 2}} 
             onPress={()=>{navigation.goBack()}}>
                <Ionicons name="chevron-back-outline" size={30} color={COLORS.black} />
            </TouchableOpacity>
                <Text style={{width: '100%', textAlign: 'center', fontSize:20, fontWeight: 'bold', marginTop: 10}}>Notification</Text>
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Notification