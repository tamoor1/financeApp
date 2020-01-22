import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Button,
    AsyncStorage,
} from 'react-native';
import Header from '../components/Header';
import { NavigationEvents } from 'react-navigation';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import services from '../utils/services';
import LoadingButton from '../templates/LoadingButton';
import functions from '../utils/functions';
import DatePicker from 'react-native-datepicker'
export default class App extends Component<{}> {
    state = {
        isConnected: true,
        Name: '',
        Code: '',
        AccountOpenDate: '2020-01-25',
        Mobile: '',
        Phone: '',
        Email: '',
        Fax: '',
        Url: ''
    };

    validateForm() {
        const { state } = this;
        let Name = state.Name;
        let Code = state.Code;
        let AccountOpenDate = state.AccountOpenDate;
        let Mobile = state.Mobile;
        let Phone = state.Phone;
        let Email = state.Email;
        let Fax = state.Fax;
        let Url = state.Url;

        let isValid = false;

        if (Name == '') {
            this._dropdown.itemAction({ title: 'Error', message: 'Name is required', type: 'error' });
        } else if (Code == '') {
            this._dropdown.itemAction({ title: 'Error', message: 'Code is required', type: 'error' });
        } else if (Mobile == '') {
            this._dropdown.itemAction({ title: 'Error', message: 'Mobile Number is required', type: 'error' });
        } else if (Phone == '') {
            this._dropdown.itemAction({ title: 'Error', message: 'Phone is required', type: 'error' });
        } else {
            isValid = true;
        }
        return isValid;
    }

    async addCustomer() {
        if (this.validateForm()) {
            // const user = await functions.getUser();

            const { state } = this;
            const data = {
                Name: state.Name,
                Code: state.Code,
                AccountOpenDate: state.AccountOpenDate,
                Mobile: state.Mobile,
                Phone: state.Phone,
                Email: state.Email,
                Fax: state.Fax,
                Url: state.Url,
            };

            this._addCustomerBtn.showLoading(true);
            const response = await services.customerAdd(data);
            // debugger
            const responseJson = await response.json();
            this._addCustomerBtn.showLoading(false);
            console.log(responseJson);
            if ((Response.ok)) {
                this._dropdown.itemAction({ type: 'success', title: 'Customer Added', message: 'Your Customer has successfully added' });
            } else {
                this._dropdown.itemAction({ type: 'error', title: 'Error', message: 'There was some error in adding your customer, please try again.' });
            }
        }
    }

    async dashboardOpen() {
        const token = await AsyncStorage.getItem('user_token');
        const data = {
            token: token

        };
        const resp = await services.dashboard(data);
        const responseInJson = await resp.json();
        console.log(responseInJson);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    showDrawer={true}
                    showCartIcon={true}
                    showNotificationIcon={true}
                    title={'Add Customer'}
                />

                <ScrollView keyboardDismissMode={'on-drag'} >
                    <View style={styles.dashboardView}>
                        <Text style={styles.dashboardText}>My New Customer</Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.inputText}>Name<Text style={{ color: 'red' }}>*</Text></Text>
                        <TextInput style={styles.inputBox}
                            onChangeText={(t) => this.setState({ Name: t })}
                            placeholder="Name"
                            placeholderTextColor="#a6b8d4"
                            autoCapitalize='none'
                        />
                        <Text style={styles.inputText}>Code<Text style={{ color: 'red' }}>*</Text></Text>
                        <TextInput style={styles.inputBox}
                            onChangeText={(t) => this.setState({ Code: t })}
                            placeholder="Code"
                            autoCapitalize='none'
                            placeholderTextColor="#a6b8d4"
                        />
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.AccountOpenDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2020-01-01"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ AccountOpenDate: date }) }}
                        />
                        <Text style={styles.inputText}>Mobile<Text style={{ color: 'red' }}>*</Text></Text>
                        <TextInput style={styles.inputBox}
                            onChangeText={(t) => this.setState({ Mobile: t })}
                            placeholder="Mobile"
                            keyboardType="numeric"
                            placeholderTextColor="#a6b8d4"
                        />
                        <Text style={styles.inputText}>Phone<Text style={{ color: 'red' }}>*</Text></Text>
                        <TextInput style={styles.inputBox}
                            onChangeText={(t) => this.setState({ Phone: t })}
                            placeholder="Phone"
                            keyboardType="numeric"
                            placeholderTextColor="#a6b8d4"
                        />
                        <Text style={styles.inputText}>Email</Text>
                        <TextInput style={styles.inputBox}
                            onChangeText={(t) => this.setState({ Email: t })}
                            placeholder="Email"
                            placeholderTextColor="#a6b8d4"
                            autoCapitalize='none'
                            keyboardType="email-address"
                            errorMessage="Please enter a valid email address"
                        />
                        <Text style={styles.inputText}>Fax</Text>
                        <TextInput style={styles.inputBox}
                            onChangeText={(t) => this.setState({ Fax: t })}
                            placeholder="Fax"
                            autoCapitalize='none'
                            placeholderTextColor="#a6b8d4"
                        />
                        <Text style={styles.inputText}>URL</Text>
                        <TextInput style={styles.inputBox}
                            onChangeText={(t) => this.setState({ Url: t })}
                            placeholder="URL"
                            autoCapitalize='none'
                            placeholderTextColor="#a6b8d4"
                        />
                        <LoadingButton ref={(c) => this._addCustomerBtn = c} title='Add Customer' style={styles.button} onPress={() => this.addCustomer()} />
                    </View>
                </ScrollView>
                <DropdownMessageAlert ref={(c) => (this._dropdown = c)} />
            </View>
        );
    }
}

const styles = {
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#edf1f5',
    },
    dashboardView: {
        height: 75,
        backgroundColor: '#b01800',
        marginBottom: 13
    },
    dashboardText: {
        fontSize: 16,
        textAlign: 'justify',
        color: 'white',
        marginLeft: 15,
        marginRight: 15
    },
    form: {
        justifyContent: 'flex-end',
        padding: 20
    },
    inputText: {
        fontSize: 18,
        color: 'black'
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#012A59',
        fontSize: 18,
        color: 'black',
        marginTop: 10,
        marginBottom: 20,
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 8
    },
    button: {
        // flex: 1,
        backgroundColor: '#b01800',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        borderRadius: 5
        // paddingVertical: 30
    },
    buttonText: {
        fontSize: 22,
        fontWeight: '200',
        color: '#fff',
        textAlign: 'center'
    },
    forgotPassword: {
        alignItems: 'center',
        marginTop: 20,
    },
    forgotPasswordText: {
        fontSize: 20,
    }

};
