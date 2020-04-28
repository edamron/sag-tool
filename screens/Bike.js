//@ts-check

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Picker, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

import {
	getAllMakesForYear,
	getAllModelsForYearAndMake,
	getSpecModelId,
} from '../data/data-service';

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
	const [makes, setMakes] = useState([]);
	const [models, setModels] = useState([]);
	const [make, setMake] = useState('');
	const [model, setModel] = useState('');
	const [selectedModel, setSelectedModel] = useState(defaultSelectedModel);
	const [modelSelected, setModelSelected] = useState(false);

	const initState = () => {
		setMakes([]);
		setModels([]);
		setModel('');
		setMake('');
		setSelectedModel(defaultSelectedModel);
		setModelSelected(false);
	};

	const getBrandsForYear = async () => {
		initState();

		let brandNames = await getAllMakesForYear(year);
		let brands = brandNames.map((name) =>
			Object.assign({ label: name, value: name }),
		);

		setMakes(brands);
	};

	useEffect(() => {
		if (!make) return;

		(async () => {
			let models = await getAllModelsForYearAndMake(year, make);
			const modelsForYearAndMake = models.map((m) =>
				Object.assign({ label: m.model, value: m._id }),
			);

			setModels(modelsForYearAndMake);
			setModel('');
			setSelectedModel(defaultSelectedModel);
			setModelSelected(false);
		})();
	}, [make]);

	/*	const getRndInteger = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
*/
	useEffect(() => {
		if (!model) return;

		(async () => {
			let spec = await getSpecModelId(model);

			//TODO: remove once I have real travel numbers
			//spec.front = getRndInteger(70, 230);
			//spec.rear = getRndInteger(100, 230);

			setSelectedModel(spec);
			setModelSelected(true);
		})();
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
					/* onSubmitEditing={handleYearSubmit} */
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
					value={make}
				/>
			</View>
			<View style={[styles.textInputContainer, { marginTop: 10 }]}>
				<Text style={styles.pickerLabel}>Model:</Text>
				<RNPickerSelect
					style={pickerSelectStyles}
					placeholder={modelPlaceholder}
					onValueChange={(selectedModel) => setModel(selectedModel)}
					items={models}
					value={model}
				/>
			</View>
			{modelSelected && (
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
