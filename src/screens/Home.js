import React,{useState,useEffect} from 'react'
import { View, Text, Image, FlatList} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';

const Home = () => {
    const [imageUrl, setImageUrl] = useState([]);
    const image = ['h1.jpg','h5.jpg']
    useEffect(async () => {
        const x= [];
        for (i in image) {
            try {
                const url = await storage().ref('images/' + image[i]).getDownloadURL()
                x.push({id: image[i], url: url})
            }
            catch (err) {
                console.log('ERROR')
            }
        }
        setImageUrl(x);
    }, []);
    return (
        <FlatList
        data={imageUrl}
        renderItem={({item}) => <Image style={{height: 200, width: 200}} source={{uri: item.url}} />}
      />

        
    );
}   

export default Home
