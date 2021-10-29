import React,{useState,useEffect} from 'react'
import { View, Text, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {COLORS} from '../constants'
import {useSelector} from 'react-redux'
import {AllBooks} from '../redux/selectors'

const Home = ({navigation}) => {
    const books = useSelector(AllBooks);
    const [booksList, setBooksList] = useState(books);
    var booksList1 = booksList.slice();
    var booksList2 = booksList.slice();
    useEffect(()=>{
        setBooksList(books);
    },[books])
    useEffect(()=>{
        booksList1.sort((a,b)=> a.Title>b.Title);
        booksList2.sort((a,b)=> a.Title<b.Title)
    },[booksList])
    return (
        
        <ScrollView
        style={{backgroundColor: COLORS.white}}>
            <View style={{ backgroundColor: COLORS.main, width: 180, height: 46, justifyContent: 'center', position: 'relative', overflow: 'hidden', marginTop: 10, paddingLeft: 5 }}>
                <Text style={styles.title}>New Book</Text>
                <View style={styles.tag1CSS}/>
                <View style={styles.tag2CSS}/>
            </View>
            <View
            style={{flexGrow: 0,  marginBottom: 10}}>
                {   booksList.length===0 ?
                    <FlatList
                    data={[...Array(3).keys()]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <View style={{height: 200, width: 160, margin: 10, backgroundColor: COLORS.gainsboro, borderRadius: 8}}/>}/>
                    :<FlatList
                    data={booksList1}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => 
                    <TouchableOpacity 
                    style={styles.imageContainer}
                    onPress={()=>navigation.push("BookDetail",item)}
                    >
                        <Image style={ styles.imageCSS } source={{uri: item.ImageURL}}/>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center'}} numberOfLines={2}>{item.Title}</Text>
                        <Text style={{ textAlign: 'center', color: COLORS.button}} numberOfLines={2}>{item.Author}</Text>
                    </TouchableOpacity> }/>
                }      
            </View>

            {/* My book */}
            <View style={{ backgroundColor: COLORS.main, width: 180, height: 46, justifyContent: 'center', position: 'relative', overflow: 'hidden', marginTop: 10, paddingLeft: 5 }}>
                <Text style={styles.title}>Hot Book</Text>
                <View style={styles.tag1CSS}/>
                <View style={styles.tag2CSS}/>
            </View>
            <View
            style={{flexGrow: 0, marginBottom: 10 }}>
                {   booksList.length===0 ?
                    <FlatList
                    data={[...Array(3).keys()]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <View style={{height: 200, width: 160, margin: 10, backgroundColor: COLORS.gainsboro, borderRadius: 8}}/>}/>
                    :<FlatList
                    data={booksList2}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => 
                    <TouchableOpacity 
                    style={styles.imageContainer}
                    onPress={()=>navigation.push("BookDetail",item)}>
                        <Image style={ styles.imageCSS } source={{uri: item.ImageURL}}/>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center'}} numberOfLines={2}>{item.Title}</Text>
                        <Text style={{ textAlign: 'center', color: COLORS.button}} numberOfLines={2}>{item.Author}</Text>
                    </TouchableOpacity> }/>
                }      
            </View>

            {/* Best Seller */}
            <View style={{ backgroundColor: COLORS.main, width: 180, height: 46, justifyContent: 'center', position: 'relative', overflow: 'hidden', marginTop: 10, paddingLeft: 5 }}>
                <Text style={styles.title}>New Post</Text>
                <View style={styles.tag1CSS}/>
                <View style={styles.tag2CSS}/>
            </View>
            <View
            style={{flexGrow: 0, marginBottom: 10, width: '100%' }}>
                {   booksList.length===0 ?
                    ([...Array(3).keys()].map((index)=>
                    <View style={{height: 200, width: 160, margin: 10, backgroundColor: COLORS.gainsboro, borderRadius: 8}} key={index}/>))
                    :
                    ( booksList.map((item)=>
                    <TouchableOpacity 
                    style={styles.imageContainerBS} 
                    key={item._id}
                    onPress={()=>navigation.push("BookDetail",item)}>
                    <Image style={ styles.imageCSSBS } source={{uri: item.ImageURL}}/>
                    <View style={{paddingLeft: 10, paddingBottom: 5, justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold',    color: COLORS.black}}>Hành trình về Phương Đông</Text>
                            <Text style={{ fontSize: 14, color: COLORS.gray}}>Nguyễn Phong</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.followNLike}>
                                <Ionicons name='eye' style={[styles.ioiconCSS,{color: COLORS.button}]}/>
                                <Text style={{color: COLORS.button, fontSize: 12}}>164</Text>
                            </View>
                            <View style={styles.followNLike}>
                                <Ionicons name='heart' style={[styles.ioiconCSS,{color: COLORS.love}]}/>
                                <Text style={{color: COLORS.love, fontSize: 12}}>164</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity  onPress={()=>navigation.push("BookAudio",item)}><Text style={styles.textAuPD}>Audio</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.push("BookPDF",item)}><Text style={styles.textAuPD}>PDF</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height: 1, width: '94%', position: 'absolute', left: '1%', bottom: -10, backgroundColor: COLORS.main}}/>
                </TouchableOpacity>))
                }      
            </View>
        </ScrollView>
        
    );
}   

const styles = StyleSheet.create({
    title: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
        paddingLeft: 20,
        textShadowColor: '#000',
        shadowOpacity: 1,
        textShadowOffset: {
            width: 3,
            height: 3
        },
        textShadowRadius: 10,
        
    },
    tag2CSS: {
        backgroundColor: COLORS.white,
        width: 46,
        height: 25,
        position: 'absolute',
        right: -10,
        bottom: -10,
        transform: [{rotate: "-34deg"}]
        
    },
    tag1CSS: {
        backgroundColor: COLORS.white,
        width: 46,
        height: 25,
        position: 'absolute',
        right: -10,
        bottom: -10,
        top: -10,
        transform: [{rotate: "34deg"}]
    },
    imageCSS: {
        width: 160,
        height: 200,
        resizeMode:'contain',
        borderRadius: 8
    },
    imageCSSBS: {
        height: 140,
        width: 100,
        resizeMode:'contain',
        borderRadius: 8
    },
    imageContainer: {
        width: 160,
        height: 250,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    imageContainerBS: {
        width: '100%',
        height: 140,
        margin: 10,
        flexDirection: 'row',
        position: 'relative'
    },
    textAuPD: {
        backgroundColor: 'rgba(255, 99, 71, 0.2)',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5,
        paddingTop: 5,
        color: COLORS.main,
        borderRadius: 6,
        marginRight: 20,
        fontWeight: '900',
        
    },
    followNLike: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    ioiconCSS: {
        marginRight: 5,
        color: COLORS.main,
        fontSize: 16
    }

})
export default Home
