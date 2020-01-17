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

export default class App extends Component<{}> {
	navigation = this.props.navigation;

	state = {
		email: '',
		password: '',
		loginData: {}
	};

	async componentDidMount() {
		const loginData = await functions.getLoginData();
		this.setState({ loginData });
		console.log(this.state.loginData.isLogin);
		if (this.state.loginData.isLogin) {
			var prevDate = this.state.loginData.LastLoginData;
			var CurrentDate = new Date();
			lastDate = new Date(prevDate);
			var start = Math.floor(lastDate.getTime() / (3600 * 24 * 1000));
			var end = Math.floor(CurrentDate.getTime() / (3600 * 24 * 1000));
			var daysDiff = end - start;
			console.log('days diff: ', daysDiff);
			if (daysDiff < 7) {
				var date = new Date();
				const logindata = { isLogin: 1, LastLoginData: date };
				await functions.setLoginData(logindata);
				this.navigation.navigate('Home');
			}
		}
	}
	validateForm() {
		const { state } = this;
		let email = state.email;
		let password = state.password;
		let isValid = false;

		if (email == '') {
			this._dropdown.itemAction({
				title: 'Error',
				message: 'Email is required',
				type: 'error'
			});
		} else if (password == '') {
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
		this.navigation.navigate('Dashboard');
		if (this.validateForm()) {
			const { state } = this;

			const url = `/auth/login?email=${state.email}&password=${state.password}`;
			this._loginBtn.showLoading(true);
			const response = await services.login(url);
			console.log('TCL: App -> login -> response', response);

			const responseJson = await response.json();
			console.log('TCL: App -> login -> responseJson', responseJson);
			this._loginBtn.showLoading(false);

			// const userId = await functions.getUserId();
			if (responseJson) {
				// await functions.setUserData(responseJson);
				// var date = new Date();
				// const logindata = { isLogin: 1, LastLoginData: date };
				// await functions.setLoginData(logindata);
				this.navigation.navigate('Dashboard');
			} else {
				this._dropdown.itemAction({
					type: 'error',
					title: 'Error',
					message: responseJson.message
				});
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
								value={this.state.email}
								onChangeText={(t) => this.setState({ email: t })}
								placeholder="Email"
								autoCorrect={false}
								autoCapitalize="none"
								placeholderTextColor="#a6b8d4"
							/>
							<Text style={styles.inputText}>Password</Text>
							<TextInput
								style={styles.inputBox}
								value={this.state.password}
								onChangeText={(t) => this.setState({ password: t })}
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
					{/* <DropdownMessageAlert ref={(c) => (this._dropdown = c)} /> */}
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
