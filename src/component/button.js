import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {theme} from './theme';

export default function Button({mode, style, styleText, ...props}) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && {backgroundColor: theme.colors.surface},
        style,
      ]}
      labelStyle={(styles.text, styleText)}
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    paddingVertical: 1,
    borderRadius: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 20,
  },
});
