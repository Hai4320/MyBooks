import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,Alert} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS,images, SIZES} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import { Checkbox, TextInput, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {userData} from '../component/AsyncStorage'
import { updatePost, addPost } from '../redux/actions/postAction';

const PostAdd = ({navigation, route}) => {
    const dispatch = useDispatch();
    const post = route.params? route.params: {image:"", imageURL: "", _id:"", title:"", details:""};
    const [loading,setLoading] = useState(false);
    const [uploading, setUploading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [change,setChange] = useState(false)
    const [data, setData] = useState({
        _id: "",
        image: '',
        imageURL: '',
        title: '', 
        details: '',
        use_image: false,
        change_image: false,
    })
    useEffect(()=>{
        setData({...post,change_image: false})
    },[])
    // pICK image 
    const pickImage = async()=>{
    const result = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        freeStyleCropEnabled: true,
        cropping: true
    });
        setData({...data, imageURL: result.path})
    }
    //upload Image
    const uploadImage = async()=>{      
        setUploading(true);
        setChange(true);
        const user = await userData();
        const path = 'users/'+user.id+'/'; 
        const filename = data.imageURL.substring(data.imageURL.lastIndexOf('/') + 1);
        const reference = storage().ref(path+filename);
        await reference.putFile(data.imageURL);
        setUploading(false);
        setData({...data, image: path+filename, change_image: true})

    }
    // handle Update
    const handleUpLoad = async()=>{
        const x= {}
        x._id = data._id;
        x.details = data.details;
        x.title = data.title;
        x.upload = true;
        x.image= data.use_image? data.image: "";
        console.log(x)
        var result;
        if (data._id ==="") {
            result = await dispatch(addPost(x,setLoading));
        } else 
        {
            result = await dispatch(updatePost(x,setLoading));
        }
        if (result.status)
           {
                Alert.alert(result.data.message);
           } 
    }
    const handleSave = async()=>{
        const x= {}
        x._id = data._id;
        x.details = data.details;
        x.title = data.title;
        x.upload = false;
        x.image= data.use_image? data.image: "";
        var result;
        if (data._id ==="") {
            result = await dispatch(addPost(x,setSaving));
        } else 
        {
            result = await dispatch(updatePost(x,setSaving));
        }
 
        if (result.status)
           {    
                Alert.alert(result.data.message);
           } 
    }
    return (
        <ScrollView>
        <TouchableOpacity 
            style={{position: 'absolute', top: 10, left: 10, width: 40, height: 40, zIndex: 2}} 
            onPress={()=>navigation.goBack()}>
            <Ionicons name="chevron-back-outline" style={{fontSize: 30}}color={COLORS.black} />
        </TouchableOpacity>
        <View style={{width: '100%',height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize:20, fontWeight: 'bold'}}>Your Post</Text>
        </View>
        {/* Title */}
        <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 18, marginLeft: 10,}}>Title of your post:</Text>
        <View>
            <TextInput
            mode="outlined"
            label="Title"
            multiline
            value={data.title}
            onChangeText={text => setData({...data, title: text})}/>
        </View>
        {/* Details */}
        <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>Write your content:</Text>
        <View>
            <TextInput
            mode="outlined"
            label="Contents"
            multiline
            value={data.details}
            onChangeText={text => setData({...data, details: text})}/>
        </View>
        {/* Image */}
        <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox 
                status={data.use_image? "checked":'unchecked'}
                onPress={() => setData({...data, use_image: !data.use_image})}/>
            <Text style={{fontSize:15, fontWeight: 'bold'}}>Use Image</Text>
        </View>
        { data.use_image? 
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, marginBottom: 20, paddingBottom: 20}}>
            <Image 
            style={{width: 200, height: 200, margin: 10}}
            source={data.imageURL===""||data.imageURL===undefined ? images.defaultPost: {uri: data.imageURL}}
            />
            <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems:"center",width: '100%'}}>
                <Button
                mode="contained"
                disabled={change}
                style={{backgroundColor: COLORS.main}}
                onPress={() =>pickImage()}>
                    Change
                </Button>
                <Button
                mode={data.imageURL!==post.imageURL?"contained":"outlined"}
                loading={uploading}
                disabled={data.imageURL===post.imageURL|| data.change_image===true}
                onPress={() =>uploadImage()}
                >
                    Upload
                </Button>
            </View>
           
        </View>
        : null}
        <View style={{width: '100%', flexDirection: "row", justifyContent: "space-evenly", marginTop: 20}}>
            <Button mode="outlined" 
                style={{width: 150}}
                loading={saving}
                onPress={() => handleSave()}>
                Save
                </Button>
            <Button 
            mode="contained" 
            loading={loading} 
            onPress={() =>handleUpLoad()}
            style={{width: 150}}>UpLoad</Button>
        </View>          
    </ScrollView>
    )
}

export default PostAdd

const styles = StyleSheet.create({})
