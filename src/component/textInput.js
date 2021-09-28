import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import {theme} from './theme';

export default function TextInput({...props}) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        theme={{colors: {primary: 'white'}}}
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
    backgroundColor: theme.colors.surface,
    height: 40,
  },
});
