import React,{useState,useEffect,useMemo, useCallback} from 'react'
import { View, Text, ScrollView, Image, StyleSheet,TouchableOpacity,Button,TouchableHighlight, Alert} from 'react-native'
import { userDataImage } from '../component/AsyncStorage'
import {images, COLORS, SIZES} from '../constants'
import {LoadImageUrl} from '../component/LoadImage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AllBooks, AllBooksViewData, AllBooksHistory} from '../redux/selectors'
import { viewBook } from '../redux/actions/bookAction';
import { getMyPost } from '../redux/actions/postAction';
import { MyPosts} from '../redux/selectors'
import {checkDate} from '../component/CheckDate'


const User = ({navigation}) => {
    const dispatch = useDispatch();
    //Tab sort
    const [labelactive, setLabelActive]= useState(0);
    const [labelactive2, setLabelActive2]= useState(0);
    //Book Data
    const books = useSelector(AllBooks);
    const booksViewData = useSelector(AllBooksViewData);
    const booksHistory = useSelector(AllBooksHistory);
    const [booksData, setBooksData] = useState(books);
    const [booksFiter, setBooksFilter] = useState([]);
    const booksView = useMemo(() => books.slice(), [books]);
    useEffect(()=>{
        booksView.map( item =>{
            item.view = booksViewData.filter(x => x.bookID === item._id)[0].view;
            item.like = booksViewData.filter(x => x.bookID === item._id)[0].like;
        })
    },[books,booksViewData])
    useEffect(()=>{
        setBooksData(booksView);
    },[books,booksViewData]) 
    useEffect(()=>{
        var temp;
        if (labelactive2===0)
            temp = (booksData.slice()).filter(item => booksHistory.find(x => x.bookID === item._id && x.saved===true)!==undefined);
        else if (labelactive2===1)
            temp = (booksData.slice()).filter(item => booksHistory.find(x => x.bookID === item._id && x.liked===true)!==undefined);
        else if (labelactive2===2)
            temp = (booksData.slice()).filter(item => booksHistory.find(x => x.bookID === item._id)!==undefined);
        setBooksFilter(temp);
    },[labelactive2,booksHistory]);
    const handleView = async (item)=>{
        navigation.push("BookDetail",item)
        if (booksHistory.find(book => book.bookID===item._id)===undefined){
            const result = await dispatch(viewBook(item._id));
        }
    }
    //open Edit Post
    const handleOpenPost = async (item)=>{
        if (item.accept ===true||item.Upload === true)
            {
                Alert.alert("Can't edit this post");
            }
        else {
            navigation.push("PostAdd", item)
        }

    }
    // Post Data
    const posts = useSelector(MyPosts);
    const [postData,setPostData]= useState([]);
    const x=[];
    useEffect(()=>{
        setPostData(posts)
    },[posts])
    useEffect(async()=>{
        const result = await dispatch(getMyPost());
    },[])
    //--------------- User Data
    const [user,setUser] =useState({name: '', avatar:'',email: '', role: '',});
    useEffect(async ()=>{
        const x = await userDataImage();
        setUser(x)
    });
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //       loadData();
    //       //Put your Data loading function here instead of my loadData()
    //     });
    
    //     return unsubscribe;
    //   }, [navigation]);
    //Log Out Function
    const logOut = async ()=>{
        Alert.alert("Log out","You will logout!",[
            // The "Yes" button
            {
              text: "Yes",
              color: COLORS.red,
              onPress: async () => {
                try {
                    await AsyncStorage.removeItem('isLogin');
                    await AsyncStorage.removeItem('userData');
                    navigation.replace('Login');
                    return true;
                }
                catch(exception) {
                    console.error(exception)
                    return false;
                }
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ])   
    }
    return (
        <ScrollView 
        style={styles.container} 
        nestedScrollEnabled = {true} 
        >
        <Text style={styles.title}>User</Text>
          <View style={styles.box}>
            <View style={styles.containerData}> 
                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={() =>{navigation.push("UserEdit")}}>
                    <Image style={styles.avatar} source={user.avatar===''? images.defaultAvatar:{uri: user.avatarURL}}/>    
                </TouchableOpacity>
                <View style={styles.dataView}>
                    <Text style={[styles.userDataView, {fontWeight: 'bold'}]} numberOfLines={1}>{user.name.toUpperCase()}</Text>
                    <Text style={styles.userDataView} numberOfLines={1}>{user.email}</Text>
                </View>
                <TouchableHighlight
                    style={styles.logoutContainer}
                    underlayColor={COLORS.gainsboro}
                    onPress={()=>logOut()}
                >
                    <Ionicons name="log-out-outline" style={styles.logout}/>
                </TouchableHighlight>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableHighlight
                    style={[styles.button,{width: 40}]}
                    onPress={() => navigation.push("Notification")}
                    underlayColor={COLORS.main}>
                    <Ionicons style={[styles.buttonText,{fontSize: 20}]} name={'notifications'}/>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.button,{flex: 1}]}
                    onPress={() =>{navigation.push("UserEdit")}}
                    underlayColor={COLORS.main}>
                    <Text style={styles.buttonText} >Edit  User</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.viewBreak}/>
            <View style={styles.container2}>
                <View style={{width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection:'row'}}>
                   <TouchableOpacity 
                   style={labelactive!==0 ? styles.label: styles.labelAc}
                   onPress={() =>setLabelActive(0)}>
                       <Ionicons name="library-outline" style={labelactive!==0 ? styles.labelTitle: styles.labelTitleAc}/>
                   </TouchableOpacity>
                   <View style={{width: 2}}/>
                   <TouchableOpacity 
                   style={labelactive!==1 ? styles.label: styles.labelAc}
                   onPress={() =>setLabelActive(1)}>
                       <Ionicons name="newspaper-outline" style={labelactive!==1 ? styles.labelTitle: styles.labelTitleAc}/>
                   </TouchableOpacity>
                </View>
                {
                labelactive===0?
                <View style={styles.container3}>
                <View style={{width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', flexDirection:'row'}}>
                    <TouchableOpacity 
                    style={labelactive2===0? styles.label2Ac: styles.label2}
                    onPress={() =>setLabelActive2(0)}>
                        <Text style={labelactive2===0? {color: COLORS.white}: {color: COLORS.black33}}>
                            Saved
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={labelactive2===1? styles.label2Ac: styles.label2}
                    onPress={() =>setLabelActive2(1)}>
                        <Text style={labelactive2===1? {color: COLORS.white}: {color: COLORS.black33}}>
                            Liked
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                   style={labelactive2===2? styles.label2Ac: styles.label2}
                   onPress={() => setLabelActive2(2)}>
                        <Text  style={labelactive2===2? {color: COLORS.white}: {color: COLORS.black33}}>
                            Viewed
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* --------------- Set Book View -----------*/}
                {booksFiter.length===0? 
                <Text>Nothing</Text>
                : <ScrollView 
                style={{flex: 1, width: '100%', height: '100%'}} 
                nestedScrollEnabled = {true}>
                    {booksFiter.map((item)=>
                    <TouchableOpacity 
                    style={{height: 110, marginTop: 10, flexDirection: 'row'}} 
                    key={item._id}
                    onPress={() => handleView(item)}>
                        <Image style={{height: 100, width: 100, margin: 5, resizeMode: 'contain',}} source={{uri: item.ImageURL}} />
                        <View style={{height: 110, flex: 1, flexDirection: 'column'} }>
                            <Text style={{fontSize: 15, width: '100%', height: 40, fontWeight: 'bold', marginTop: 5, color: COLORS.black33}} numberOfLines={2}>{item.Title}</Text>
                            <Text style={{fontSize: 14, width: '100%', height: 18, marginTop: 5,marginBottom: 5, color: COLORS.black66}} numberOfLines={1}>{item.Author}</Text>
                            <View style={{marginTop: 5, height: 20, alignItems: 'center', flexDirection: 'row', width: '100%', }}>
                                <View style={{flexDirection: 'row', marginRight: 10, alignItems: 'center', width: 60 }}>
                                    <Ionicons name='eye-outline' style={{color: COLORS.button}}/>
                                    <Text style={{fontSize: 13, width: '100%', color: COLORS.button, marginLeft: 2}}>{item.view}</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginRight: 10, alignItems: 'center', width: 60 }}>
                                    <Ionicons name='heart-outline' style={{color: COLORS.love}}/>
                                    <Text style={{fontSize: 13, width: '100%', color: COLORS.love, marginLeft: 2}}>{item.like}</Text>
                                </View>
                                {/* <View style={{flexDirection: 'row', marginRight: 10, alignItems: 'center', width: 60 }}>
                                    <Ionicons name='chatbox-outline' style={{color: COLORS.black33}}/>
                                    <Text style={{fontSize: 13, width: '100%', color: COLORS.black33, marginLeft: 2}}>10</Text>
                                </View> */}
                            </View>
                        </View>
                    </TouchableOpacity>
                    )} 
                    
               </ScrollView>}
            </View>
                : <View style={styles.container3}>
                    <TouchableOpacity 
                    style={styles.addBtn}
                    onPress={()=> navigation.push("PostAdd")}>
                        <Ionicons name='add-outline' style={{fontSize: 30, color: COLORS.white}}/>
                    </TouchableOpacity>
                    {/* --------------Set Post View ------------------*/}
                    {postData.length===0? 
                    <Text>Your Post is empty </Text>
                    :<ScrollView 
                    style={{flex: 1, width: '100%', height: '100%'}} 
                    nestedScrollEnabled = {true}>
                        {postData.map((item)=>
                        <TouchableOpacity 
                        onPress={()=> handleOpenPost(item)}
                        style={{height: 110, marginTop: 10, flexDirection: 'row'}} 
                        key={item._id}>
                            <Image style={{height: 100, width: 100, margin: 5, resizeMode: 'contain',}} source={item.image==="" ? images.defaultPost: {uri: item.imageURL} } />
                            <View style={{height: 110, flex: 1, flexDirection: 'column'} }>
                                <Text style={{fontSize: 15, width: '100%', height: 40, fontWeight: 'bold', marginTop: 5, color: COLORS.black33}} numberOfLines={2}>{item.title}</Text>
                                <Text style={{fontSize: 14, width: '100%', height: 18, marginTop: 5,marginBottom: 5, color: COLORS.black66}} numberOfLines={1}>{checkDate(item.createdAt)}</Text>
                                {item.accept === true? <Text style={{fontSize: 14, width: '100%',color:  COLORS.red}}>Accepted</Text>:item.upload ? <Text style={{fontSize: 14, width: '100%',color:  COLORS.tomato}}>Uploaded</Text>: <Text style={{fontSize: 14, width: '100%',color:  COLORS.button}}>Writing</Text>}
                                
                            </View>
                        </TouchableOpacity>
                        )} 
                        
                   </ScrollView>}
                </View>}
            </View>
          </View>
          
        </ScrollView>
       
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.main,
        height: '100%',
        maxHeight: SIZES.height,
    },

    box:{
        flex: 1,
        flexDirection: 'column',
        justifyContent:'flex-start',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        flex: 1,
        padding: 2,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    viewBreak:{
        borderBottomWidth: 1,
        width: '90%', 
        opacity: 0.6,
        marginTop: 15,
        marginBottom: 15,
        color: COLORS.black,
    },
    title:{
        fontSize: 20,
        height: 30,
        color: COLORS.white,
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
    },
    containerData: {
        width: '100%',
        height: 80,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',

    },
    avatar: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: COLORS.white,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: COLORS.gainsboro,  
    },
    avatarContainer:{
        width: 100,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    dataView: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    userDataView:{
        width: '100%',
        fontSize: 15,
        color: COLORS.black,
        
    },
    logoutContainer:{
        width: 80, 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    logout:{
        fontSize: 30,
        color: COLORS.main,
        
    },
    buttonGroup: {
        width: '100%', 
        height: 40, 
        paddingRight: 20, 
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    button:{
        backgroundColor: COLORS.button,
        height: 35, 
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5,
    },
    buttonText:{
        color: COLORS.white,
        fontSize: 15,
    },
    container2:{
        width: '100%',
        height:SIZES.height-10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        marginTop: 20,
    },
    label:{
        borderBottomWidth: 2,
        borderBottomColor: COLORS.gainsboro,
        flex: 1,
        height: 50, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelAc:{
        borderBottomWidth: 2,
        borderBottomColor: COLORS.main,
        flex: 1,
        height: 50, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelTitle:{
        fontSize: 15,
        color:COLORS.gainsboro
    },
    labelTitleAc:{
        fontSize: 25,
        fontWeight: 'bold',
        color:COLORS.main,
    },
    container3:{
        width: '100%',
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    addBtn:{
        width: 50,
        height: 50, 
        backgroundColor: '#2196F3', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginTop: 10,
        marginBottom: 10,
    },
    label2Ac:{
        backgroundColor: COLORS.main, 
        padding: 5, 
        paddingLeft: 10, 
        paddingRight: 10, 
        borderRadius: 20, 
        borderWidth:1, 
        borderColor:COLORS.main,
        marginLeft: 10,
    },
    label2:{
        backgroundColor: COLORS.white, 
        padding: 5, 
        paddingLeft: 10, 
        paddingRight: 10, 
        borderRadius: 20, 
        borderWidth:1, 
        borderColor:COLORS.black,
        marginLeft: 10,
    }
});

export default User
