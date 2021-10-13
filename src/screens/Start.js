import React,{useState,useEffect} from 'react';
import {View} from 'react-native';
import Paragraph from '../component/Paragraph';
import Background from '../component/Background';
import Header from '../component/HeaderLogin';
import Button from '../component/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Start = ({navigation}) => {
  const isLogged  = async ()=>{
    const x = await AsyncStorage.getItem("isLogin");
    if (x === null) return false;
    else return true;
  }
  useEffect(()=>{
    if (isLogged) {
      navigation.navigate('TabBar')
    }
  },[]);
  return (
    <Background style={{justifyContent: 'space-between'}}>
      <View style={{paddingLeft: 0, width: '100%'}}>
        <Header>MyBooks</Header>
      </View>
      <View style={{width: '100%', marginBottom: 30}}>
        <Paragraph>Welcome to EBook</Paragraph>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={{backgroundColor: '#2196F3'}}>
          Log In
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Register')}
          style={{backgroundColor: 'white', color: 'black'}}
          styleText={{color: '#2196F3'}}>
          Sign Up
        </Button>
      </View>
    </Background>
  );
};

export default Start;
