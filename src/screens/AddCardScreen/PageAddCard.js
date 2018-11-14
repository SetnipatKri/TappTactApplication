
import React, {Component} from 'react';
import {StyleSheet, Text, View , ScrollView} from 'react-native';
import AddCardForm from '../../components/addCard/addCardForm'
// import RegisterForm from '../../components/register/RegisterForm'

class PageAddCard extends Component {

    render(){
        return(
            <ScrollView>
                <AddCardForm navigator={this.props.navigator}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  containerAddCardPage: {
    flex: 1,
    paddingTop:20,
    alignItems: 'center',
  }

});

export default PageAddCard;