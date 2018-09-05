import React from 'react';
import { ListView } from 'react-native';
import { Header, Title, Container, Content, Left, Body, Right, Text, Icon, Button, Form, Item, Input, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class QuestionAdd extends React.Component {

	constructor(){
		super();
		this.state = {
			title: "",
			description: "",
			vote: 0,
			author: "Ega Raden"
		};
	}

	renderHeader() {
		const {title} = this.props;
		return (
			<Header>
				<Left>
					<Button transparent onPress={()=>Actions.pop()}>
						<Icon name="arrow-back" style={{color: 'skyblue'}}/>
					</Button>
				</Left>
				<Body>
					<Title>{title}</Title>
				</Body>
				<Right>
					<Button transparent onPress={()=>this.handleSave()}>
						<Text style={{color: '#0098ff'}}>Save</Text>
					</Button>
				</Right>
			</Header>
		);
	}

	handleSave(){
		// console.log(this.state);

		// save data to db with store
		this.props.store.add(this.state);

		//refresh dataSource to the latest update reactively
		this.props.store.refresh();

		//clear the form
		this.setState({
			title: "",
			description: ""
		});

		//back to main page
		Actions.pop();
	}

	render() {
		return (
			<Container>
				{this.renderHeader()}
				<Content>
					<Form>
						<Item floatinglabel>
							<Label>Title</Label>
							<Input onChangeText={(text)=>this.setState({title: text})} value={this.state.title}/>
						</Item>
						<Item floatinglabel last>
							<Label>Description</Label>
							<Input onChangeText={(text)=>this.setState({description: text})} value={this.state.description} multiline={true} numberOfLines={10} style={{height: 200}}/>
						</Item>
					</Form>
				</Content>
			</Container>
		);
	}
}