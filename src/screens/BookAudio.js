import React,{useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {AllBooks} from '../redux/selectors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {images, COLORS, SIZES} from '../constants'
import { View, Text, ScrollView, Image, StyleSheet,TouchableOpacity,Modal} from 'react-native'
import LoadImageUrl from "../component/LoadImage"
import Sound from 'react-native-sound'
const BookAudio = () => {
    const [visibleModal,setVisibleModal] = useState(true);
    const books = useSelector(AllBooks);
    const [booksData, setBooksData] = useState(books);
    const bookSelected = booksData[0];
    const [audioList,setAudioList] = useState([]);
    const [playing,setPlaying] = useState(-1);
    const [isplay,setIsPlay] = useState(false);
    const [loading,setLoading] = useState([false,-1]);
    const CheckPlay=(index)=>{
        if (audioList[index].URL==='')
        {
            setLoading([true, index]);
            return;
        }
        setLoading([false, index]);
        setPlaying(index);
        Pause(index);
        console.log(audioList[index].sound.isPlaying());
        Resume(index);
        console.log(audioList[index].sound.isPlaying());
    }
    const Play=(index)=>{
        setIsPlay(true);
        
        
        if (audioList[index].sound.isPlaying()===false)
        {
            audioList[index].sound.play();
        }
        console.log(audioList[index].sound.isPlaying());
        
    }
    const Pause = (index)=>{
        setIsPlay(false);
        audioList[index].sound.pause();
    }
    const Resume = (index)=>{
        setIsPlay(true);
        audioList[index].sound.play();
    }
    const Stop = ()=>{
        const x=playing;
        setPlaying(-1);
        setIsPlay(false);
        audioList[x].sound.stop();
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
                sound: null,
            });
        })
        setAudioList(audioData);
    }, [bookSelected]);
    useEffect(()=>{
        if (playing!=-1)
        setVisibleModal(false);
    },[playing])
    useEffect(async ()=>{
        if (loading[1]===-1||loading[0]===false) return;
        const audioData = audioList;
        var i=loading[1];
        audioData[i].URL = await LoadImageUrl(audioData[i].folder);
        audioData[i].sound =new Sound(audioData[i].URL,null,(e)=>{
        if (e) {
            console.log('error loading track:', e)
        }
        });
        setAudioList(audioData);
    },loading);
    useEffect(()=>{
        setBooksData(books);
    },[books])
    return (
        <View>
        { visibleModal===true? null:
        <View style={styles.playBox}>
            <Text>
                {playing===-1 ? "None": audioList[playing].name}
            </Text>
        </View>
        }
        <ScrollView 
          style={styles.container} 
          nestedScrollEnabled = {true}>
          <TouchableOpacity style={{position: 'absolute', top: 10, left: 15, width: 35, height: 35, borderRadius: 100}} onPress={()=>{}}>
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
                        onPress={()=> playing===index ? (isplay ? Pause(index) : Resume(index)): CheckPlay(index)}>
                            <View 
                            style={{width: 30, height: 30, backgroundColor: COLORS.button,  alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
                                <Ionicons name={(isplay===true&&playing===index) ?"pause":"play"} style={{color: COLORS.white, fontSize: 20}}/>
                            </View>
                            <Text style={{color: COLORS.button,  marginLeft: 20,flex: 1}} numberOfLines={2}>{audio.name}</Text>
                            
                        </TouchableOpacity>)}
                </View>
          </View>
          <Text></Text>
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
        backgroundColor: COLORS.white,
        width: '100%',
        height: 80,
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
