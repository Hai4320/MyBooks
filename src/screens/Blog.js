import React,{ useState,useEffect, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, FlatList,TouchableOpacity,Image, RefreshControl} from 'react-native'
import {Searchbar} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {AllPosts} from '../redux/selectors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS,SIZES} from '../constants';
import {checkDate} from '../component/CheckDate'
import { getPosts } from '../redux/actions/postAction';


const Blog = ({navigation,route}) => {
    //khai bao
    const dispatch = useDispatch();
    const posts = useSelector(AllPosts).sort((a, b)=> a.createdAt<b.createdAt);
    const [postList, setPostList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeSearch, setTypeSearch] = React.useState('All');

    // Load data 
    useEffect(() => {
       setPostList(posts);
    }, [posts]);
    useEffect(()=>{
        if (searchQuery==="") return;
        const x= posts.slice();
        const y = x.filter(i =>(i.title.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1)||(i.userName.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1))
        setPostList(y);
    },[searchQuery])
    // View Post 
    const handleView = (item) =>{
        navigation.push("PostDetail",item);
    }
     //refreshing
     const [loadRefreshing, setLoadRefreshing] = useState(false);
     const [refreshing, setRefreshing] = useState(false);
     const onRefresh = useCallback(async () => {
     setRefreshing(true);
         const result2 = await dispatch(getPosts(setLoadRefreshing));
         setRefreshing(false);
     }, []);
    return (
        <View>
            <Searchbar
                placeholder="Search Here..."
                onChangeText={(value)=> setSearchQuery(value)}
                value={searchQuery}/>
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            {/* {searchQuery.length != 0 ? (
            <Picker
              selectedValue={typeSearch}
              style={{height: 50, width: 160}}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>setTypeSearch(itemValue)}>
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Title" value="Title" />
              <Picker.Item label="Author" value="Author" />
            </Picker>): null
            } */}
            </View>
            <FlatList
             refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
            }
            data={postList}
            style={searchQuery ===""?{marginBottom: 50}: {marginBottom:100}}
            renderItem={({item}) =>
                <View style={{width: '100%', backgroundColor: COLORS.white, marginTop: 5,marginBottom: 15, padding: 2, borderRadius: 10, paddingTop: 5}}>
                    <TouchableOpacity
                     onPress={() => handleView(item)}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}} numberOfLines={2}>{item.title}   
                        </Text>
                      
                    </TouchableOpacity>
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 15, color: COLORS.lightseagreen, marginLeft: 10}}>@{item.userName}</Text>
                        <Text style={{fontSize:13, width: 80, marginLeft: 15, color: COLORS.gray, fontStyle:"italic"}}>{checkDate(item.createdAt)}</Text>
                    </View>
                    <View style={{padding: 10, flexDirection: "column", justifyContent: "center", alignItems: 'center'}}>
                        {item.image!==""?
                        <Image
                        source={{uri: item.imageURL}} 
                        resizeMode={'contain'}
                        style={{width: 120, height: 120}}/>
                        : null}
                        <Text numberOfLines={3} style={{flex: 1, lineHeight: 22}}>   {item.details}</Text>
                    </View>
                    <TouchableOpacity 
                        style={{width: '100%', height: 30, justifyContent: 'center', alignItems: 'center'}}
                        onPress={()=> handleView(item)}>
                        <Ionicons style={{fontSize: 30, color: COLORS.button}} name="ellipsis-horizontal"/>
                        {/* <Text style={{fontSize: 16, color: COLORS.button, width: 100, }} numberOfLines={1}>Read More...</Text> */}
                    </TouchableOpacity>
                </View>
            }/>
          </View>
    )
}

export default Blog
