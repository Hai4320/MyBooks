import React,{useState,useEffect} from 'react';
import { ImageBackground, StyleSheet, Text, View,Image,ScrollView ,TouchableOpacity,TextInput, ToastAndroid} from "react-native";
import {COLORS,images} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {useSelector, useDispatch} from 'react-redux';
import {AllBooksHistory} from '../redux/selectors'
import { likeBook } from '../redux/actions/bookAction';


// const images = { source={require('')} };
const BookDetail = ({navigation, route}) => {
    const dispatch = useDispatch();
    const [book, setBook] = useState(route.params);
    const data = useSelector(AllBooksHistory).find(item => book._id === item.bookID);
    const [history,setHistory] =  useState(data)
    useEffect(()=>{
        setHistory(data)
    },[data])
    const handleLike= async ()=>{
        const result = await dispatch(likeBook(book._id));
       
    }
    return (
        <ScrollView style={styles.container}>
            {/* Header Image */}
            <ImageBackground source={require('../assets/images/background5.jpg')} style={styles.image}>
                <View>
                    <TouchableOpacity 
                    style={styles.a}
                    onPress={()=> navigation.goBack()}>
                        <Ionicons name='chevron-back-outline' size={35} color={COLORS.lightseagreen}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.container1}>
                    <Image
                        style={styles.imagee}
                        source={{uri: book.ImageURL}}
                            />
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}> 
                    <Text style={styles.text}>{book.Title}</Text>
                    <View style={{flexDirection: 'row' ,alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                        <Text style={{fontSize: 17, textAlign: 'center', flex: 1, color: COLORS.button}} numberOfLines={1}>{book.Author}</Text>
                    </View>
                </View>
                {/* View like */}
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 100}}>
                        <Ionicons name='eye-outline' style={{fontSize: 20, color: COLORS.button}}/>
                        <Text style={{fontSize: 14, marginLeft: 2, color: COLORS.button, paddingRight: 5,}}>{book.view} </Text>
                    </TouchableOpacity>
                   <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 100}}
                   onPress={()=> handleLike()}>
                        <Ionicons name={history===undefined || history.liked ===false ? 'heart-outline':'heart'}  style={{fontSize: 20, color: COLORS.love}}/>
                        <Text style={{fontSize: 14, marginLeft: 2, color: COLORS.love}}>{book.like} </Text>
                    </TouchableOpacity>
                    
                    
               </View>
                <Rating
                    ratingCount={5}
                    startingValue={book.Star}
                    imageSize={25}
                    onFinishRating={()=> ToastAndroid.show("voted", ToastAndroid.SHORT)}
                    style={{marginTop: 10}}
                />

                {/* Break line */}
                <View style={{width: '100%', alignItems: 'center', justifyContent: 'center' , marginTop: 10, marginBottom: 10}}>
                    <View style={{width: '70%', borderBottomColor: COLORS.black, borderBottomWidth: 1}}/>
                </View>
                <View style={styles.fixButton}>
                    <TouchableOpacity
                    style={{ width: '80%', height: 40, borderRadius: 50, backgroundColor: COLORS.backmain, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}
                    onPress={()=> ToastAndroid.show("save", ToastAndroid.SHORT)}>
                        <Ionicons name={history===undefined || history.saved ===false ?"bookmark-outline": "bookmark"} style={{ fontSize: 20, color: COLORS.white}}/>
                        <Text style={{fontSize:15, marginLeft: 4, color: COLORS.white}}>{history===undefined || history.saved ===false ? "Save": "Saved"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.fixButton}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>navigation.push("BookPDF",book)}
                        
                    >
                        <Text style={styles.textButton}>Read PDF</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.fixButton}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>navigation.push("BookAudio",book)}
                    >
                        <Text style={styles.textButton}>Listen Audio</Text>
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
                    <Text style={styles.textCompany}>Company :</Text>
                    <TouchableOpacity
                            style={styles.buttonCompany}
                        >
                            <Text style={styles.textButtonCompany}>{book.Company}</Text>
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
            </ImageBackground>
            <View style={styles.areaDescription}>    
                <View>
                    <Text style={styles.text1}>Description</Text>
                    <Text style={styles.textDescription}>{book.Description}</Text>
                </View>
                <View style={styles.viewInput}>
                    <TextInput style={styles.textInput}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Write your comment"/>   
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
        marginLeft: '20%',

    },
    textCompany:{
        width: 100,
        alignItems: "center",
        borderRadius:50,
        fontSize:15,
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
      marginLeft: 5,
      marginRight: 5,
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
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
        height: 300,
        width: 210,
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
        paddingTop: 10,
        paddingBottom: 10,
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
