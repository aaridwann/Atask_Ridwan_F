import createTransform from 'redux-persist/es/createTransform';

const encrypt = (text:string): string => {
	let encryptedText = '';
	for (let i = 0; i < text.length; i++) {
		const charCode = text.charCodeAt(i);
		encryptedText += String.fromCharCode(charCode + 1);
	}
	return encryptedText;
};

const decrypt = (encryptedText: string): string =>  {
	let decryptedText = '';
	for (let i = 0; i < encryptedText.length; i++) {
		const charCode = encryptedText.charCodeAt(i);
		decryptedText += String.fromCharCode(charCode - 1);
	}
	return decryptedText;
};

const customEncryptTransform = createTransform(
	(inboundState) => {
		if (!inboundState) return inboundState;
		return encrypt(JSON.stringify(inboundState));
	},
	(outboundState) => {
		if (!outboundState) return outboundState;
		return JSON.parse(decrypt(outboundState));
	},
);

export default customEncryptTransform;