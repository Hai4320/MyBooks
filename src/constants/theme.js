import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#F96D41',
  secondary: '#25282F',
  main: '#ff6347',
  lightseagreen:`#20b2aa`,
  black: '#1E1B26',
  white: '#FFFFFF',
  gray: '#808080',
  tomato: '#ff6347',
  red: '#ff0000',
  gainsboro: '#dcdcdc',
  dodgerblue:`#1e90ff`,
  button: '#2196F3',
  black33: "#333333",
  black66: "#666666",
  love: "#ff009e",
  borColor: '#FF6666',
  backmain: '#ff634780'
};

export const SIZES = {
  // app dimensions
  width,
  height,
};

export const FONTS = {};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
