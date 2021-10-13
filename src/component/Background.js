import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {images} from '../constants';

export default function Background({children, style}) {
  return (
    <ImageBackground
      source={images.backgroundLogin}
      style={styles.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={[styles.container, style]}
          behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 25,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
