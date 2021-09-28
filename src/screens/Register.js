import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import {Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Background from '../component/backgroup';
import {theme} from '../component/theme';
import {Formik} from 'formik';
import Paragraph from '../component/paragraph';
import Button from '../component/button';
import TextInput from '../component/textInput';
import BackButton from '../component/backButton';
import {SignupSchema} from '../component/validation';

const Register = ({navigation}) => {
  return (
    <Background style={{justifyContent: 'space-between'}}>
      <View style={styles.styleWidth}>
        <BackButton goBack={() => navigation.navigate('Start')} />
      </View>
      <View style={styles.styleWidth}>
        <Paragraph>Create Account</Paragraph>
      </View>
      <View style={styles.styleForm}>
        <Formik
          initialValues={{
            name: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => console.log(values)}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <View style={{width: '100%'}}>
              <TextInput
                label="Name"
                autoFocus={true}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {errors.name && touched.name ? (
                <Text style={{color: 'red'}}>{errors.name}</Text>
              ) : null}
              <TextInput
                label="Phone Number"
                keyboardType="numeric"
                maxLength={10}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              {errors.phone && touched.phone ? (
                <Text style={{color: 'red'}}>{errors.phone}</Text>
              ) : null}
              <TextInput
                label="Email"
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <Text style={{color: 'red'}}>{errors.email}</Text>
              ) : null}
              <TextInput
                label="Password"
                returnKeyType="done"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <Text style={{color: 'red'}}>{errors.password}</Text>
              ) : null}
              <TextInput
                label="Confirm Password"
                returnKeyType="done"
                secureTextEntry
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Text style={{color: 'red'}}>{errors.confirmPassword}</Text>
              ) : null}
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={{backgroundColor: '#2196F3'}}>
                Sign Up
              </Button>
              <View style={styles.loginOther}>
                <Text style={{color: 'white', fontSize: 18}}>
                  Or create account with
                </Text>
                <TouchableOpacity
                  onPress={() => Alert.alert('Login with facebook')}>
                  <AntDesign
                    name="facebook-square"
                    size={30}
                    color="#1094f4"
                    style={{marginLeft: 20}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Alert.alert('Login with google')}>
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
                onPress={() => navigation.navigate('Login')}
                style={{backgroundColor: '#2196F3'}}>
                Log In
              </Button>
            </View>
          )}
        </Formik>
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
    color: theme.colors.secondary,
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

export default Register;
