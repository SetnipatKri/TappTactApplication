
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { getContactList } from '../../components/contactList/getContactList'
//import { contains } from '../../components/contactList/search'
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';
import CacheStore from 'react-native-cache-store';
class PageContactList extends Component {

    state = {
        contactList: [],
        isLoading: true,
        contactFullList: [],
        refreshing: false
    };



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
        getContactList(accountID).then((items) => {
            if (this._isMounted) {
                console.log("SET STATE");
                this.setState({ isLoading: false, contactList: items, refreshing: false, contactFullList: items })
                this.arrayholder = items;
            }
            console.log(this.state.cardList);
        }).catch((error) => {
            if (this._isMounted) {
                this.setState({ isLoading: false, contactList: [], refreshing: false, contactFullList: [] })
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

    searchFilther = (text) => {
        const query = text.toLowerCase();
        var temp = this.state.contactFullList
        const newData = _.filter(temp, function (o) {
            return ((o.cardFName + " " + o.cardLName).toLowerCase().indexOf(query)) > -1
        })
        this.setState({ contactList: newData })
    };

    ListEmptyView = () => {
        return
        <View>
            <Text>No Contact</Text>
        </View>
    }

    renderSeperator = () => {
        return <View
            style={styles.separator}
        />
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
                    <SearchBar
                        placeholder="Search ..."
                        lightTheme
                        round
                        onChangeText={this.searchFilther}
                        autoCorrect={false}
                    />
                    <FlatList
                        data={this.state.contactList}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.selectCard(item)}>
                                <View style={styles.containerContactListPage}>
                                    <Image style={styles.contactIcon} source={{ uri: item.accountImage }} />
                                    <Text style={styles.textContact}>{item.cardFName + " " + item.cardLName}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        refreshing={this.state.refreshing}
                        onRefresh={this.refreshHandler}
                        keyExtractor={item => item._id}
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

    containerContactListPage: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    textContact: {
        fontSize: 16,
        paddingHorizontal: 20
    },
    containerRefresh: {
        marginTop: 10,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactIcon: {
        paddingHorizontal: 20,
        height: 70,
        borderRadius: 35,
        width: 70
    },
    separator: {
        height: 1,
        paddingHorizontal: 10,
        backgroundColor: '#8E8E8E',
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

export default PageContactList;

{/* <View style={styles.containerRefresh}>
<TouchableOpacity style={styles.button} onPress={this.refreshHandler}>
    <Text style={styles.RefreshText}>Refresh</Text>
</TouchableOpacity>
</View> */}