import React,{useState,useEffect} from 'react'
import { View, Text, Image, FlatList, ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import {COLORS} from '../constants'
import {useSelector} from 'react-redux'
import {AllBooks} from '../redux/selectors'

const Home = () => {
    const books = useSelector(AllBooks);
    const [booksList, setBooksList] = useState(books);
    useEffect(()=>{
        setBooksList(books);
    },[books])
    return (
        
        <ScrollView>
            {   booksList.length===0 ?
                <FlatList
                data={[...Array(2).keys()]}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <View style={{height: 200, width: 200, margin: 5, backgroundColor: COLORS.gainsboro}}/>}/>
                :<FlatList
                data={booksList}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <Image style={{height: 200, width: 200, margin: 5, resizeMode: 'contain',}} source={{uri: item.ImageURL}}/> }/>
            }      
        </ScrollView>
        
        
        
    );
}   

export default Home
