import React, {Component} from 'react';
import {StyleSheet, Button ,Text, View} from 'react-native';
//import {Navigation} from 'react-native-navigation';
//import StartPageRegister from '../../screens/RegisterScreen/StartPageRegister'
export default class signUpText extends Component {
  
  registerHandle = () => {  
     this.props.navigator.push({
       screen: "TappTact-PageRegister",
       title: "Register"
   });
  }

  render() {
    return (
      <View style={styles.containerSignUp}>
          <Text style={styles.signUpDesc}>If you not have account yet</Text>
          <Button style={styles.signUpText} onPress={this.registerHandle} title="Sign Up"/>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  containerSignUp: {
    flexGrow: 1,
    paddingVertical:16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signUpDesc: {
    fontSize:16
  },
  signUpText: {
    fontSize:16,
    fontWeight:'bold',
    paddingHorizontal:8,
    color:'#1a6aab'
  }

});
