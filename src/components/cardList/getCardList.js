import React, {Component} from 'react';
import {StyleSheet, Text, View , Image , TouchableOpacity} from 'react-native';

async function getCardList(tempID){
    try{
        let rawResponse = await fetch('https://us-central1-tapptact-219009.cloudfunctions.net/getCardList', {
                 method: 'POST',
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({
                     accountID: tempID
                 })
             });
        let response = await rawResponse.json();
        return response;
    }
    catch{
        console.error("Error in getCardList")
    }
}
export {getCardList};