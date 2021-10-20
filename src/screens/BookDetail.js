import React from 'react';
import { ImageBackground, StyleSheet, Text, View,Image,ScrollView ,TouchableOpacity,TextInput} from "react-native";
import {COLORS} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

// file của thg hiếu
// const images = { source={require('')} };
const BookDetail = () => {
    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={require('../assets/images/background5.jpg')} style={styles.image}>
                <View>
                    <TouchableOpacity style={styles.a}>
                        <Ionicons name='chevron-back-outline' size={35} color={COLORS.lightseagreen}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.container1}>
                    <Image
                        style={styles.imagee}
                        source={require('../assets/images/underland.jpg')}
                            />
                </View>
                <View> 
                    <Text style={styles.text}>Điều Kỳ Diệu Của Tiệm Tạp Hóa NAMIYA</Text>
                    <Text style={styles.textAuthor}>Higashino Keigo</Text>
                </View>
                <View style={styles.viewOther} >
                <Text style={styles.textOther}>Company : Nhã Nam</Text>
                <Text style={styles.textOther}>Status : Đã hoàn thành</Text>
                <Text style={styles.textOther}>Type : NOVEL</Text>
                <Text style={styles.textOther}>Star : 5</Text>
                </View>
            </ImageBackground>
            <View>
                <Text style={styles.text1}>Mô tả</Text>
                <Text style={styles.textDescription}>Một đêm vội vã lẩn trốn sau phi vụ khoắng đồ nhà người, Atsuya, Shota và Kouhei đã rẽ vào lánh tạm trong một căn nhà hoang bên con dốc vắng người qua lại...</Text>
            </View>
            <View style={styles.fixButton}>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.textButton}>Read PDF</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.fixButton}>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.textButton}>Listen Audio</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.viewInput}>
                <TextInput style={styles.textInput}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Write your commnet"/>   
            </View>
        </ScrollView>
                
        
        
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:COLORS.gainsboro,
        
      
    },
    container1:{
        paddingTop:5,
        alignItems: "center",
    },

    image: {
      justifyContent: "center"

      
    },
    text: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
    },
    textAuthor:{
        fontWeight:"bold",
        fontSize:25,
        textAlign: 'center',
    },
    viewOther:{
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding:10,
    },
    textOther:{
        color:COLORS.main,
        fontSize:20,
    },
    imagee:{
        justifyContent:"flex-start",
        height:250,
        width:200,
        paddingTop:50,
        borderRadius:15,
    },
    textDescription:{
        fontSize:17,
        paddingTop:10,
        padding:10,
        textAlign: "justify",
    },
    text1:{
        textAlign: "center",
        fontWeight:"bold",
        fontSize:20,
    },
    fixButton:{
        justifyContent:"space-around",
        alignItems: "center",
        padding:10,
    },
    button: {

        alignItems: "center",
        backgroundColor:COLORS.lightseagreen,
        borderRadius:50,
        padding:10,
        width:"80%",
      },
    textButton:{
        color:COLORS.white,
        fontWeight:"bold",
        fontSize:15,
    },
    viewInput:{
        paddingTop:100,
    },
    textInput:{
        borderColor:COLORS.gray,
        borderWidth:3,
        borderRadius:20,
  

    },


  });

export default BookDetail
