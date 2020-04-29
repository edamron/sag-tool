//@ts-check

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';

import { createSpec } from '../data/data-service';

const radio_props = [
	{ label: 'Inches', value: 0 },
	{ label: 'Millimeters', value: 1 },
];

const UNIT_OF_MEASURE = {
	INCHES: 0,
	MILLIMETERS: 1,
};

const BikeNotFound = ({ year, make, bikeAdded }) => {
	const [model, setModel] = useState('');
	const [front, setFront] = useState('');
	const [rear, setRear] = useState('');
	const [unit, setUnit] = useState(1);

	const handleSpecChange = (which, value) => {
		const spec =
			unit === UNIT_OF_MEASURE.MILLIMETERS
				? value
				: Math.round(parseInt(value) * 25.4).toString();

		if (which === 'front') {
			setFront(spec);
		} else {
			setRear(spec);
		}
	};

	const saveAndClose = async () => {
		try {
			// post to the API
			let newSpec = await createSpec({
				front,
				rear,
				year,
				make,
				model,
			});

			console.log('CREATED: ', newSpec);

			bikeAdded(newSpec);

			// raise something to the parent,
			// close BikeNotFound, and open
			// BikeInfo with new info populated
		} catch (err) {}
	};

	return (
		<View style={styles.container}>
			<Text
				style={styles.bigQuestion}
			>{`Not seeing your ${year} ${make}? Let's add it!`}</Text>
			<View style={styles.inputContainer}>
				<Text style={styles.labels}>Model:</Text>
				<TextInput
					style={[styles.mmInput, styles.modelInput]}
					placeholder="model name"
					onChangeText={(text) => setModel(text)}
				/>
			</View>
			<Text
				style={{
					marginLeft: 20,
					fontWeight: '500',
					marginBottom: 10,
					marginTop: 15,
					fontSize: 16,
				}}
			>
				Suspension Spec's
			</Text>
			<View style={styles.inputContainer}>
				<Text style={styles.labels}>Travel:</Text>
				<RadioForm
					radio_props={radio_props}
					initial={unit}
					onPress={(option) => setUnit(option)}
					formHorizontal={true}
					buttonColor={'#184a7b'}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.labels}>Front:</Text>
				<TextInput
					style={styles.mmInput}
					maxLength={3}
					keyboardType={'numeric'}
					placeholder="front"
					onChangeText={(text) => handleSpecChange('front', text)}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.labels}>Rear:</Text>
				<TextInput
					style={styles.mmInput}
					maxLength={3}
					keyboardType={'numeric'}
					placeholder="rear"
					onChangeText={(text) => handleSpecChange('rear', text)}
				/>
			</View>
			<TouchableOpacity style={styles.toStyle} onPress={saveAndClose}>
				<Text style={styles.toTextStyle}>Save it!</Text>
			</TouchableOpacity>
		</View>
	);
};

BikeNotFound.propTypes = {
	year: PropTypes.number.isRequired,
	make: PropTypes.string.isRequired,
	bikeAdded: PropTypes.func.isRequired,
};

export default BikeNotFound;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	labels: {
		marginTop: 7,
	},
	inputContainer: {
		marginBottom: 5,
		marginLeft: 35,
		flexDirection: 'row',
	},
	bigQuestion: {
		fontSize: 18,
		fontWeight: 'bold',
		margin: 20,
	},
	modelInput: {
		width: 260,
	},
	mmInput: {
		borderColor: '#D6D7DA',
		backgroundColor: 'white',
		borderRadius: 3,
		borderWidth: 2,
		height: 30,
		width: 50,
		padding: 5,
		fontSize: 16,
		marginLeft: 5,
	},
	bikeInfo: {
		fontSize: 16,
	},
	toStyle: {
		backgroundColor: '#ffe74a',
		borderColor: 'darkgrey',
		borderWidth: 2,
		marginTop: 20,
		padding: 20,
		borderRadius: 5,
		marginLeft: 60,
		marginRight: 60,
		alignItems: 'center',
	},
	toTextStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'black',
	},
	separator: {
		marginVertical: 2,
		borderBottomColor: '#737373',
		borderBottomWidth: 2,
	},
});
