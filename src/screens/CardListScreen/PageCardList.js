
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import AddCardButton from '../../components/cardList/addCardList'
import { getCardList } from '../../components/cardList/getCardList'
class PageCardList extends Component {


    state = {
        cardList: [
            // {
            //    "_id": "5be510fb20a52c0002b7e462",
            //     "cardFName": "Setnipat",
            //     "cardLName": "Kriangsakdachai",
            //     "cardEmail": [
            //         {
            //             "_id": "5be510fb20a52c0002b7e463",
            //             "email": "setnipat.kri@gmail.com",
            //             "isEmailVerified": true,
            //             "emailType": "General"
            //         }
            //     ],
            //     "cardImage": "https://firebasestorage.googleapis.com/v0/b/tapptact-219009.appspot.com/o/images%2F0f2wTDjsqKm45jLbWSXjRlVtlPyRRmundefined?alt=media&token=4b984c64-a31f-4331-80f8-b2d824becdbc",
            //     "cardUserPhone": [
            //         {
            //             "_id": "5be510fb20a52c0002b7e464",
            //             "phoneNum": "0853474333",
            //             "isNumberVerified": true,
            //             "phoneNumType": "General"
            //         }
            //     ],
            //     "cardSocialMedia": [
            //         {
            //             "_id": "5be510fb20a52c0002b7e465",
            //             "accountName": "Setnipat",
            //             "URL": "",
            //             "socialMediaType": ""
            //         }
            //     ],
            //     "cardCompany": [
            //         {
            //             "_id": "5be510fb20a52c0002b7e466",
            //             "companyName": "NovvaLab",
            //             "companyWebsite": "",
            //             "companyEmail": "",
            //             "companyPhoneNum": ""
            //         }
            //     ],
            //     "cardAddress": "",
            //     "cardExpand": [
            //         {
            //             "_id": "5be510fb20a52c0002b7e467"
            //         }
            //     ],
            //     "cardPurpose": "Test",
            //     "accountID": "5bc5804c74bc1700028f4ff4",
            //     "__v": 0 
            // },
            // {
            //     "_id": "5be510fb20a52c0002b7e4627",
            //     "cardFName": "Setnipat",
            //     "cardLName": "Kriangsakdachai",
            //     "cardEmail": [
            //         {
            //             "_id": "5be510fb20a52c0002b7e463",
            //             "email": "setnipat.kri@gmail.com",
            //             "isEmailVerified": true,
            //             "emailType": "General"
            //         }
            //     ],
            //     "cardImage": "https://firebasestorage.googleapis.com/v0/b/tapptact-219009.appspot.com/o/images%2F0f2wTDjsqKm45jLbWSXjRlVtlPyRRmundefined?alt=media&token=4b984c64-a31f-4331-80f8-b2d824becdbc",
            //     "cardUserPhone": [
            //         {
            //             "_id": "5be510fb20a52c0002b7e464",
            //             "phoneNum": "0853474333",
            //             "isNumberVerified": true,
            //             "phoneNumType": "General"
            //         }
            //     ],
            //     "cardSocialMedia": [
            //         {
            //             "_id": "5be510fb20a52c0002b7e465",
            //             "accountName": "Setnipat",
            //             "URL": "",
            //             "socialMediaType": ""
            //         }
            //     ],
            //     "cardCompany": [
            //         {
            //             "_id": "5be510fb20a52c0002b7e466",
            //             "companyName": "NovvaLab",
            //             "companyWebsite": "",
            //             "companyEmail": "",
            //             "companyPhoneNum": ""
            //         }
            //     ],
            //     "cardAddress": "",
            //     "cardExpand": [
            //         {
            //             "_id": "5be510fb20a52c0002b7e467"
            //         }
            //     ],
            //     "cardPurpose": "Test2",
            //     "accountID": "5bc5804c74bc1700028f4ff4",
            //     "__v": 0
            // }
        ],
        isLoading: true
    }

    constructor(props) {
        super(props);
    }


    renderSeperator = () => {
        return <View
            style={styles.separator}
        />
    }

    renderItem = ({ cardList }) => {
        return (
            <View style={styles.containerContactListPage}>
                <Image style={styles.cardIcon} source={{ uri: cardList.cardImage }} />
                <Text style={styles.textCard}>{cardList.cardPurpose}</Text>
            </View>
        )
    }

    componentDidlMount() {
        this.fetchData();
    }

    fetchData = () => {
        getCardList().then((items) => {
            this.setState({ isLoading: false, cardList: items })
            console.log(this.state.cardList);
        }).catch((error) => {
            this.setState({ cardList: [] })
            Alert.alert("LoadFails");
        })
    }

    // this.state.isLoading ?
    // <View>
    //     <ActivityIndicator size="large" color="#330066" animating />
    // </View>
    // :
    componentWillMount() {
        console.log('Components Will Mount');
    }

    componentDidMount(){
        const temp = this.fetchData();
        console.log(temp)
    }

    render() {
        console.log('renderCardList');
        //this.fetchData();
        return (

            <ScrollView>
                <FlatList
                    data={this.state.cardList}
                    renderItem={({ item }) =>
                        <View style={styles.containerCardListPage}>
                            <Image style={styles.cardIcon} source={{ uri: item.cardImage }} />
                            <Text style={styles.textCard}>{item.cardPurpose}</Text>
                        </View>
                    }
                    keyExtractor={item => item._id}
                    ItemSeparatorComponent={this.renderSeperator}

                />
                <AddCardButton navigator={this.props.navigator} />
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    containerCardListPage: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    textCard: {
        fontSize: 20,
        paddingHorizontal: 20
    },
    cardIcon: {
        paddingHorizontal: 20,
        height: 80,
        width: 120
    },
    separator: {
        height: 1,
        paddingHorizontal: 10,
        backgroundColor: '#8E8E8E',
    }

});

export default PageCardList;