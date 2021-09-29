import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../component/Background';
import Button from '../component/Button';
import TextInput from '../component/TextInput';
import BackButton from '../component/BackButton';
import Paragraph from '../component/Paragraph';
import {Formik} from 'formik';
import {SignupSchema} from '../component/Validation';

const ResetPassword = ({navigation}) => {
  return (
    <Background style={{justifyContent: 'space-between'}}>
      <View style={{width: '100%'}}>
        <BackButton goBack={() => navigation.navigate('Login')} />
      </View>
      <View style={{width: '100%'}}>
        <Paragraph>Restore Password</Paragraph>
      </View>
      <View style={{width: '100%', marginBottom: 30}}>
        <Formik
          initialValues={{
            email: '',
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
                title="E-mail address"
                returnKeyType="done"
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoFocus={true}
                placeholder="Enter Email Address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <Text style={{color: 'red'}}>{errors.email}</Text>
              ) : null}
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={{marginTop: 16, backgroundColor: '#2196F3'}}>
                Send New PassWord
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </Background>
  );
};

export default ResetPassword;
