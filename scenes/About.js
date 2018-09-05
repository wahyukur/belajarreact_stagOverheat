import { Font, AppLoading } from "expo";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Body, Title, Container, Content, Root } from 'native-base';

export default class About extends React.Component {

	constructor() {
		super();
		this.state = { isReady: false };
	}
	componentWillMount(){
		this.loadFonts();
	}
	async loadFonts() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
		});
		this.setState({ isReady: true });
	}

	renderHeader(){
		const {title} = this.props;
		return (
			<Header>
				<Body>
					<Title>{title}</Title>
				</Body>
			</Header>
		);
	}

	render() {
		if (!this.state.isReady) {
			return(
				<AppLoading />
			);
		}
		return (
			<Container>
				{this.renderHeader()}
				<Content>
					<Text style={styles.welcome}>
						Stag Overheat v0.1
					</Text>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	}
});