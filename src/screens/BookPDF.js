import React,{useState,useEffect} from 'react';
import {StyleSheet, Dimensions, View, Text, Button,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as OpenAnything from 'react-native-openanything';
import LoadImageUrl from "../component/LoadImage"
import {images, COLORS, SIZES} from '../constants'

const BookPDF = ({navigation, route}) => {
  const book = route.params;
  const [url,setURL] = useState('');

  useEffect(async()=>{
  const x = await LoadImageUrl(book.PDF);
  console.log(x);
  setURL(x);
  },[book])
  return (
    <View style={styles.container}>
       <TouchableOpacity 
          style={{position: 'absolute', top: 10, left: 15, width: 40, height: 40}} 
          onPress={()=>navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={30} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.title}>View Book</Text>
          <View style={styles.box}>
            <TouchableOpacity
              style={{backgroundColor: COLORS.button, width: 200, height: 40, alignItems: 'center', justifyContent: 'center', marginTop: 30, borderRadius: 20}}
              onPress={() =>
                OpenAnything.Pdf(url)
              }
            >
              <Text style={{fontSize: 15, fontWeight: 'bold', color: COLORS.white}}>{url ===''? "Loading":"Download PDF"}</Text>
            </TouchableOpacity>
         
          </View>
            
      
    </View>
  );
};

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
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default BookPDF;
