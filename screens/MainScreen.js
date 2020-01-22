import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	Button,
	AsyncStorage,
	FlatList
} from 'react-native';
import Header from '../components/Header';
import { NavigationEvents } from 'react-navigation';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import services from '../utils/services';
import functions from '../utils/functions';

export default class Main extends Component {
	state = {
		isConnected: true
	};

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
			<View style={{ flex: 1, backgroundColor: '' }}>
				<Header
					navigation={this.props.navigation}
					showDrawer={true}
					showCartIcon={true}
					showNotificationIcon={true}
					title={'Dashboard'}
				/>

				<ScrollView>
					<View style={styles.dashboardView}>
						<Text style={styles.dashboardText}>My New Finance App</Text>
					</View>
					<View style={styles.tilesView}>
						<View style={styles.flexView}>
							<TouchableOpacity
								onPress={() => this.props.navigation.navigate('addCustomer')}
								style={styles.tile}
							>
								<View>
									<Text style={styles.tileText}>Add Customers</Text>
								</View>
								<View>
									<Icon name="pencil" backgroundColor="#3b5998" color="red" size={40} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => this.props.navigation.navigate('listCustomer')}
								style={styles.tile}
							>
								<View>
									<Text style={styles.tileText}>Customer's List</Text>
								</View>
								<View>
									<Icon name="list" backgroundColor="#3b5998" color="red" size={40} />
								</View>
							</TouchableOpacity>
						</View>
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
		backgroundColor: '#edf1f5',
	},
	container: {
		flex: 1,
		backgroundColor: '#edf1f5'
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
	tilesView: {
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 10,
		paddingVertical: 25
	},
	flexView: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 25,
		flex: 1,
		height: 135
	},
	tile: {
		backgroundColor: '#fff',
		// borderWidth: 2,
		// borderColor: 'red',
		borderColor: '#ddd',
		borderRadius: 10,
		borderBottomWidth: 1,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.6,
		shadowRadius: 5,
		elevation: 7,
		alignItems: 'center',
		justifyContent: 'space-around',
		flex: 0.42

		// marginHorizontal: 10
	},
	tileText: {
		fontSize: 18,
		color: 'red',
		textAlign: 'center'
	},
	// tileImage: {
	//   height: 150,
	//   width: 100
	// },
	contactView: {
		justifyContent: 'flex-end'
	},
	contactButton: {
		backgroundColor: '#e04c67',
		height: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},
	contactText: {
		color: 'white',
		fontSize: 20
	}
};
