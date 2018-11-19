
import React, { Component } from 'react';
import {  AppRegistry,StyleSheet,Text,TouchableOpacity,Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class PageCamera extends Component {

    onSuccess(e) {
       Alert.alert(e.data);
      }

    render() {
        return (
            <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            />

        );
    }
}

const styles = StyleSheet.create({
    containerQR : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    QRText: {
        fontSize:24,
        fontWeight:'bold',
        color:'#1a6aab'
    }
});

export default PageCamera;