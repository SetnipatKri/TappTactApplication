
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import AddCardButton from '../../components/cardList/addCardList'
import { getCardList } from '../../components/cardList/getCardList'
import CacheStore from 'react-native-cache-store';
class PageCardList extends Component {
    _isMounted = false;

    state = {
        cardList: [],
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

    selectCard(item) {
        Alert.alert(item.cardPurpose);
    }

    fetchData = (accountID) => {
        getCardList(accountID).then((items) => {
            if(this._isMounted){
                console.log ("SET STATE");
                this.setState({ isLoading: false, cardList: items })
            }
            console.log(this.state.cardList);
        }).catch((error) => {
            if (this._isMounted) {
                this.setState({ cardList: [] })
            }
            Alert.alert("LoadFails");
        })
    }

    componentDidMount() {
        this._isMounted = true;
            if(this._isMounted){
            CacheStore.get('AccountInfo').then((value) => {
                const tempAccount = JSON.parse(value)
                const tempID = tempAccount._id;
                const temp = this.fetchData(tempID);
                console.log(temp)
            });
        }
    }

    render() {
        return (
            this.state.isLoading
                ?
                <View>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :
                <View>
                    <AddCardButton navigator={this.props.navigator} />
                    <FlatList
                        data={this.state.cardList}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.selectCard(item)}>
                                <View style={styles.containerCardListPage}>
                                    <Image style={styles.cardIcon} source={{ uri: item.cardImage }} />
                                    <Text style={styles.textCard}>{item.cardPurpose}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={item => item._id}
                        ItemSeparatorComponent={this.renderSeperator}
                    />
                </View>
        )
    }

}
const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerCardListPage: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    textCard: {
        fontSize: 18,
        paddingHorizontal: 20
    },
    cardIcon: {
        paddingHorizontal: 20,
        height: 70,
        width: 100
    },
    separator: {
        height: 1,
        paddingHorizontal: 10,
        backgroundColor: '#8E8E8E',
    }

});

export default PageCardList;