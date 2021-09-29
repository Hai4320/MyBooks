import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

export default function Header(props, style) {
  return <Text style={[styles.header, style]} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    color: '#2196F3',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
