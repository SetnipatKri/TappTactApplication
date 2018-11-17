import React, { Component } from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
class PageCardDetail extends Component {

    constructor(props){
        super(props)
        console.log("TEST PROPS"+ props.CardDetail.cardEmail[0].email);
    }

    render() {
        return (
            <View style = {styles.containerCardDetail}>
                <Image style={styles.avatar} source={{uri: this.props.CardDetail.cardImage}}/>
                <View style={styles.TextList}>
                <Text style={styles.TextStyle}>Firstname : {this.props.CardDetail.cardFName}</Text>
                <Text style={styles.TextStyle}>Lastname : {this.props.CardDetail.cardLName}</Text>
                <Text style={styles.TextStyle}>Email : {this.props.CardDetail.cardEmail[0].email}</Text>
                <Text style={styles.TextStyle}>Phone : {this.props.CardDetail.cardUserPhone[0].phoneNum}</Text>
                <Text style={styles.TextStyle}>Company : {this.props.CardDetail.cardCompany[0].companyName}</Text>
                </View>
            </View>

        );
    }  
}
const styles = StyleSheet.create({
    containerCardDetail : {
        paddingVertical: 16,
        alignItems: 'center',
    },
    avatar: {
        width: 350,
        height: 200,
        marginBottom: 20
      },
    TextStyle: {
        fontSize: 22,
        paddingHorizontal: 10,
        marginBottom:10
    },
    TextList:{
        alignItems: 'flex-start',
        paddingHorizontal:10
    }
});
export default PageCardDetail;