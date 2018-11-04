
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class PageCardList extends Component {
    render(){
        return(
        <View style={styles.containerCardListPage}>
            <Text>CardList</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  containerCardListPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default PageCardList;