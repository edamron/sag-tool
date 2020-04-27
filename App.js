import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Bike from './screens/Bike';

const SagStack = createStackNavigator();
const SagStackScreens = () => {
	<SagStack.Navigator>
		<SagStack.Screen name="Bike" component={Bike} />
	</SagStack.Navigator>;
};

export default function App() {
	return (
		<NavigationContainer>
			<SagStack.Navigator
				initialRouteName="Bike"
				screenOptions={{
					headerTintColor: 'white',
					headerStyle: { backgroundColor: 'blue' },
				}}
			>
				<SagStack.Screen
					name="Bike"
					component={Bike}
					options={{ title: 'Simple Sag Tool' }}
				/>
			</SagStack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
