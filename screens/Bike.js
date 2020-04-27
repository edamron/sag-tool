//@ts-check

import React, { useState, useEffect } from 'react';
//import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Picker, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

import { Brands, Brands2 } from '../data/brands';

const makePlaceholder = {
	label: 'Provide your year...',
	value: null,
	color: '#9EA0A4',
};

const modelPlaceholder = {
	label: 'Provide your make...',
	value: null,
	color: '#9EA0A4',
};

const Bike = () => {
	const defaultSelectedModel = {
		front: 0,
		rear: 0,
		year: 0,
		make: '',
		model: '',
	};
	const [year, setYear] = useState('');
	const [makes, setMakes] = useState([{ label: '', value: '' }]);
	const [make, setMake] = useState('');
	const [models, setModels] = useState([]);
	const [model, setModel] = useState('');
	const [selectedModel, setSelectedModel] = useState(defaultSelectedModel);

	const addMakeIfUnique = (arr, label) => {
		const { length } = arr;
		const id = length + 1;
		const found = arr.some((el) => el.label === label);
		if (!found) arr.push({ label, value: label });
		return arr;
	};

	const getBrandsForYear = () => {
		//TODO: implement GET http://localhost:5000/specs/makes/2014

		const allMakesForYear = Brands2.filter(
			(brand) => brand.year === parseInt(year),
		).map((b) => Object.assign({ label: b.make, value: b.make }));

		let brands = [];
		allMakesForYear.forEach((brand) => {
			addMakeIfUnique(brands, brand.label);
		});

		setMakes(brands);
		setModels([]);
		setModel('');
		setSelectedModel(defaultSelectedModel);
	};

	useEffect(() => {
		if (!make) return;

		const modelsForYearAndMake = Brands2.filter(
			(brand) => brand.year === parseInt(year) && brand.make === make,
		).map((b) => Object.assign({ label: b.model, value: b.model }));

		setModels(modelsForYearAndMake);
		setModel('');
		setSelectedModel(defaultSelectedModel);
	}, [make]);

	const getRndInteger = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	useEffect(() => {
		if (!model) return;

		let selectedModel = Brands2.filter(
			(m) =>
				m.year === parseInt(year) &&
				m.make === make &&
				m.model === model,
		);
		//TODO: remove once I have real travel numbers
		selectedModel[0].front = getRndInteger(70, 230);
		selectedModel[0].rear = getRndInteger(100, 230);

		setSelectedModel(selectedModel[0]);
	}, [model]);

	return (
		<View style={styles.container}>
			<Text style={styles.bigQuestion}>First, let's find your bike!</Text>
			<View style={styles.textInputContainer}>
				<Text style={styles.textLabel}>Year:</Text>
				<TextInput
					style={styles.textInput}
					maxLength={4}
					keyboardType={'numeric'}
					onChangeText={(value) => setYear(value)}
				/>
				<Button onPress={getBrandsForYear} title="Load Makes" />
			</View>
			<View style={styles.textInputContainer}>
				<Text style={styles.pickerLabel}>Make:</Text>
				<RNPickerSelect
					style={pickerSelectStyles}
					placeholder={makePlaceholder}
					onValueChange={(selectedMake) => setMake(selectedMake)}
					items={makes}
				/>
			</View>
			<View style={[styles.textInputContainer, { marginTop: 10 }]}>
				<Text style={styles.pickerLabel}>Model:</Text>
				<RNPickerSelect
					style={pickerSelectStyles}
					placeholder={modelPlaceholder}
					onValueChange={(selectedModel) => setModel(selectedModel)}
					items={models}
				/>
			</View>
			{selectedModel !== defaultSelectedModel && (
				<View style={styles.container}>
					<Text>
						{`${selectedModel.year} ${selectedModel.model}`}
					</Text>
					<Text>Front travel: {selectedModel.front}</Text>
					<Text>Rear travel: {selectedModel.rear}</Text>
				</View>
			)}
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

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: 'purple',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
});

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
	pickerLabel: {
		marginTop: 15,
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
});
