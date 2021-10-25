import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';

const BookPDF = () => {
  return (
    <View style={styles.container}>
      <Text>BookPDF</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default BookPDF;
