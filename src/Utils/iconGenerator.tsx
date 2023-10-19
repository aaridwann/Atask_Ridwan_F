import Ionicons from '@expo/vector-icons/Ionicons';

const generateIcon = (name: string, color: string, size: number) => (
	<Ionicons nativeID={name} name={name} size={size} color={color} />
);

export default generateIcon;
