import React from 'react';
import {StyleSheet, Dimensions, View, Text, Button} from 'react-native';
import * as OpenAnything from 'react-native-openanything';

const BookPDF = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Book PDF"
        onPress={() =>
          OpenAnything.Pdf('http://www.africau.edu/images/default/sample.pdf')
        }
      />
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
