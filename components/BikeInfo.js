//@ts-check

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Separator = () => {
	return <View style={styles.separator} />;
};

const BikeInfo = ({ year, model, front, rear }) => {
	return (
		<View style={styles.container}>
			<View style={styles.bikeInfoContainer}>
				<Text style={styles.bigQuestion}>{`${year} ${model}`}</Text>
				<Text style={styles.bikeInfo}>Front travel: {front}</Text>
				<Text style={styles.bikeInfo}>Rear travel: {rear}</Text>
				<TouchableOpacity style={styles.toStyle} onPress={() => {}}>
					<Text style={styles.toTextStyle}>Let's set your sag!</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

BikeInfo.propTypes = {
	front: PropTypes.number.isRequired,
	rear: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
	model: PropTypes.string.isRequired,
};

export default BikeInfo;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	bikeInfoContainer: {
		marginTop: 20,
		alignItems: 'center',
	},
	bigQuestion: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
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
