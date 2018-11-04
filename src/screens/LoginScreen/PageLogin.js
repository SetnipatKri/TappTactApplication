
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Logo from '../../components/login/Logo'
import LoginForm from '../../components/login/LoginForm'
import SignUpText from '../../components/login/SignupText'

class PageLogin extends Component {

    constructor(props){
        super(props);
      }

    render(){
        return(
        <View style={styles.containerLoginPage}>
            <Logo/>
            <LoginForm/>
            <SignUpText navigator={this.props.navigator}/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  containerLoginPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default PageLogin;