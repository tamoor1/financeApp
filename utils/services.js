const BASE_URL = 'http://127.0.0.1:5000/api/v1';

export default {
	async login(url) {
		try {
			let response = await fetch(BASE_URL + url, {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json'
				})
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
	}
};
