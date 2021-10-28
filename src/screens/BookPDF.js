import React,{useState,useEffect} from 'react';
import {StyleSheet, Dimensions, View, Text, Button,TouchableOpacity} from 'react-native';
import WebView from 'react-native-webview'

const BookPDF = ({navigation, route}) => {
  const book = route.params;
  const [url,setURL] = useState('');
  return (<WebView source={{uri: book.PDF}}/>)
};


export default BookPDF;
