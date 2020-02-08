import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';
import {Dimensions} from 'react-native';

export const baseFontSize = 14;
export const lightBackgroundColor = 'rgb(242,242,247)';
export const darkerLightBackgroundColor = 'rgb(229,229,234)';
export const darkBackgroundColor = 'rgb(44,44,46)'
export const lightColor = 'black';
export const darkColor: string = 'rgb(229,229,234)';
export const lightGray = 'rgb(142,142,147)';
export const darkerLightGray = 'rgb(174,174,178)'
export const darkLightGray = 'rgb(99,99,102)'
export const contentGray = 'rgb(72,72,74)'

export const sharedDynamicStyleSheet = new DynamicStyleSheet({
  dynamicColor: {
    backgroundColor: new DynamicValue(lightBackgroundColor, darkBackgroundColor),
    color: new DynamicValue(lightColor, darkColor),
  },
  dynamicTextColor: {
    color: new DynamicValue(lightColor, darkColor)
  },
  dynamicBackgroundColor: {
    backgroundColor: new DynamicValue(lightBackgroundColor, darkBackgroundColor),
  },
  squareEntity: {
    borderRadius: baseFontSize / 2
  }
});

export const slideFromUnder350: any = {
  0: {
    translateY: -100,
    opacity: 0,
    zIndex: -100
  },
  0.55: {
    opacity: 0
  },
  1: {
    translateY: 0,
    opacity: 1,
    zIndex: 0
  }
};

export const tabletMode = () => Dimensions.get('window').width > 400;
