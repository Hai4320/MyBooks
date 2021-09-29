import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {COLORS} from '../constants'

const Splash = ({navigation}) => {
    setTimeout(() => {
        navigation.navigate('Start')
    },1000)
    return (
        <View style={styles.container}>
            <Text style={styles.splash}>My Book</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
     splash: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.main,
        
     }
})


export default Splash

