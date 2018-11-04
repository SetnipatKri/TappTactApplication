import React, {Component} from 'react';
import {StyleSheet, Text, View , Image} from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.containerLogo}>
          <Image style={styles.logo} source={require('../../../images/TappTact_Logo_Final.png')}/>
          <Text style={styles.logoText}>TappTact</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerLogo: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width:85,
    height:120
  },
  logoText: {
    fontSize:20,
    fontWeight:'bold',
    marginVertical:10,
    color:'#1a6aab'
  }

});
