import React from 'react';
import {View , Text , StyleSheet} from 'react-native';

const contactListItem = props => {
    <View style={styles.listItem}>
        <Text>{props.contactName}</Text>
    </View>
};


const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10
    }
});
export default contactListItem;