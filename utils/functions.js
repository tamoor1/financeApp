import { AsyncStorage } from 'react-native';

export default {

    async setUserData(data) {
        const { CompanyId, Company, Role, UserId, userName } = data;
        await AsyncStorage.multiSet([
            ['companyId', CompanyId.toString()],
            ['company', Company]
            ['role', Role],
            ['userId', UserId.toString()],
            ['userName', userName],
            ['userData', JSON.stringify(data)]
        ]);
    },

    async getUserId() {
        return await AsyncStorage.getItem('userId');
    },

    async getUserData() {
        const data = await AsyncStorage.getItem('userData');
        return await JSON.parse(data);
    },

    async getCompanyId() {
        console.log('test')
        return await AsyncStorage.getItem('companyId');
    },

    async setUser(data) {
        await AsyncStorage.setItem(user, data)
    },

    async getUser() {
        const userDetail = await AsyncStorage.getItem('user');
        return JSON.parse(userDetail);
    },

    async getToken() {
        const userDetail = await AsyncStorage.getItem('user');
        const user = JSON.parse(userDetail);
        return user.Token;
    }

}