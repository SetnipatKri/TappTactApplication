import React, {Component} from 'react';
import {StyleSheet, Button ,Text, View} from 'react-native';

export default class signUpText extends Component {

    render() {
        return (
          <View style={styles.containerSignUpPage}>
              <Text style={styles.signUpText}>Let's Get Start</Text>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    containerSignUpPage: {
      paddingVertical: 16,
      alignItems: 'center',
    },
    signUpText: {
        fontSize:24,
        fontWeight:'bold',
        color:'#1a6aab'
    }
  
  });