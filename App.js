import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Bike from './screens/Bike';
import SetFrontSag from './screens/SetFrontSag';
import SetRearSag from './screens/SetRearSag';

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
					options={{
						title: 'Simple Sag Tool',
					}}
				/>
				<SagStack.Screen
					name="SetFrontSag"
					component={SetFrontSag}
					options={{
						title: 'Set Your Front Sag',
						headerBackTitle: 'Bike',
					}}
				/>
				<SagStack.Screen
					name="SetRearSag"
					component={SetRearSag}
					options={{
						title: 'Set Your Rear Sag',
						headerBackTitle: 'Front',
					}}
				/>
			</SagStack.Navigator>
		</NavigationContainer>
	);
}
