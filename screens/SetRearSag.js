//@ts-check

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
	Collapse,
	CollapseBody,
	CollapseHeader,
} from 'accordion-collapse-react-native';
import { TextInput } from 'react-native-gesture-handler';

const SetRearSag = ({ route, navigation }) => {
	const [toggles, setToggles] = useState([true, false, false, false]);
	const { rear } = route.params;
	const [l1, setL1] = useState('');
	const [l2, setL2] = useState('');
	const [l3, setL3] = useState('');
	const [sag, setSag] = useState(0);

	const handleToggle = (collapseIndex) => {
		setToggles(
			toggles.map((toggle, index) => (toggle = index === collapseIndex)),
		);
	};

	useEffect(() => {
		const l1Number = parseInt(l1);
		const l2Number = parseInt(l2);
		const l3Number = parseInt(l3);

		setSag(Math.round(l1Number - (l2Number + l3Number) / 2));
	}, [l1, l2, l3]);

	const getTargetLow = () => Math.round(rear * 0.28);
	const getTargetHigh = () => Math.round(rear * 0.33);

	return (
		<View style={styles.container}>
			<Collapse
				style={styles.collapse}
				isCollapsed={toggles[0]}
				onToggle={() => handleToggle(0)}
			>
				<CollapseHeader style={styles.header}>
					<Text style={styles.headerText}>Free Length</Text>
				</CollapseHeader>
				<CollapseBody style={styles.collapseBody}>
					<Text style={styles.bodyText}>
						Let's cut right to the chase and get your rear 'free
						length':
					</Text>
					<Text style={[styles.bullets, { marginTop: 8 }]}>
						&#8226; get the wheel up off the ground
					</Text>
					<Text style={styles.bullets}>
						&#8226; measure up from the wheel axle
					</Text>
					<View style={{ flexDirection: 'row' }}>
						<Text style={[styles.bullets, { marginTop: 8 }]}>
							&#8226; enter the distance here:{' '}
						</Text>
						<TextInput
							style={styles.textInput}
							maxLength={3}
							placeholder="L1"
							keyboardType={'numeric'}
							onChangeText={(value) => setL1(value)}
							value={l1}
						/>
					</View>
				</CollapseBody>
			</Collapse>
			<Collapse
				style={styles.collapse}
				isCollapsed={toggles[1]}
				onToggle={() => handleToggle(1)}
			>
				<CollapseHeader style={styles.header}>
					<Text style={styles.headerText}>Length Two</Text>
				</CollapseHeader>
				<CollapseBody style={styles.collapseBody}>
					<Text style={styles.bodyText}>
						You know the drill! Compress the rear suspension and
						SLOWLY let up until it stops extending, allowing
						friction to stop the movement.
					</Text>
					<Text style={[styles.bullets, { marginTop: 8 }]}>
						&#8226; push down about an inch
					</Text>
					<Text style={styles.bullets}>
						&#8226; VERY slowly let up until the movement stops
					</Text>
					<Text style={styles.bullets}>
						&#8226; measure again, from & to the same location
					</Text>
					<View style={{ flexDirection: 'row' }}>
						<Text style={[styles.bullets, { marginTop: 8 }]}>
							&#8226; enter that distance here:{' '}
						</Text>
						<TextInput
							style={styles.textInput}
							maxLength={3}
							placeholder="L2"
							keyboardType={'numeric'}
							onChangeText={(value) => setL2(value)}
							value={l2}
						/>
					</View>
				</CollapseBody>
			</Collapse>
			<Collapse
				style={styles.collapse}
				isCollapsed={toggles[2]}
				onToggle={() => handleToggle(2)}
			>
				<CollapseHeader style={styles.header}>
					<Text style={styles.headerText}>Length Three</Text>
				</CollapseHeader>
				<CollapseBody style={styles.collapseBody}>
					<Text style={styles.bodyText}>
						RAISE the bike and SLOWLY let it down until it stops
						settling, allowing friction to stop the movement.
					</Text>
					<Text style={[styles.bullets, { marginTop: 8 }]}>
						&#8226; pull up about an inch
					</Text>
					<Text style={styles.bullets}>
						&#8226; VERY slowly let down until the movement stops
					</Text>
					<Text style={styles.bullets}>
						&#8226; measure again, from & to the same location
					</Text>
					<View style={{ flexDirection: 'row' }}>
						<Text style={[styles.bullets, { marginTop: 8 }]}>
							&#8226; enter that distance here:{' '}
						</Text>
						<TextInput
							style={styles.textInput}
							maxLength={3}
							placeholder="L3"
							keyboardType={'numeric'}
							onChangeText={(value) => setL3(value)}
							value={l3}
						/>
					</View>
				</CollapseBody>
			</Collapse>
			<Collapse
				style={styles.collapse}
				isCollapsed={toggles[3]}
				onToggle={() => handleToggle(3)}
			>
				<CollapseHeader style={styles.header}>
					<Text style={styles.headerText}>Recommendation</Text>
				</CollapseHeader>
				<CollapseBody style={styles.collapseBody}>
					<Text style={styles.bodyText}>
						Just like the front, your actual sag is the average of
						L2 and L3 subtracted from L1. Based on the measurements
						you provided:
					</Text>
					<Text style={[styles.bullets, { marginTop: 8 }]}>
						&#8226; L1: {l1}
					</Text>
					<Text style={styles.bullets}>&#8226; L2: {l2}</Text>
					<Text style={styles.bullets}>&#8226; L3: {l3}</Text>
					<Text style={[styles.bodyText, { marginTop: 8 }]}>
						Your sag is currently {sag} millimeters. Based on a
						target sag range of 28% to 33% of total suspension
						travel ({rear}
						mm in the rear), you want your sag to be somewhere
						between {getTargetLow()} and {getTargetHigh()}{' '}
						millimeters.
					</Text>

					<Text
						style={[
							styles.bodyText,
							{
								marginTop: 25,
								fontSize: 20,
								fontWeight: 'bold',
								fontStyle: 'italic',
							},
						]}
					>
						What to do?
					</Text>

					{sag < getTargetLow() ? (
						<Text style={[styles.bodyText, styles.instructions]}>
							You need to remove some preload and measure L2 & L3
							again!
						</Text>
					) : sag > getTargetHigh() ? (
						<Text style={[styles.bodyText, styles.instructions]}>
							You need to add preload and measure L2 & L3 again!
						</Text>
					) : (
						<Text style={[styles.bodyText, styles.instructions]}>
							Not a thing...you're good!
						</Text>
					)}
				</CollapseBody>
			</Collapse>
		</View>
	);
};

export default SetRearSag;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
	},
	collapse: {
		borderBottomWidth: 2,
		borderColor: '#184a7b',
		marginLeft: 20,
		marginRight: 20,
	},
	collapseBody: {
		padding: 10,
	},
	header: {
		backgroundColor: '#ffe74a',
		padding: 5,
	},
	headerText: {
		fontSize: 24,
		fontWeight: 'bold',
		fontStyle: 'italic',
		color: 'red',
	},
	bodyText: {
		fontSize: 18,
		fontWeight: '500',
	},
	instructions: {
		marginTop: 8,
		fontSize: 20,
		fontWeight: '600',
	},
	textInput: {
		borderColor: '#D6D7DA',
		backgroundColor: 'white',
		borderRadius: 3,
		borderWidth: 2,
		height: 30,
		width: 50,
		padding: 5,
		fontSize: 16,
		marginTop: 3,
	},
	bullets: {
		fontSize: 16,
		fontWeight: '500',
	},
});
