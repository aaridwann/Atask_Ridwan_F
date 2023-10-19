import { Platform } from 'react-native';

import Constants from '../Constants/Constants';

export const isAndroid = () => Platform.OS === Constants.PLATFORM.ANDROID;
export const isIOS = () => Platform.OS === Constants.PLATFORM.IOS;
export const isWeb = () => Platform.OS === Constants.PLATFORM.WEB;