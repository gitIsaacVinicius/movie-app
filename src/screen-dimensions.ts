import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

 export const hs = (size: number) => (width / guidelineBaseWidth) * size; // Escala horizontal
 export const vs = (size: number) => (height / guidelineBaseHeight) * size; // Escala vertical
 export const ms = (size: number, factor = 0.5) => size + (hs(size) - size) * factor; // Escala moderada
