
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AddCardButton from '../../components/cardList/addCardList'
class PageCardList extends Component {


    
    render(){
        return(
        <View style={styles.containerCardListPage}>
            <AddCardButton navigator={this.props.navigator}/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  containerCardListPage: {
    flex: 1,
    alignItems: 'center',
  }

});

export default PageCardList;