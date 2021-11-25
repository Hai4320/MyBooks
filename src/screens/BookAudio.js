import React,{useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {AllBooks} from '../redux/selectors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {images, COLORS, SIZES} from '../constants'
import { View, Text, ScrollView, Image, StyleSheet,TouchableOpacity,Modal} from 'react-native'
import LoadImageUrl from "../component/LoadImage"
import {AudioPlayer} from './AudioPlayer';
const BookAudio = ({navigation,route}) => {
    const [visibleModal,setVisibleModal] = useState(true);
    const bookSelected = route.params;
    const [audioList,setAudioList] = useState([]);
    const [playing,setPlaying] = useState(-1);
    const handlePlay = async (index)=>{
        setPlaying(index);
        if (audioList[index].URL==='')
        {
           const newurl = await LoadImageUrl(audioList[index].folder) 
           const arr = audioList.slice();
           arr[index].URL= newurl;
           setAudioList(arr);
        }
        setVisibleModal(false);
    }
    useEffect(async ()=>{
        const audioData=[];
        if (bookSelected===undefined) return;
        bookSelected.Audio.map((audio) =>{
            const name = audio.slice(13,audio.length-4)
            audioData.push({
                name: name,
                folder: audio,
                URL:'',
            });
        })
        setAudioList(audioData);
    }, [bookSelected]);
    // show Play boxes
    useEffect(()=>{
        if (playing!=-1)
        setVisibleModal(false);
    },[playing])
    return (
        <View>
        {/* Play box */}
        { visibleModal===true? null:
        <View style={styles.playBox}>
            <Text style={{fontSize: 16, padding: 5, fontWeight: 'bold', color: COLORS.white, marginBottom: 10}} numberOfLines={3}>
                {playing===-1 ? "None": audioList[playing].name}
            </Text>
            <AudioPlayer
                url={audioList[playing].URL===""?'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3':audioList[playing].URL}
            />
        </View>
        }
        <ScrollView 
          style={styles.container} 
          nestedScrollEnabled = {true}>
          <TouchableOpacity 
          style={{position: 'absolute', top: 10, left: 15, width: 40, height: 40, zIndex: 2}} 
          onPress={()=>navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={30} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Play Audio</Text>
          <View style={styles.box}>
                <View style={styles.bookSection}>
                    <View style={{borderRadius: 10}}>
                        <Image 
                        style={{height: 150, width: 105, resizeMode: 'cover', borderRadius: 10, borderColor: COLORS.gainsboro, borderWidth: 2}} 
                        source={{uri: bookSelected.ImageURL}} />
                    </View>
                    <View
                    style={{marginTop:20, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}} numberOfLines={2}>{bookSelected.Title}</Text>
                        <View style={{flexDirection: 'row',alignItems: 'center' }}>
                            <Text style={{color: COLORS.black66}}>BY </Text>
                            <Text style={{color: COLORS.main, fontWeight: 'bold'}}>{bookSelected.Author}</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '100%', paddingRight: 10, paddingLeft: 10,marginTop: 250,}}>
                    {audioList.map((audio, index)=>
                        <TouchableOpacity 
                        key={index} 
                        style={{ marginTop: 10, height: 40, width: '100%',flexDirection: 'row', alignItems: 'center', }}
                        onPress={()=>handlePlay(index)}
                        >
                            <View 
                            style={{width: 30, height: 30, backgroundColor: COLORS.button,  alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
                                <Ionicons name={"play"} style={{color: COLORS.white, fontSize: 20}}/>
                            </View>
                            <Text style={{color: COLORS.button,  marginLeft: 20,flex: 1}} numberOfLines={2}>{audio.name}</Text>
                        </TouchableOpacity>)}
                </View>
          </View>
         
        </ScrollView>
        </View>
    )
}

export default BookAudio

const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.main,
        height: '100%',
        maxHeight: SIZES.height,
    },
    playBox: {
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        backgroundColor: COLORS.dodgerblue,
        width: '100%',
        height: 180,
        alignItems: "center",
        justifyContent: 'center',
        borderColor: COLORS.black,
        borderWidth: 1,
        shadowColor: COLORS.black,
        shadowOffset: {
             width: 5,
             height: 5
         },
        shadowOpacity: 0.25,
    },
    box:{
        marginTop: 40,
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
    bookSection:{
        position: 'absolute',
        top: -30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: "column",
        width: '100%',
        paddingRight: 10,
        paddingLeft: 10,
    }
    
})
