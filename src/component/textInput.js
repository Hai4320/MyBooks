import React from 'react';
import {View, StyleSheet, TextInput as Input, Text} from 'react-native';
import { COLORS } from '../constants';

export default function TextInput({title, ...props}) {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Input
        style={styles.input}
        selectionColor="#2196F3"
        underlineColor="transparent"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: 40,
    color: COLORS.lightseagreen,
  },
});
