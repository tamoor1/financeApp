import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import Logo from './Logo';
import services from '../utils/services';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import LoadingButton from '../templates/LoadingButton';
import deviceStorage from '../utils/deviceStorage'

export default class App extends Component {
  state = {
    CompanyName: '',
    Username: '',
    Password: '',
    Address: '',
    Phone: '',
    Fax: '',
    NTN: '',
    STN: '',
    FirstName: '',
    LastName: ''

  }

  validateForm() {
    const { state } = this;
    let CompanyName = state.Username;
    let Username = state.Username.trim();
    let Password = state.Password;
    let Address = state.Address;
    let Phone = state.Phone;
    let Fax = state.Fax;
    let NTN = state.NTN;
    let STN = state.STN;
    let FirstName = state.FirstName;
    let LastName = state.LastName;


    let isValid = false;

    if (CompanyName == '') {
      this._dropdown.itemAction({ title: 'Error', message: 'Company Name is required', type: 'error' });
    } else if (Username == '') {
      this._dropdown.itemAction({ title: 'Error', message: 'User Name is required', type: 'error' });
    } else if (Address == '') {
      this._dropdown.itemAction({ title: 'Error', message: 'Address is required', type: 'error' });
    } else if (Phone == '') {
      this._dropdown.itemAction({ title: 'Error', message: 'Phone is required', type: 'error' });
    } else if (FirstName == '') {
      this._dropdown.itemAction({ title: 'Error', message: 'First Name is required', type: 'error' });
    } else {
      isValid = true;
    }
    return isValid;
  }

  async registerUser() {
    if (this.validateForm()) {
      const { state } = this;
      const data = {
        CompanyName: state.CompanyName,
        Username: state.Username,
        Password: state.Password,
        Address: state.Address,
        Phone: state.Phone,
        Fax: state.Fax,
        NTN: state.NTN,
        STN: state.STN,
        FirstName: state.FirstName,
        LastName: state.LastName,
      };
      this._signupBtn.showLoading(true);
      const response = await services.signup(data);
      const responseJson = await response.json();
      console.log("TCL: App -> registerUser -> responseJson", responseJson)
      this._signupBtn.showLoading(false);
      console.log(responseJson);
      if (response.ok) {
        this._dropdown.itemAction({ type: 'success', title: 'Account Created', message: 'Your account has been created successfully.' });
        this.navigation.navigate('Login');
      } else {
        this._dropdown.itemAction({ type: 'error', title: 'Error', message: 'There was some error in creating your account, please try again.' });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 20 }} keyboardDismissMode={'on-drag'} >
          <View style={styles.logoView}>
            <Image source={require('../images/logo1.png')}
              resizeMode={'contain'}
              style={{ width: '100%', height: 130 }}
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.inputText}>Company Name<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({ CompanyName: t })}
              placeholder="Company Name"
              placeholderTextColor="#a6b8d4"
              autoCapitalize='none'
            />
            <Text style={styles.inputText}>Email<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({ Username: t })}
              placeholder="Email"
              placeholderTextColor="#a6b8d4"
              autoCapitalize='none'
              keyboardType="email-address"
              required
              email
              errorMessage="Please enter a valid email address"
            />
            <Text style={styles.inputText}>Password<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({ Password: t })}
              placeholder="Password"
              autoCapitalize='none'
              placeholderTextColor="#a6b8d4"
              secureTextEntry={true}
            // minLength={5}
            // errorMessage="Please enter valid password (min length = 5)"
            />
            <Text style={styles.inputText}>Address<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({ Address: t })}
              placeholder="Address"
              placeholderTextColor="#a6b8d4"
            />
            <Text style={styles.inputText}>Phone<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({ Phone: t })}
              placeholder="Phone"
              autoCapitalize='none'
              keyboardType="numeric"
              placeholderTextColor="#a6b8d4"
            />
            <Text style={styles.inputText}>Fax</Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({ Fax: t })}
              placeholder="Fax"
              autoCapitalize='none'
              keyboardType="numeric"
              placeholderTextColor="#a6b8d4"
            />
            <Text style={styles.inputText}>NTN</Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({ NTN: t })}
              placeholder="NTN"
              autoCapitalize='none'
              keyboardType="numeric"
              placeholderTextColor="#a6b8d4"
            />
            <Text style={styles.inputText}>STN</Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({ STN: t })}
              placeholder="STN"
              autoCapitalize='none'
              keyboardType="numeric"
              placeholderTextColor="#a6b8d4"
            />
            <Text style={styles.inputText}>First Name<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({ FirstName: t })}
              placeholder="First Name"
              autoCapitalize='none'
              placeholderTextColor="#a6b8d4"
            />
            <Text style={styles.inputText}>Last Name<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({ LastName: t })}
              placeholder="Last Name"
              autoCapitalize='none'
              placeholderTextColor="#a6b8d4"
            />
            <LoadingButton ref={(c) => this._signupBtn = c} title='Signup' style={styles.button} onPress={() => this.registerUser()} />
            <View style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Already have an account? <Text style={{ color: '#28609e' }} onPress={() => this.props.navigation.navigate('Login')}> Log In</Text></Text>
            </View>
          </View>
        </ScrollView>
        <DropdownMessageAlert ref={(c) => this._dropdown = c} />
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200
  },
  form: {
    flex: 1,
    justifyContent: 'flex-end'
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
