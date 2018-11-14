import QRCode from 'react-native-qrcode';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


class PageQR extends Component {

    constructor(props){
        super(props)
        
    }

    render() {
        return (
            <View style = {styles.containerQR}>
            <QRCode
                value={this.props.accountID}
                size={200}
                bgColor='black'
                fgColor='white' />
            </View>

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

export default PageQR;