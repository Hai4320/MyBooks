import React,{useState,useEffect} from 'react'
import { View, Text, Image, FlatList, ScrollView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import {COLORS} from '../constants'

const Home = () => {
    const [imageUrl, setImageUrl] = useState([]);
    const image = ['images/h1.jpg','images/h5.jpg','images/h11.jpg','images/h13.jpg','images/h15.jpg','books/images/Bước Chậm Lại Giữa Thế Gian Vội Vã.jpg']
    useEffect(async () => {
        const x= [];
        for (i in image) {
            try {
                const url = await storage().ref(image[i]).getDownloadURL()
                x.push({id: image[i], url: url})
            }
            catch (err) {
                console.log('ERROR')
            }
        }

        setImageUrl(x);
    }, []);
    return (
        <ScrollView>
            { 
                imageUrl.length === image.length 
                ? 
                <FlatList
                data={imageUrl}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <Image style={{height: 200, width: 200, margin: 5}} source={{uri: item.url}} />}/>
                : <FlatList
                data={image}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <View style={{height: 200, width: 200, margin: 5, backgroundColor: COLORS.gainsboro}} source={{uri: item.url}} />}/>
            }
        </ScrollView>
        
        
        
    );
}   

export default Home
