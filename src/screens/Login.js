import React from 'react';
import {View, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import {Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Background from '../component/Background';
import Paragraph from '../component/Paragraph';
import Button from '../component/Button';
import TextInput from '../component/TextInput';
import BackButton from '../component/BackButton';

const Login = ({navigation}) => {
  return (
    <Background style={{justifyContent: 'space-between'}}>
      <View style={styles.styleWidth}>
        <BackButton goBack={() => navigation.navigate('Start')} />
      </View>
      <View style={styles.styleWidth}>
        <Paragraph>Welcome Back</Paragraph>
      </View>
      <View style={styles.styleForm}>
        <TextInput
          title="Email"
          returnKeyType="next"
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholder="Enter Email Address"
          autoFocus={true}
        />
        <TextInput
          title="Password"
          returnKeyType="done"
          secureTextEntry
          placeholder="Enter Password"
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.link}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          onPress={() => Alert.alert('Login successful')}
          style={{backgroundColor: '#2196F3'}}>
          Log In
        </Button>
        <View style={styles.loginOther}>
          <Text style={{color: 'white', fontSize: 18}}>Or login with</Text>
          <TouchableOpacity onPress={() => Alert.alert('Login with facebook')}>
            <AntDesign
              name="facebook-square"
              size={30}
              color="#1094f4"
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Login with google')}>
            <Image
              source={require('../assets/images/google.png')}
              style={styles.logoGoogle}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.line} />
            <Text style={styles.or}>OR</Text>
            <View style={styles.line} />
          </View>
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Register')}
          style={{backgroundColor: '#2196F3'}}>
          Sign Up
        </Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: '#414757',
  },
  line: {
    borderWidth: 1,
    borderColor: '#808080',
    flex: 1,
    height: 1,
  },
  logoGoogle: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  styleWidth: {
    width: '100%',
  },
  styleForm: {
    width: '100%',
    marginBottom: 30,
  },
  loginOther: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  or: {
    width: 30,
    textAlign: 'center',
    color: '#808080',
  },
});

export default Login;
