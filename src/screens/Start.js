import React,{useState,useEffect} from 'react';
import {View} from 'react-native';
import Paragraph from '../component/Paragraph';
import Background from '../component/Background';
import Header from '../component/HeaderLogin';
import Button from '../component/Button';
import { isLogged } from '../component/AsyncStorage';
const Start = ({navigation}) => {
  useEffect(()=>{
    if (isLogged) {
      navigation.replace('TabBar')
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
