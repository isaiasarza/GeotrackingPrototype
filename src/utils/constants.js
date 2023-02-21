import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const OUTER_CARD_HEIGHT = 230;
export const OUTER_CARD_WIDTH = width ;

export const INNER_CARD_HEIGHT = 220
export const INNER_CARD_WIDTH = (width) * 0.8;

export const MAP_HEIGHT = height - 100;

export const NAVIGATION_ROUTES = {
  CANCEL_DELIVERY_MODAL: 'CANCEL_DELIVERY',
  CONFIRM_DELIVERY_MODAL: 'CONFIRM_DELIVERY'
}

/** 
 * 
#5C881A
#A6A033
#EBB65C
#FFCE93
#E62B79
  */