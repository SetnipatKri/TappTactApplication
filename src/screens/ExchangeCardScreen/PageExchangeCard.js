import QRCode from 'react-native-qrcode';
import React, {Component} from 'react';
import {StyleSheet, Text, View ,TouchableOpacity} from 'react-native';

class PageExchangeCard extends Component {

    pageExchangeHandle(){
       
    }  

    render(){
        return(
        <View style={styles.containerExchangeCardPage}>
            <Text>Exchange Card!</Text>
            <QRCode
            value='exchange'
            size={200}
            bgColor='black'
            fgColor='white'/>
            <TouchableOpacity style = {styles.button} onPress={this.pageExchangeHandle}>
              <Text style = {styles.buttonText}> Camera </Text>
            </TouchableOpacity>
        </View>
        
        );
    }
}

const styles = StyleSheet.create({
  containerExchangeCardPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical:10,
    backgroundColor: '#124874',
    width:275,
    borderRadius:15
  },
  buttonText: {
    fontSize:18,
    textAlign:'center',
    fontWeight:'500',
    color:'#ffffff'
  }
});


export default PageExchangeCard;