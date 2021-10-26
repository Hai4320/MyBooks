import React from 'react';
import { ImageBackground, StyleSheet, Text, View,Image,ScrollView ,TouchableOpacity,TextInput} from "react-native";
import {COLORS,images} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

// file của thg hiếu
// const images = { source={require('')} };
const BookDetail = () => {
    const book= {
        id:'',
        Title:"Điều Kỳ Diệu Của Tiệm Tạp Hóa NAMIYA",
        Description:"Một đêm vội vã lẩn trốn sau phi vụ khoắng đồ nhà người, Atsuya, Shota và      Kouhei đã rẽ vào lánh tạm trong một căn nhà hoang bên con dốc vắng người qua lại...",
        Author:"Higashino Keigo",
        Company:"Nhã Nam",
        Star:5,
        Status:"Đã hoàn thành",
        Type:"NOVEL",
        Audio:["books/audios/Điều kỳ diệu của tiệm tạp hóa Namiya-Chương 1       P1.mp3","books/audios/Điều kỳ diệu của tiệm tạp hóa Namiya-Chương 1-              P2.mp3","books/audios/Điều kỳ diệu của tiệm tạp hóa Namiya-Chương 02.mp3"],
        PDF:"books/pdfs/Điều Kỳ Diệu Của Tiệm Tạp Hóa NAMIYA.pdf",
        Image:"books/images/Điều Kỳ Diệu Của Tiệm Tạp Hóa NAMIYA.jpg",
        PublishingCompany:"Nhà Xuất Bản Tổng Hợp Thành Phố Hồ Chí Minh",
        ImageURL:"../assets/images/other_words_for_home.jpg"
      }
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
                        source={images.otherWordsForHome}
                            />
                </View>
                <View> 
                    <Text style={styles.text}>{book.Title}</Text>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <Text style={{color: COLORS.black, fontSize: 15}}>BY </Text>
                        <Text style={styles.textAuthor}>{book.Author}</Text>
                    </View>
                </View>
                <View style={styles.viewCompany}>
                    <Text style={styles.textCompany}>Company :</Text>
                    <TouchableOpacity
                            style={styles.buttonCompany}
                        >
                            <Text style={styles.textButtonCompany}>{book.Company}</Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.viewCompany}>
                <Text style={styles.textCompany}>Status :</Text>
                <TouchableOpacity
                        style={styles.buttonCompany}
                    >
                        <Text style={styles.textButtonCompany}>{book.Status}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewCompany}>
                <Text style={styles.textCompany}>Type :</Text>
                <TouchableOpacity
                        style={styles.buttonCompany}
                    >
                        <Text style={styles.textButtonCompany}>{book.Type}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewCompany}>
                <Text style={styles.textCompany}>Star :</Text>
                <TouchableOpacity
                        style={styles.buttonCompany}
                    >
                        <Text style={styles.textButtonCompany}>{book.Star}</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.viewOther} >
                <Text style={styles.textOther}>Status : Đã hoàn thành</Text>
                <Text style={styles.textOther}>Type : NOVEL</Text>
                <Text style={styles.textOther}>Star : 5</Text>
                </View> */}
            </ImageBackground>
            <View style={styles.areaDescription}>    
                <View>
                    <Text style={styles.text1}>Mô tả</Text>
                    <Text style={styles.textDescription}>{book.Description}</Text>
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
            </View>
        </ScrollView>
                
        
        
    )
}
const styles = StyleSheet.create({
    container: {
        
      
    },
    container1:{
        paddingTop:5,
        alignItems: "center",
    },
    viewCompany:{
        marginTop: 10,
        height: 30,
        flexDirection : "row",
        alignItems : "center",
        marginLeft: 20,

    },
    textCompany:{
        width: 100,
        alignItems: "center",
        borderRadius:50,
        fontSize:17,
        color:COLORS.black,
    },
    buttonCompany:{
        borderRadius:20,
        marginLeft: 10,
        flex: 1,
    },
    textButtonCompany:{
        color:COLORS.main,
        fontWeight:"bold",
        fontSize:15,
    },
    image: {
      justifyContent: "center",      
    },
    text: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
    },
    textAuthor:{
        color: COLORS.main,
        fontSize: 18,
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
        height:400,
        width:320,
        paddingTop:50,
        borderRadius:15,
    },
    areaDescription:{
        backgroundColor:COLORS.gainsboro,
        borderRadius:20,
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
        paddingTop:35,
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
        borderWidth:3,
        borderRadius:20,
        minWidth:50,
        borderColor:COLORS.gray,    
    },


  });

export default BookDetail
