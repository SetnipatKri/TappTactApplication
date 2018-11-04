
import React, {Component} from 'react';
import {StyleSheet, ListView,Text, View,Image,TouchableOpacity,FlatList} from 'react-native';

//import ContactList from '../../components/contactList/contactList';



class PageContactList extends Component {
    
    state ={
        contact:[
            {Name: "Peter Waltson",Picture: "https://randomuser.me/api/portraits/med/men/4.jpg"},
            {Name: "Joseph Robert",Picture: "https://randomuser.me/api/portraits/med/men/47.jpg"},
            {Name: "Susan Turner",Picture: "https://randomuser.me/api/portraits/med/women/22.jpg"}]
    };
    


    constructor(props){
        super(props);
    }


    render(){
        return(

            <FlatList data={this.state.contact}
             renderItem = {({item})=>
             <View style={styles.containerContactListPage}>
             <Image style={styles.contactIcon} source={{uri: item.Picture}} />
             <Text style={styles.textContact}>{item.Name}</Text>
            </View>
             }        
             />

        );
    }
}
/*
        <View style={styles.containerContactListPage}>
            <ContactList contact={this.state.contact}/>
        </View>
*/ 
const styles = StyleSheet.create({
  containerContactListPage: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth:1
  },
  textContact:{
    fontSize: 16,
    paddingHorizontal: 20
  },
  contactIcon:{
    paddingHorizontal: 20,
    height: 70,
    borderRadius: 35,
    width: 70
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }

});

export default PageContactList;