import React from 'react';
import { Header, 
Left, Right, Button, Body, Title, Container, Content, Text, Icon, Card, CardItem, Thumbnail, Footer } from 'native-base';
import { ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import moment from 'moment';

@observer
export default class QuestionDetail extends React.Component {

	constructor(){
		super();
	}

	componentWillMount(){
		// const {vote} = this.props.question;
		// this.setState({vote: vote});

		// set store.question reactively by question props from Question.js rowData
		this.props.store.question = this.props.question;
	}

	renderHeader(){
		const {title} = this.props;
		const questionId = this.props.question.id;
		return (
			<Header>
				<Left>
					<Button transparent onPress={()=>Actions.pop()}>
						<Icon name="arrow-back" style={{color: "skyblue"}}/>
					</Button>
				</Left>
				<Body>
					<Title>{title}</Title>
				</Body>
				<Right>
					<Button transparent onPress={()=>Actions.AnswerAdd({questionId: questionId})}>
						<Icon name="add" style={{color: "#057ce4"}}/>
						<Text>Answer</Text>
					</Button>
				</Right>
			</Header>
		);
	}

	renderAnswerRow(rowData){
		return(
			<Card>
				<CardItem bordered>
					<Body>
						<Text note>Someone, on {moment(new Date()).format("DD/MM/YYYY")}</Text>
					</Body>
				</CardItem>
				<CardItem>
					<Body>
						<Text>{rowData.text}</Text>
					</Body>
				</CardItem>
			</Card>
		);
	}

	voteUp(){
		// const currentVote = this.state.vote;
		// this.setState({vote: currentVote + 1})

		// get field from store.question
		const {id,vote} = this.props.store.question;
		// call method update on store
		this.props.store.update(id, {vote: vote + 1});
	}
	voteDown(){
		// const currentVote = this.state.vote;
		// this.setState({vote: currentVote - 1})

		// get field from store.question
		const {id,vote} = this.props.store.question;
		// call method update on store
		this.props.store.update(id, {vote: vote - 1});	
	}

	render() {
		const {title, author, description, createdAt, vote} = this.props.store.question;
		//kode diatas dapat juga ditulis sbb
		// const title = this.props.question.title;
		// const author = this.props.question.author;
		// const {vote} = this.state;

		const {dataSourceAnswers} = this.props.store;
		return(
			<Container>
				{this.renderHeader()}
				<Content>
					<Card>
						<CardItem bordered>
							<Left>
								<Icon name="help-circle" />
								<Body>
									<Text>{title}</Text>
									<Text note>{author}, on {moment(createdAt).format("DD/MM/YYYY")}</Text>
								</Body>
							</Left>
						</CardItem>
						<CardItem>
							<Body>
								<Text>
									{description}
								</Text>
							</Body>
							<Right>
								<Button transparent onPress={()=> this.voteUp()}>
									<Icon active name="arrow-up" />
								</Button>
								<Text>{vote}</Text>
								<Button transparent onPress={()=> this.voteDown()}>
									<Icon active name="arrow-down" />
								</Button>
							</Right>
						</CardItem>
					</Card>

					{/*Answer List*/}
					<Card>
						<CardItem bordered>
							<Body>
								<Text note>Someone, on {moment(new Date()).format("DD/MM/YYY")}</Text>
							</Body>
						</CardItem>
						<CardItem>
							<Body>
								<Text>text</Text>
							</Body>
						</CardItem>
					</Card>
				</Content>
				<Footer style={{height: 320}}>
					<ListView dataSource={dataSourceAnswers} renderRow={this.renderAnswerRow.bind(this)} enableEmptySections={true} />
				</Footer>
			</Container>
		);
	}
}