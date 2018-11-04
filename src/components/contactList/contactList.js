import React from 'react';
import {View , Text , StyleSheet} from 'react-native';

import ListItem from "./contactListItem"

const contactList = props => {
    const contactListOutput = props.contact.map((contact,i) => (
        <ListItem key={i} contactName = {contact}/>
    ));
    return (
    <View styles = {styles.listItem}>
        {contactListOutput}
    </View>
    );
};


const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10
    }
});
export default contactList;