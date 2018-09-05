import React from 'react';
import { Header, Title, Container, Content, Left, Body, Right, Text, Icon, Button, Form, Item, Input, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class AnswerAdd extends React.Component {

	constructor(){
		super();
		this.state = {
			text: "",
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
		//
		const {questionId} = this.props;
		// save data to db with store
		this.props.store.addAnswer(questionId, this.state);

		//clear the form
		this.setState({title: ""});

		//back to main page
		Actions.pop();
	}

	render() {
		return (
			<Container>
				{this.renderHeader()}
				<Content>
					<Form>
						<Item floatinglabel last>
							<Label>Text</Label>
							<Input onChangeText={(text)=>this.setState({text: text})} value={this.state.text} multiline={true} numberOfLines={10} style={{height: 200}}/>
						</Item>
					</Form>
				</Content>
			</Container>
		);
	}
}