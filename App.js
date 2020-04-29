import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Bike from './screens/Bike';
import SetSag from './screens/SetSag';

const SagStack = createStackNavigator();
/*  I would use something like this if I were gonna put stacks inside of tabs
const SagStackScreens = () => {
	<SagStack.Navigator>
		<SagStack.Screen name="Bike" component={Bike} />
		<SagStack.Screen name="SetSag" component={SetSag} />
	</SagStack.Navigator>;
};
 */
export default function App() {
	return (
		<NavigationContainer>
			<SagStack.Navigator
				initialRouteName="Bike"
				screenOptions={{
					headerTintColor: '#ff0009',
					headerStyle: {
						backgroundColor: '#184a7b',
					},
					headerTitleStyle: {
						fontStyle: 'italic',
						fontWeight: 'bold',
						fontSize: 24,
					},
				}}
			>
				<SagStack.Screen
					name="Bike"
					component={Bike}
					options={{ title: 'Simple Sag Tool' }}
				/>
				<SagStack.Screen
					name="SetSag"
					component={SetSag}
					options={{ title: 'Year Make Model' }}
				/>
			</SagStack.Navigator>
		</NavigationContainer>
	);
}
