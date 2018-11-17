import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class addCardList extends Component {

  addCardHandler = () => {
    this.props.navigator.push({
      screen: "TappTact-PageAddCard",
      title: "Add Card",
    });
  }

  render() {
    return (
      <View style={styles.containerAddCard}>
        <TouchableOpacity style={styles.button} onPress={this.addCardHandler}>
          <Text style={styles.addCardText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerAddCard: {
    marginTop:10,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCardText: {
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
