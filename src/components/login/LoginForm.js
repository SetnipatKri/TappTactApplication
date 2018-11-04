import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View , TextInput , TouchableOpacity,Alert} from 'react-native';
import StartMainTab from '../../screens/MainScreen/StartMainTab';
import * as Validator from 'email-validator';
export default class LoginForm extends Component {

  constructor(){
    super();
    this.state = {
        username:'',
        password:''
    }
  }


  loginHandle= () => {
    //Check Username
    if(this.state.username.length<6)
    {
      Alert.alert('Username is too short');
    }
    else if((this.state.username.length>18)&&!(Validator.validate(this.state.username)))
    {
      Alert.alert('Username is too long')
    }
    else if(!(/^[a-zA-Z0-9]+$/.test(this.state.username))&&!(Validator.validate(this.state.username)))
    {
      Alert.alert('Username contain invalid letters')
    }
    //Check Password
    if(this.state.password.length<6)
    {
      Alert.alert('Password is too short');
    }
    else if(this.state.password.length>18)
    {
      Alert.alert('Password is too long')
    }
    else if(!(/^[a-zA-Z0-9]+$/.test(this.state.password)))
    {
      Alert.alert('Password contain invalid letters')
    }
    // REST API Zone
    else
    {
    (async () => {
      const rawResponse = await fetch('https://us-central1-tapptact-219009.cloudfunctions.net/Login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Username: this.state.username,
          Password: this.state.password})
      });
      const content = await rawResponse.json();
      if(content.hasOwnProperty('errorType'))
      {
        Alert.alert('not Found');
      }
      else
      {
        Alert.alert('Got it');
        StartMainTab();
      }
    })();
    }
  }

  render() {
    return (
      <View style={styles.containerLoginForm}>
          <TextInput style = {styles.UserNameForm} placeholder="Username" 
          placeholderTextColor="#191970" 
          onChangeText={username => this.setState({username})}/>
          <TextInput style = {styles.PasswordForm} secureTextEntry={true} placeholder="Password" 
          placeholderTextColor="#191970"
          onChangeText={password => this.setState({password})}/>
          <TouchableOpacity style = {styles.button} onPress={this.loginHandle}>
            <Text style = {styles.buttonText}> Login </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerLoginForm: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  UserNameForm: {
    width:275,
    height:40,
    backgroundColor: '#BDDEEC',
    fontSize:18,
    borderRadius:15,
    paddingHorizontal:8
  },
  PasswordForm: {
    marginVertical:15,
    width:275,
    height:40,
    backgroundColor: '#BDDEEC',
    fontSize:18,
    borderRadius:15,
    paddingHorizontal:8
  },
  button: {
    paddingVertical:10,
    backgroundColor: '#124874',
    width:275,
    borderRadius:15
  },
  buttonText: {
    fontSize:18,
    textAlign:'center',
    fontWeight:'500',
    color:'#ffffff'
  }

});
