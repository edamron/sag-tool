//@ts-check

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Picker, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Brands } from '../data/brands';

const Bike = () => {
	const [brand, setBrand] = useState('');
	const [model, setModel] = useState('');
	const [models, setModels] = useState([]);

	return (
		<View style={styles.container}>
			<Text style={styles.bigQuestion}>First, let's find your bike!</Text>
			<View style={styles.textInputContainer}>
				<Text style={styles.textLabel}>Year:</Text>
				<TextInput
					style={styles.textInput}
					maxLength={4}
					keyboardType={'numeric'}
				/>
				<Button
					onPress={() => console.log('load makes for ')}
					title="Load Makes"
				/>
			</View>
			<View style={styles.textInputContainer}>
				<Text style={styles.textLabel}>Make:</Text>
				<Picker
					style={styles.twoPickers}
					itemStyle={styles.twoPickerItems}
					selectedValue={brand}
					onValueChange={(brand, itemIndex) => setBrand(brand)}
				>
					{Brands.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).map(
						(brand) => (
							<Picker.Item
								key={brand}
								label={brand}
								value={brand}
							/>
						),
					)}
				</Picker>
			</View>
			<View style={styles.textInputContainer}>
				<Text style={styles.textLabel}>Model:</Text>
				<Picker
					style={styles.twoPickers}
					itemStyle={styles.twoPickerItems}
					selectedValue={model}
					onValueChange={(itemValue, itemIndex) =>
						setModel(itemValue.toString())
					}
				>
					{models.map((model) => (
						<Picker.Item key={model} label={model} value={model} />
					))}
				</Picker>
			</View>
		</View>
	);
};

/*
Bike.propTypes = {
    prop1Name: PropTypes.string.isRequired, // <- e.g., a required string
    prop2Name: PropTypes.func, // <- e.g., an optional function
};

Bike.defaultProps = {
    prop1Name: 'some string',
    prop2Name: () => console.log('foo'),
};
*/

Bike.displayName = 'Bike';

export default Bike;

// examples styles...modify or remove as needed
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bigQuestion: {
		margin: 20,
		fontSize: 18,
		fontWeight: 'bold',
	},
	textInputContainer: {
		marginBottom: 5,
		marginLeft: 35,
		flexDirection: 'row',
	},
	textLabel: {
		marginTop: 5,
		marginRight: 5,
	},
	textInput: {
		borderColor: '#D6D7DA',
		borderRadius: 3,
		borderWidth: 2,
		height: 30,
		width: 50,
		padding: 5,
		fontSize: 12,
	},
	twoPickers: {
		width: 200,
		height: 68,
		backgroundColor: 'aliceblue',
		borderColor: 'black',
		borderWidth: 1,
	},
	twoPickerItems: {
		height: 68,
	},
});
