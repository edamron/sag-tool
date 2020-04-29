//@ts-check

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const SetSag = ({ navigation, bike }) => {
	const { navigate } = navigation;

	return <View></View>;
};

SetSag.propTypes = {
	bike: PropTypes.shape({
		front: PropTypes.number.isRequired,
		rear: PropTypes.number.isRequired,
		year: PropTypes.number.isRequired,
		make: PropTypes.string.isRequired,
		model: PropTypes.string.isRequired,
	}).isRequired,
};

SetSag.defaultProps = {
	bike: 'some string',
};

export default SetSag;

// examples styles...modify or remove as needed
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
