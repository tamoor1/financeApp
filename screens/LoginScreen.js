import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TextInput,
	ScrollView,
	AsyncStorage
} from 'react-native';
import Logo from './Logo';
import services from '../utils/services';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import LoadingButton from '../templates/LoadingButton';
import functions from '../utils/functions';
import { StackNavigator } from 'react-navigation';

export default class Login extends Component {
	navigation = this.props.navigation;

	state = {
		UserName: '',
		Password: '',
		loginData: {}
	};

	validateForm() {
		const { state } = this;
		let UserName = state.UserName;
		let Password = state.Password;
		let isValid = false;

		if (UserName == '') {
			this._dropdown.itemAction({
				title: 'Error',
				message: 'Email is required',
				type: 'error'
			});
		} else if (Password == '') {
			this._dropdown.itemAction({
				title: 'Error',
				message: 'Password is required',
				type: 'error'
			});
		} else {
			isValid = true;
		}
		return isValid;
	}

	async login() {
		if (this.validateForm()) {
			const { state } = this;
			const data = {
				UserName: state.UserName,
				Password: state.Password,

			};
			this._loginBtn.showLoading(true);
			const response = await services.login(data);
			// console.log("TCL: Login -> login -> response", response)

			this._loginBtn.showLoading(false);
			if (response.ok) {
				const responseJson = await response.json();
				console.log('Response in JSON 1: ', responseJson);
				await AsyncStorage.multiSet([
					['user_token', responseJson.Token],
					['user', JSON.stringify(responseJson)]
				]);
				this.navigation.navigate('Dashboard');
			} else {
				this._dropdown.itemAction({ type: 'error', title: 'Error', message: 'Something went wrong!' });
			}
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView keyboardDismissMode={'on-drag'}>
					<View style={styles.container1}>
						<View style={styles.logoView}>
							<Image
								source={require('../images/logo1.png')}
								resizeMode={'contain'}
								style={{ width: '100%', height: 130 }}
							/>
						</View>
						<View style={styles.form}>
							<Text style={styles.inputText}>Email</Text>
							<TextInput
								style={styles.inputBox}
								value={this.state.UserName}
								onChangeText={(t) => this.setState({ UserName: t })}
								placeholder="Email"
								autoCorrect={false}
								autoCapitalize="none"
								placeholderTextColor="#a6b8d4"
								keyboardType="email-address"
								errorMessage="Please enter a valid email address"
							/>
							<Text style={styles.inputText}>Password</Text>
							<TextInput
								style={styles.inputBox}
								value={this.state.Password}
								onChangeText={(t) => this.setState({ Password: t })}
								placeholder="Password"
								secureTextEntry={true}
								autoCapitalize="none"
								placeholderTextColor="#a6b8d4"
							/>
							<LoadingButton
								ref={(c) => (this._loginBtn = c)}
								title="Login"
								style={styles.button}
								onPress={() => this.login()}
							/>
						</View>
						<View style={styles.forgotPassword}>
							<Text style={styles.forgotPasswordText}>
								Don't have an account?{' '}
								<Text style={{ color: '#28609e' }} onPress={() => this.navigation.navigate('Signup')}>
									Sign Up
								</Text>
							</Text>
						</View>
					</View>
					<DropdownMessageAlert ref={(c) => (this._dropdown = c)} />
				</ScrollView>
			</View>
		);
	}
}
const styles = {
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#FFFFFF'
	},
	logoView: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 200
	},
	form: {
		// flex: 1,
		justifyContent: 'center'
		// backgroundColor: 'blue'
	},
	inputText: {
		fontSize: 18,
		color: 'black'
	},
	inputBox: {
		borderWidth: 1,
		borderColor: '#a6b8d4',
		fontSize: 18,
		color: 'black',
		marginTop: 10,
		marginBottom: 20,
		paddingHorizontal: 8,
		height: 40,
		borderRadius: 5
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
		flex: 1
		// backgroundColor: 'blue'
	},
	forgotPasswordText: {
		fontSize: 22
	}
};
