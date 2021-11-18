import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity, Image, TextInput} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS,images, SIZES} from '../constants';
import {AllPostsViewData, AllPostHistory, PostComments} from '../redux/selectors'
import {viewPost, likePost, getComments, createComments} from '../redux/actions/postAction'
import {checkDate} from '../component/CheckDate'

const PostDetail = ({navigation, route}) => {
    const dispatch = useDispatch();
    const post = route.params;
    const viewData = useSelector(AllPostsViewData).find(p => p.postID==post._id);
    const userHistory = useSelector(AllPostHistory).find(p => p.postID==post._id);
    const comments = useSelector(PostComments).sort((a,b) => a.createdAt>b.createdAt);
    const [view, setView] = useState({viewData: viewData, userHistory: userHistory}); 
    const [loading,setLoading] = useState(false);
    const [text,setText] = useState("");
    // function
    const handleLike = async() =>{
        const result = await dispatch(likePost(post._id));
    }
    //createComments
    const summitText = async ()=>{
        if (text === "") return;
        const result = await dispatch(createComments(post._id,text));
        setText("")
    }
    //loadComments
    const loadComments = async()=> {
        const loadx = await dispatch(getComments(post._id,setLoading))
    }
    // load time

    useEffect(async () =>{
        if (userHistory===undefined) {
            const result = await dispatch(viewPost(post._id))
        }
        await loadComments();
    },[])
    // set load data
    useEffect(async()=>{
       
    },[])
    useEffect(()=>{
        setView({viewData: viewData, userHistory: userHistory})
    },[viewData,userHistory])
    //refreshing
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadComments();
    setRefreshing(false);
     }, []);
    return (
        <ScrollView
        style={{backgroundColor: COLORS.main}}
        refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
        }
        >
            <TouchableOpacity 
                style={{position: 'absolute', top: 10, left: 10, width: 40, height: 40, zIndex: 2}} 
                onPress={()=>navigation.goBack()}>
                <Ionicons name="chevron-back-outline" style={{fontSize: 30}}color={COLORS.white} />
            </TouchableOpacity>
            <View style={styles.box}>
                <View style={{marginTop: 20, justifyContent: 'center', alignItems: 'center', paddingLeft: 3, paddingRight: 3}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{post.title}</Text>
                </View>
                <View style={{flexDirection: "column", justifyContent: "flex-start", paddingLeft: 20, paddingRight: 20}}>
                    <View style={{flexDirection: 'row', height: 25}}>
                        <Text style={{color: COLORS.gray, fontSize: 13}}>By: </Text>
                        <Text style={{color: COLORS.lightseagreen}}>@{post.userName}</Text>
                    </View>
                    <View style={{flexDirection: 'row', height: 25}}>
                        <Text style={{color: COLORS.gray, fontSize: 14}}>At: </Text>
                        <Text style={{color: COLORS.dodgerblue, fontStyle: 'italic',}}>{checkDate(post.createdAt)}</Text>
                    </View>
                    <View style={{flexDirection: 'row', height: 25}}>
                        <Text style={{color: COLORS.gray, fontSize: 14}}>View: </Text>
                        <Text style={{color: COLORS.red,}}>{view.viewData.viewed}</Text>
                    </View>
                </View>
                <View style={{marginTop: 10, padding: 5, alignItems: 'center'}}>
                {post.image!==""?
                        <Image
                        source={{uri: post.imageURL}} 
                        resizeMode={'contain'}
                        style={{width: 200, height: 200}}/>
                        : null}
                    <Text style={{textAlign: 'justify', fontSize: 16, lineHeight: 28}}>{post.details}</Text>
                </View>
                <Text style={{fontWeight: 'bold'}}>END.</Text>
                <View style={{marginTop: 10, width: '100%'}}>
                    <View style={{flexDirection: 'row', width: '100%', height: 40, borderWidth: 1, borderColor: COLORS.gainsboro}}>
                        <TouchableOpacity 
                        onPress={() =>handleLike()}
                        style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' , borderRightWidth: 1, borderColor: COLORS.gainsboro}}>
                            <Ionicons name={view.userHistory===undefined||view.userHistory.liked ===false ? "heart-outline": "heart"}style={{color: COLORS.love, fontSize: 20}}/>
                            <Text style={{color: COLORS.love, fontSize: 15}}> {view.viewData.liked}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="chatbox-ellipses-outline" style={{color: COLORS.black33, fontSize: 20}}/>
                            <Text style={{color: COLORS.black33, fontSize: 15}}> Comments</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                        <TextInput style={{ borderWidth: 1, borderColor: COLORS.black33, borderRadius: 10, flex: 1, marginLeft: 2, marginRight: 2 }}
                            multiline={true}
                            placeholder="Write your comment"
                            onChangeText={text => setText(text)}/>
                        <TouchableOpacity
                            onPress={() =>summitText()}
                            focused={false}
                            style={{width: 70, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor:COLORS.button, borderRadius: 15}}>
                            <Text style={{color: COLORS.white}}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', padding:2}}>
                        {comments.map((cmt) =>
                        <View key={cmt.id} style={{width: '100%', justifyContent: "flex-start",alignItems: 'center',flexDirection: 'column', borderWidth: 1,margin: 1, borderRadius: 10, borderColor: COLORS.gainsboro}}>
                            <View style={{flexDirection: 'row',width: '99%'}}>
                                <Image
                                    style={{width: 50, height:50, borderRadius:50}}
                                    source={cmt.userAvatar===''? images.defaultAvatar:{uri: user.avatarURL}}
                                />
                                <View style={{height: 40, flexDirection: 'column', }}>
                                    
                                    <Text style={{fontSize:16, fontWeight: 'bold',  marginLeft: 5}}>@{cmt.userName}</Text>
                                    <Text style={{fontSize:13, color: COLORS.gray, marginLeft: 5}}>
                                        { checkDate(cmt.createdAt)}
                                    </Text>
                                </View>
                            </View>
                            <Text style={{width: '100%', padding: 5, paddingLeft: 10}}>{cmt.details}</Text>    
                        </View>)}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default PostDetail

const styles = StyleSheet.create({
    box:{
        marginTop: 50,
        flex: 1,
        flexDirection: 'column',
        justifyContent:'flex-start',
        alignItems: 'center',
        minHeight: SIZES.height-80,
        width: '100%',
        flex: 1,
        padding: 2,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
})
