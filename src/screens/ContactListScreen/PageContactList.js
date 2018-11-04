
import React, {Component} from 'react';
import {StyleSheet, ListView,Text, View,Image,TouchableOpacity,FlatList,ScrollView} from 'react-native';

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

    renderSeperator = () => {
        return <View
        style = {styles.separator}
        />    
    }

    render(){
        return(
        <ScrollView>
            <FlatList data={this.state.contact}
             renderItem = {({item})=>
             <View style={styles.containerContactListPage}>
             <Image style={styles.contactIcon} source={{uri: item.Picture}} />
             <Text style={styles.textContact}>{item.Name}</Text>
            </View>
            }
            keyExtractor = {item => item.Name}      
            ItemSeparatorComponent = {this.renderSeperator}  
             />
         </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

  containerContactListPage: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
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
    height: 1,
    paddingHorizontal: 10,
    backgroundColor: '#8E8E8E',
  }

});

export default PageContactList;