import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class cameraButton extends Component {

  camHandler = () => {
    this.props.navigator.push({
      screen: "TappTact-PageCamera",
      title: "Exchange Card",
    });
  }

  render() {
    return (
      <View style={styles.containerCam}>
        <TouchableOpacity style={styles.button} onPress={this.camHandler}>
          <Text style={styles.CamText}>QR Scanner</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerCam: {
    marginTop:10,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CamText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff'
  },
  button: {
    paddingVertical: 10,
    backgroundColor: '#124874',
    width: '90%',
    borderRadius: 15
  },

});
