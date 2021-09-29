import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#F96D41',
  secondary: '#25282F',

  // colors
  black: '#1E1B26',
  white: '#FFFFFF',
  gray: '#808080',
  tomato: '#ff6347',
  red: '#ff0000',
  gainsboro: '#dcdcdc',
};

export const SIZES = {
  // app dimensions
  width,
  height,
};

export const FONTS = {};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
