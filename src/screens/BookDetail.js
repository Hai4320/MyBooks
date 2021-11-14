import React,{useState,useEffect,useCallback} from 'react';
import { ImageBackground, StyleSheet, Text, View,Image,ScrollView ,TouchableOpacity,TextInput, ToastAndroid, RefreshControl} from "react-native";
import {COLORS,images} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {useSelector, useDispatch} from 'react-redux';
import {AllBooksHistory, BookComments} from '../redux/selectors'
import { likeBook,saveBook, getComments} from '../redux/actions/bookAction';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

// const images = { source={require('')} };
const BookDetail = ({navigation, route}) => {
    // Data   
    const dispatch = useDispatch();
    const [book, setBook] = useState(route.params);
    const [history,setHistory] =  useState(data)
    const data = useSelector(AllBooksHistory).find(item => book._id === item.bookID);
    const comments = useSelector(BookComments);
    // get comments function
    const loadComments = async()=> {
        const loadx = await dispatch(getComments(book._id))
    }
    // set load data
    useEffect(async()=>{
        await loadComments();
    },[])
    useEffect(()=>{
        setHistory(data)
    },[data])
    // click function
    const handleLike= async ()=>{
        const result = await dispatch(likeBook(book._id));
       
    }
    const handleSave= async ()=>{
        const result = await dispatch(saveBook(book._id));
        ToastAndroid.show("save", ToastAndroid.SHORT)
    }
    //refreshing
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
    // Show state 
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
            }>
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
                    onPress={()=> handleSave()}>
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
                <Text style={styles.textCompany}>Publisher:</Text>
                <TouchableOpacity
                        style={styles.buttonCompany}
                    >
                        <Text style={styles.textButtonCompany} numberOfLines={1}>{book.PublishingCompany}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            {/* Description */}
            <View style={styles.areaDescription}>    
                <TouchableOpacity style={styles.titleDescription}
                onPress={() => setShow1(!show1)}>
                    <Text style={styles.textDescription} numberOfLines={1}>Description</Text>
                    <Ionicons name="caret-down" style={styles.iconDescription}></Ionicons>
                </TouchableOpacity>
                { show1? 
                <View style={{padding: 10}}>
                    <Text>{book.Description}</Text>
                </View>
                : null}
            </View>
            {/* Chat */}
            <View style={styles.areaDescription}>    
                <TouchableOpacity 
                    style={styles.titleDescription}
                    onPress={() => setShow2(!show2)}>
                    <Text style={styles.textDescription} numberOfLines={1}>Comments</Text>
                    <Ionicons name="chatbox-ellipses" style={styles.iconDescription}></Ionicons>
                </TouchableOpacity>
                { show2?
                <View style={{width: '100%'}}>
                <TextInput style={styles.textInput}
                    multiline={true}
                    placeholder="Write your comment"/>
                <View style={{width: '100%', padding:2}}>
                    {comments.map((cmt) =>
                    <View key={cmt.id} style={{width: '100%', justifyContent: "flex-start",alignItems: 'center',flexDirection: 'column', borderWidth: 1,margin: 1, borderRadius: 10, borderColor: COLORS.gray}}>
                        <View style={{flexDirection: 'row',width: '99%'}}>
                            <Image
                                style={{width: 50, height:50, borderRadius:50}}
                                source={cmt.userAvatar===''? images.defaultAvatar:{uri: user.avatarURL}}
                            />
                            <View style={{height: 40, flexDirection: 'column', }}>
                                
                                <Text style={{fontSize:16, fontWeight: 'bold',  marginLeft: 5}}>@{cmt.userName}</Text>
                                <Text style={{fontSize:13, color: COLORS.gray, marginLeft: 5}}>2 min</Text>
                            </View>
                        </View>
                        <Text style={{width: '100%', padding: 5, paddingLeft: 10}}>{cmt.details}</Text>    
                    </View>)}
                </View></View>:null}
            </View>
                    
        </ScrollView>
                
        
        
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
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
        marginLeft: '10%',

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
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: COLORS.white,
        width:"100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    titleDescription:{
        height: 40,
        width: "95%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.lavender,
        borderRadius: 5, 


    },
    textDescription:{
        fontSize:18,
        color: COLORS.white
        
    },
    iconDescription:{
        fontSize:20,
        color: COLORS.white, 
        marginLeft:10,
        justifyContent: 'center',
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
        width:"100%",
    },


  });

export default BookDetail
