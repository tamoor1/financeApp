const BASE_URL = 'http://xena.centralus.cloudapp.azure.com/beta/services/api/';
import functions from '../utils/functions';


export default {

	async login(data) {
		console.log('data: ', data);
		try {
			let response = await fetch(BASE_URL + 'login', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
			});
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
		}
	},

	async signup(data) {
		console.log('data: ', data);
		try {
			let response = await fetch(BASE_URL + 'register', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
			});
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
		}
	},

	async logout(data) {
		try {
			let response = await fetch(BASE_URL + 'logout', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			});
			let responseJson = await response.json();
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	},

	async customerAdd(data) {
		console.log('data: ', data);
		try {
			const Token = await functions.getToken();
			let response = await fetch(BASE_URL + 'customer/add', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: new Headers({
					'Content-Type': 'application/json',
					token: Token,
				}),
			});
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
		}
	},

	async showCustomers(url) {
		console.log(url);
		try {
			const Token = await functions.getToken();
			let response = await fetch(BASE_URL + url, {
				method: 'GET',
				headers: new Headers({
					'Content-Type': 'application/json',
					token: Token,

				}),
			});
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
		}
	},
};
