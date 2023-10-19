import AsyncStorage from '@react-native-async-storage/async-storage';

const getDataFromStorage = async (key: string) => {
	try {
		const data = await AsyncStorage.getItem(key);
		if (data !== null) {
			
			return JSON.parse(data);
		} else {
			console.log(`Data dengan kunci ${key} tidak ditemukan.`);

			return null;
		}
	} catch (error) {
		console.error('Terjadi kesalahan:', error);
	}
};

export default getDataFromStorage;