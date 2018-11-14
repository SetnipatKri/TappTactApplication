import React, {Component} from 'react';
import {StyleSheet, Text, View , Image , TouchableOpacity} from 'react-native';

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
      <TouchableOpacity onPress={this.addCardHandler}>
        <Text style={styles.addCardText}>Add Card</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerAddCard: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addCardText: {
    fontSize:24,
    fontWeight:'bold',
    color:'#1a6aab'
}
});
