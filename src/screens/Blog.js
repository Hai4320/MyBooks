import React,{ useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import {Searchbar} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {AllPosts} from '../redux/selectors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS,SIZES} from '../constants';

const Blog = () => {
    //khai bao
    const dispatch = useDispatch();
    const posts = useSelector(AllPosts).sort((a, b)=> a.createdAt<b.createdAt);
    const [postList, setPostList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeSearch, setTypeSearch] = React.useState('All');

    // Load data 
    useEffect(() => {
       setPostList(posts);
    }, [posts])
    return (
        <View>
            <Searchbar
                placeholder="Search Here..."
                onChangeText={(value)=> setSearchQuery(value)}
                value={searchQuery}/>
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            {searchQuery.length != 0 ? (
            <Picker
              selectedValue={typeSearch}
              style={{height: 50, width: 160}}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>setTypeSearch(itemValue)}>
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Title" value="Title" />
              <Picker.Item label="Author" value="Author" />
            </Picker>): null
            }
            </View>
            <FlatList
            data={postList}
            style={{marginBottom: 60}}
            renderItem={({item}) =>
                <View style={{width: '100%', backgroundColor: COLORS.white, marginTop: 5,marginBottom: 5, padding: 2}}>
                    <TouchableOpacity><Text style={{fontSize: 18, fontWeight: 'bold'}} numberOfLines={2}>{item.title}</Text></TouchableOpacity>
                    <Text style={{fontSize: 15, color: COLORS.lightseagreen, marginLeft: 10}}>@{item.userName}</Text>
                    <View style={{padding: 10,}}><Text numberOfLines={10} style={{textAlign: 'justify'}}>{item.details}</Text></View>
                    <TouchableOpacity style={{width: '100%', height: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: COLORS.button}}>Read More...</Text>
                    </TouchableOpacity>
                </View>
            }/>
          </View>
    )
}

export default Blog
