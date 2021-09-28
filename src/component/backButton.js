import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BackButton({goBack}) {
  return (
    <TouchableOpacity style={styles.container} onPress={goBack}>
      <Icon name="chevron-left" size={24} color="#2196F3" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
  },
});
