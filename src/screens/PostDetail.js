import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity, Image} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS,images, SIZES} from '../constants';
import {AllPostsViewData, AllPostHistory} from '../redux/selectors'
import {viewPost, likePost} from '../redux/actions/postAction'
import {checkDate} from '../component/CheckDate'

const PostDetail = ({navigation, route}) => {
    const dispatch = useDispatch();
    const post = route.params;
    const viewData = useSelector(AllPostsViewData).find(p => p.postID==post._id);
    const userHistory = useSelector(AllPostHistory).find(p => p.postID==post._id);
    const [view, setView] = useState({viewData: viewData, userHistory: userHistory}); 
    // function
    const handleLike = async() =>{
        const result = await dispatch(likePost(post._id));
    }
    // load time
    useEffect(async () =>{
        if (userHistory===undefined) {
            const result = await dispatch(viewPost(post._id))
        }
    },[])
    useEffect(()=>{
        setView({viewData: viewData, userHistory: userHistory})
    },[viewData,userHistory])
    return (
        <ScrollView
        style={{backgroundColor: COLORS.main}}
        // refreshControl={
        //     <RefreshControl
        //     />}
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
                <View style={{marginTop: 10}}>
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
                    <View>

                    </View>
                    <View>
                        
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
