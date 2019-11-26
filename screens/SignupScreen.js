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

export default class App extends Component<{}> {
  state = {
    user_name: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    address: '',
  }

  validateForm() {
    const {state} = this;
    let user_name = state.user_name.trim();
    let password = state.password;
    let confirmPassword = state.confirmPassword;
    let phone_number = state.phone_number;
    let address = state.address;
    let isValid = false;

    if(user_name == '') {
        this._dropdown.itemAction({title: 'Error', message: 'User Name is required', type: 'error'});
      } else if(phone_number == '') {
        this._dropdown.itemAction({title: 'Error', message: 'Mobile Number is required', type: 'error'});
      } else if(address == '') {
        this._dropdown.itemAction({title: 'Error', message: 'Address is required', type: 'error'});
      } else if(password == '') {
        this._dropdown.itemAction({title: 'Error', message: 'Password is required', type: 'error'});
      } else if(password !== confirmPassword) {
        this._dropdown.itemAction({title: 'Error',message: 'Password and Confirm Password are not same', type: 'error'});
      } else {
        isValid = true;
      }
      return isValid;
    }

  async registerUser() {
    if (this.validateForm()) {
      const {state} = this;
      const data = {
        user_name: state.user_name,
        password: state.password,
        phone_number: state.phone_number,
        address: state.address,
      };
      this._signupBtn.showLoading(true);
      const response = await services.signup(data);
      const responseJson = await response.json();
      this._signupBtn.showLoading(false);
      console.log(responseJson);
      if (responseJson.response === 'success') {
        this._dropdown.itemAction({type: 'success', title: 'Account Created', message: 'Your account has been created successfully.'});
      } else {
        this._dropdown.itemAction({type: 'error', title: 'Error', message: 'There was some error in creating your account, please try again.'});
      }
    }
  }

  render() {
    return(
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{padding: 20}} keyboardDismissMode={'on-drag'} >
          <View style={styles.logoView}>
            <Image source={require('../images/logo1.png')}
              resizeMode={'contain'}
              style={{width: '100%', height: 130}}
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.inputText}>User Name<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({user_name: t})}
              placeholder="User Name"
              placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Mobile<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({phone_number: t})}
              placeholder="Mobile Number"
              placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Address<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({address: t})}
              placeholder="Address"
              placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Password<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({password: t})}
              placeholder="Password"
              autoCapitalize='none'
              placeholderTextColor = "#a6b8d4"
              secureTextEntry={true}
            />
            <Text style={styles.inputText}>Confirm Password<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({confirmPassword: t})}
              placeholder = "Confirm Password"
              autoCapitalize='none'
              secureTextEntry={true}
              placeholderTextColor = "#a6b8d4"
            />
            <LoadingButton ref={(c) => this._signupBtn = c} title='Signup' style={styles.button} onPress={() => this.registerUser()} />
            <View style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Already have an account? <Text style={{color: '#28609e'}} onPress={() => this.props.navigation.navigate('Login')}> Log In</Text></Text>
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
  inputText:{
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
