

import { Dimensions } from 'react-native';
import { isWeb } from '../platform.utils';

const { height, width } = Dimensions.get('window');

const base = {
	width: 375,
	height: 667,
	pixelRatio: 2,
	fontScale: 2
};

const screenSize = {
	base: Math.sqrt((base.height * base.height) + (base.width * base.width)),
	current: Math.sqrt((height * height) + (width * width))
};

let isWebPlatform = isWeb();
export const setWebPlatform = (value) => {
	isWebPlatform = value;
};

// Calculate the new size into responsive size using screen size percentage.
export const scaleSize = size => (isWebPlatform ? size : (size / screenSize.base) * screenSize.current);

// Calculate the new size into responsive size using screen width percentage.
export const scaleWidth = w => (isWebPlatform ? w : (w / base.width) * width);

// Calculate the new size into responsive size using screen height percentage.
export const scaleHeight = h => (isWebPlatform ? h : (h / base.height) * height);

// Calculate the new font size into responsive font size using screen width percentage.
export const scaleFont = fontSize => ((fontSize / base.width) * width);