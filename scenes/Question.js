import { Font, AppLoading } from "expo";
import React from 'react';
import { Header, Title, Container, Content, Left, Body, Right, ListItem, Text, Icon, Button, Input, Item } from 'native-base';
import { ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';

@observer

export default class Question extends React.Component {

	constructor() {
		super();
		this.state = {
			isReady: false,
			displaySearchBar: false,
			search: ""
		};
	}

	handleAdd(){
		const doc = {
			title: "Fourth Question", author: "TrexGG", vote: 10, description: "Description 4", createdAt: new Date("2017-03-15")
		};
		this.props.store.add(doc);
	}

	componentWillMount() {
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

	renderHeader() {
		const {title} = this.props;
		let header=(
			<Header>
				<Left/>
				<Body>
					<Title>{title}</Title>
				</Body>
				<Right>
					<Button transparent onPress={()=>this.setState({displaySearchBar: true})}>
						<Icon name="search" style={{color: '#0098ff'}}/>
					</Button>
					<Button transparent onPress={()=>Actions.QuestionAdd()}>
						<Icon name="add-circle" style={{color: '#0098ff'}}/>
					</Button>
				</Right>
			</Header>
		);

		if (this.state.displaySearchBar) {
			header=(
				<Header searchBar rounded>
					<Item>
						<Icon name="search" />
						<Input placeholder="Search" onChangeText={(text)=>this.setState({search: text})} value={this.state.search} />
						<Button transparent onPress={()=>this.handleSearch()}>
							<Text>Search</Text>
						</Button>
					</Item>
				</Header>
			);
		}

		return header;
	}

	handleGoToQuestionDetail(rowData){
		// find answer using api
		this.props.store.findAnswers(rowData.id);
		Actions.QuestionDetail({question: rowData});
	}

	renderRow(rowData){
		return (
			<ListItem onPress={() => this.handleGoToQuestionDetail(rowData)}>
				<Body>
					<Text>{rowData.author}</Text>
					<Text note>{rowData.title}</Text>
				</Body>
				<Right>
					<Icon name="arrow-forward" style={{color: "#0098ff"}}/>
				</Right>
			</ListItem>
		);
	}

	handleSearch(){
		//get search value
		const {search}=this.state;

		//call store method search
		this.props.store.search(search);

		//hide searchbar and clear search
		this.setState({displaySearchBar: false});
	}

	render() {
		if (!this.state.isReady) {
			return (
				<AppLoading />
			);
		}
		const {dataSource} = this.props.store;
		return (
			<Container>
				{this.renderHeader()}
				<Content>
					<ListView dataSource={dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true}/>
				</Content>
			</Container>
		);
	}
}