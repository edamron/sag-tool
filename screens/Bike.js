//@ts-check

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

import BikeInfo from '../components/BikeInfo';
import BikeNotFound from '../components/BikeNotFound';

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

const Bike = ({ navigation }) => {
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
	const [modelNotFount, setModelNotFound] = useState(false);

	const initState = () => {
		setMakes([]);
		setModels([]);
		setModel('');
		setMake('');
		setSelectedModel(defaultSelectedModel);
		setModelSelected(false);
		setModelNotFound(false);
	};

	const getBrandsForYear = async () => {
		initState();

		//let brandNames = await getAllMakesForYear(year);
		let brandNames = [
			'Yamaha',
			'Honda',
			'Ducati',
			'Kawasaki',
			'BMW',
			'Suzuki',
			'Aprilia',
			'Triumph',
			'KTM',
		];
		brandNames.sort();
		let brands = brandNames.map((name) =>
			Object.assign({ label: name, value: name }),
		);

		setMakes(brands);
	};

	useEffect(() => {
		if (!make) return;

		(async () => {
			//TODO start replicated below!
			let models = await getAllModelsForYearAndMake(year, make);
			const modelsForYearAndMake = models.map((m) =>
				Object.assign({ label: m.model, value: m._id }),
			);

			// in case it's needed
			modelsForYearAndMake.unshift({
				label: 'Not seeing your model?',
				value: 'not found',
			});

			setModels(modelsForYearAndMake);
			//TODO end replicated below!

			setModel('');
			setSelectedModel(defaultSelectedModel);
			setModelSelected(false);
			setModelNotFound(false);
		})();
	}, [make]);

	useEffect(() => {
		if (!model) return;

		if (model === 'not found') {
			setModelNotFound(true);
			setModelSelected(false);
		} else {
			(async () => {
				let spec = await getSpecModelId(model);
				setSelectedModel(spec);
				setModelNotFound(false);
				setModelSelected(true);
			})();
		}
	}, [model]);

	const newBikeAdded = async (bike) => {
		//TODO start replicated above!
		let models = await getAllModelsForYearAndMake(year, make);
		const modelsForYearAndMake = models.map((m) =>
			Object.assign({ label: m.model, value: m._id }),
		);

		// in case it's needed
		modelsForYearAndMake.unshift({
			label: 'Not seeing your model?',
			value: 'not found',
		});

		setModels(modelsForYearAndMake);
		//TODO end replicated above!

		setModel(bike._id);
	};

	// can be removed soon
	// NOTE: model is mongo _id
	const handleSetModel = (model) => {
		setModel(model);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.bigQuestion}>First, let's find your bike!</Text>
			<View style={styles.textInputContainer}>
				<Text style={[styles.textLabel, { marginTop: 10 }]}>Year:</Text>
				<TextInput
					style={styles.textInput}
					maxLength={4}
					keyboardType={'numeric'}
					onChangeText={(value) => setYear(value)}
				/>
				<TouchableOpacity
					style={styles.toStyle}
					onPress={getBrandsForYear}
				>
					<Text style={styles.toTextStyle}>Load Makes</Text>
				</TouchableOpacity>
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
					onValueChange={(selectedModel) =>
						handleSetModel(selectedModel)
					}
					items={models}
					value={model}
				/>
			</View>
			{modelSelected && (
				<BikeInfo spec={selectedModel} navigation={navigation} />
			)}
			{modelNotFount && (
				<BikeNotFound
					year={parseInt(year)}
					make={make}
					bikeAdded={newBikeAdded}
				/>
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
		backgroundColor: 'white',
		marginTop: 2,
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
		backgroundColor: 'white',
		marginTop: 2,
	},
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#dddddd',
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
		backgroundColor: 'white',
		borderRadius: 3,
		borderWidth: 2,
		height: 30,
		width: 70,
		padding: 5,
		fontSize: 16,
		marginTop: 3,
	},
	toStyle: {
		backgroundColor: '#ffe74a',
		borderColor: 'darkgrey',
		borderWidth: 2,
		marginLeft: 4,
		padding: 4,
		borderRadius: 5,
	},
	toTextStyle: {
		fontSize: 20,
		color: 'black',
	},
});
