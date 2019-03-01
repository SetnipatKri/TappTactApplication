
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import AddCardButton from '../../components/cardList/addCardList'
import { getCardList } from '../../components/cardList/getCardList'
import CacheStore from 'react-native-cache-store';
class PageCardList extends Component {
    _isMounted = false;

    state = {
        cardList: [],
        isLoading: true,
        refreshing: false,
        noCard: false
    }

    constructor(props) {
        super(props);
    }

    refreshHandler = () => {
        this.setState({ isLoading: true, refreshing: true })
        this._isMounted = true;
        if (this._isMounted) {
            CacheStore.get('AccountInfo').then((value) => {
                const tempAccount = JSON.parse(value)
                const tempID = tempAccount._id;
                const temp = this.fetchData(tempID);
            });
        }
    }

    renderSeperator = () => {
        return <View
            style={styles.separator}
        />
    }

    selectCard(item) {
        console.log(item._id)
        this.props.navigator.push({
            screen: "TappTact-PageCardDetail",
            title: item.cardPurpose,
            passProps: {
                CardDetail: item
            }
        });
    }

    fetchData = (accountID) => {
        getCardList(accountID).then((items) => {
            if (this._isMounted) {
                this.setState({ isLoading: false, refreshing: false, cardList: items, noCard: false })
            }
        }).catch((error) => {
            if (this._isMounted) {
                this.setState({ isLoading: false, cardList: [], refreshing: false, noCard: true })
            }
        })
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            CacheStore.get('AccountInfo').then((value) => {
                const tempAccount = JSON.parse(value)
                const tempID = tempAccount._id;
                const temp = this.fetchData(tempID);
            });
        }
    }

    ListEmptyView = () => {
        return
        <View>
            <Text>No Contact</Text>
        </View>
    }


    render() {
        return (
            this.state.isLoading
                ?
                <View>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :
                this.state.noCard
                    ?
                    <View>
                        <AddCardButton navigator={this.props.navigator} />
                        <TouchableOpacity onPress={this.refreshHandler}>
                            <Text>No Card Press to Refresh</Text>
                        </TouchableOpacity>
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
                            refreshing={this.state.refreshing}
                            onRefresh={this.refreshHandler}
                            keyExtractor={item => item._id}
                            //ListEmptyComponent={this.ListEmptyView}
                            ItemSeparatorComponent={this.renderSeperator}
                        />
                        <View style={styles.containerRefresh}>
                            <TouchableOpacity onPress={this.refreshHandler}>
                                <Text style={styles.RefreshText}>Press here to Refresh</Text>
                            </TouchableOpacity>
                        </View>
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
    },
    containerRefresh: {
        marginTop: 10,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    RefreshText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#A9A9A9'
    },
    button: {
        paddingVertical: 10,
        backgroundColor: '#124874',
        width: '90%',
        borderRadius: 15
    },

});

export default PageCardList;