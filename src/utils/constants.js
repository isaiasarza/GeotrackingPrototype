import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const OUTER_CARD_HEIGHT = 170;
export const OUTER_CARD_WIDTH = width ;

export const INNER_CARD_HEIGHT = 160
export const INNER_CARD_WIDTH = (width) * 0.8;

export const MAP_HEIGHT = height - 100;