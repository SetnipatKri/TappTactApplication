
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import CacheStore from 'react-native-cache-store';

_isMounted = false;
class PageCamera extends Component {

    state = {
        accountID: '',
    }

    onSuccess(e) {
        if (!(/^[a-zA-Z0-9]+$/.test(e.data))) {
            Alert.alert('This QR Code is not Valid');
        }
        else {
            (async () => {
                const rawResponse = await fetch('https://us-central1-tapptact-219009.cloudfunctions.net/exchangeCard', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        exchangeSenderID: this.state.accountID,
                        exchangeReceiverID: "",
                        exchangeCardID: e.data
                    })
                });
                const content = await rawResponse.json();
                if (content.hasOwnProperty('errorType')) {
                    Alert.alert('not Found');
                }
                else {
                    console.log(content);
                    this.props.navigator.pop();
                }
            })();
        }
    }


    componentWillUnmount() {
        console.log("UNMOUNTED");
        this._isMounted = false;
    }

    componentWillMount() {
        this._isMounted = true;
        CacheStore.get('AccountInfo').then((value) => {
            const tempAccount = JSON.parse(value)
            const tempID = tempAccount._id;
            if (this._isMounted) {
                this.setState({
                    accountID: tempID
                })
            }
        });
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
    containerQR: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    QRText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a6aab'
    }
});

export default PageCamera;