import React from 'react';
import { View, ListView, StyleSheet, Text, Alert } from 'react-native';
import {
    Platform,
    Image,
    TouchableOpacity,
    ScrollView,
    Button,
    FlatList,
    AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import functions from '../utils/functions';
import services from '../utils/services';

import Header from '../components/Header';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';


class CustomersList extends React.Component {

    state = {
        Customers: [],
        refreshing: true
    }

    componentDidMount() {
        this.customersList();
    }

    async customersList() {
        // console.log('abc');
        const user = await functions.getUser();
        // const userDetail = JSON.parse(user);

        const url = `getlist?CompanyId=${user["CompanyId"]}`;

        this.setState({ refreshing: true });
        const resp = await services.showCustomers(url);
        if (!response.ok) {
            this._dropdown.itemAction({ type: 'success', title: 'Account Created', message: 'Customers Not Found' });
        } else {
            const responseJson = await resp.json();
            console.log('RESP:', responseJson);
            this.setState({ Customers: responseJson });
        }
    }

    render() {
        // console.log('Hi');
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} showDrawer={true} showCartIcon={true} showNotificationIcon={true} title={'Customer List'} />
                <ScrollView>
                    <View style={styles.dashboardView}>
                        <Text style={styles.dashboardText}>
                            My Customer's List
            </Text>
                    </View>

                    <FlatList
                        data={this.state.Customers}
                        // keyExtractor={(item) => item.id}
                        renderItem={({ item }) => this.renderCustomers(item)}
                    />

                </ScrollView>
            </View>

        );
    }

    renderCustomers(item) {
        // console.log('abc');

        return (

            <View>
                <TouchableOpacity >
                    <Text style={styles.list}>
                        <Image style={styles.image} />
                        <Text style={styles.textList}>Hello</Text>
                        <Icon style={styles.icon}
                            name="user"
                            backgroundColor="#3b5998"
                            color='#012A59'
                            size={20}
                        />
                    </Text>
                </TouchableOpacity>
                <DropdownMessageAlert ref={(c) => (this._dropdown = c)} />
            </View>


        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#edf1f5',
    },
    dashboardView: {
        height: 150,
        backgroundColor: '#b01800',
        marginBottom: 13
    },
    dashboardText: {
        fontSize: 16,
        textAlign: 'justify',
        color: 'white',
        marginLeft: 10,
        marginRight: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#edf1f5',
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        marginBottom: 30
    },

    list: {
        borderColor: '#012A59',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 2,
        alignItems: 'center',
        margin: 5,
        height: 60
    },

    textList: {
        fontSize: 16,
        marginLeft: 10
    }

});

export default CustomersList;