import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import screenConfig from './src/Navigation/Routes.Config';
import { store, persistor } from './src/Redux/Store/Store';
import NotificationComponent from './src/Components/Notification/Notification.Component';

const Stack = createNativeStackNavigator();

const RenderScreen = () => {
	const Screens = useMemo(
		() =>
			screenConfig.map(({ name, component, navigationOptions }) => (
				<Stack.Screen
					options={navigationOptions}
					key={name}
					name={name}
					component={component}
				/>
			)),
		[screenConfig]
	);

	return (
		<NavigationContainer>
			<Stack.Navigator>{Screens}</Stack.Navigator>
		</NavigationContainer>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{RenderScreen()}
				<NotificationComponent />
				{/* {Notification()} */}
			</PersistGate>
		</Provider>
	);
}
