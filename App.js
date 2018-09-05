import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions, Scene, Router, Switch, Modal, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import About from './scenes/About';
import Question from './scenes/Question';
import QuestionDetail from './scenes/QuestionDetail';
import QuestionAdd from './scenes/QuestionAdd';
import AnswerAdd from './scenes/AnswerAdd';
import { QuestionStore } from './stores';

class TabIcon extends React.Component {
  render(){
    const title = this.props.title;
    let icon = "";
    if(title == "Questions"){
      icon = "help-circle";
    } else if(title == "About"){
      icon = "settings";
    }

    return (
      <Icon name={icon} style={{color: this.props.selected ? '#057ce4' :'#afafa4'}}/>
    );
  }
}

export default class App extends React.Component {
  componentWillMount(){
    this.scenes = Actions.create(
      <Scene key="root" tabs={true}>
        <Scene key="menus">
          <Scene key="tabbar" tabs={true} tabBarStyle={{backgroundColor:'#f7f7f7'}}>
            <Scene key="Questions" store={QuestionStore} component={Question} title="Questions" icon={TabIcon} hideNavbar={true}/>
            <Scene key="About" component={About} title="About" icon={TabIcon} hideNavbar={true}/>
          </Scene>
          <Scene key="QuestionDetail" store={QuestionStore} component={QuestionDetail} title="QuestionDetail" hideNavbar={true}/>
          <Scene key="QuestionAdd" store={QuestionStore} component={QuestionAdd} title="QuestionAdd" hideNavbar={true}/>
          <Scene key="AnswerAdd" store={QuestionStore} component={AnswerAdd} title="AnswerAdd" hideNavbar={true}/>
        </Scene>
      </Scene>
    );
  }
  render() {
    return (
      <Router scenes={this.scenes}/>
    );
  }
}
