import React, { Component } from "react";
import Dialog, { SlideAnimation, DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from "react-native";
import DropdownMessageAlert from "../templates/DropdownMessageAlert";
import Icon from "react-native-vector-icons/FontAwesome";

const deviceHeight = Dimensions.get("screen").height;

const deviceWidth = Dimensions.get("screen").width;

export default class DrawerScreen extends Component<> {
  state = {
    userData: {},
    cmsData: {}
  };
  async logout() {
    this.setState({
      popupVisible: false
    });
    await AsyncStorage.multiRemove(['user_token', 'isloggedin', 'userData']);
    this.props.navigation.navigate('Auth');

  }

  popupVisible() {
    this.setState({
      popupVisible: true
    });
  }

  async componentDidMount() {
    const userData = await functions.getUserData();
    this.setState({ userData });
    console.log(userData);
  }

  openNavigation(route) {
    const { navigation } = this.props;
    navigation.closeDrawer();
    navigation.navigate(route);
  }

  render() {
    const { navigation } = this.props;
    const { userData } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'purple' }}>
        <ScrollView contentContainerStyle={{ padding: 30 }}>
          <TouchableOpacity
            onPress={() => navigation.closeDrawer()}
            style={styles.backImageView}
          >
            <Image
              source={require("../images/Back-arrow.png")}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <View style={styles.profView}>
            <TouchableOpacity style={styles.profImageView}>
              <Image
                source={require("../images/profile-pic.png")}
                style={styles.ProfImage}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: deviceWidth / 20 }}>
              <Text style={[styles.profName, styles.fontColor]}>
                Finance App
              </Text>
              <Text style={styles.fontColor}>My Records</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.openNavigation("Dashboard")}
              style={styles.tabBar}
            >
              <Icon
                name="tachometer"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.openNavigation("addCustomer")}
              style={styles.tabBar}
            >
              <Icon
                name="check-square-o"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>
                Add Customers
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.openNavigation("listCustomer")}
              style={styles.tabBar}
            >
              <Icon
                name="list"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>
                Customer's List
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => this.logout()}
              style={styles.tabBar}
            >
              <Icon
                name="user"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <DropdownMessageAlert ref={c => (this._dropdown = c)} />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#5a86f5"
  },
  backImageView: {
    backgroundColor: "#7b9ef7",
    width: 50,
    borderRadius: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  backImage: {
    width: 20,
    height: 20
  },
  profView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40
  },
  ProfImage: {
    borderRadius: 50,
    width: deviceHeight / 11,
    height: deviceHeight / 11
  },
  profName: {
    fontSize: deviceHeight / 30,
    marginBottom: 5,
    textTransform: "capitalize"
  },
  fontColor: {
    color: "#fff",
    fontWeight: "500"
  },
  tabBar: {
    flexDirection: "row",
    // alignItems: 'center',
    marginBottom: 20
  },
  tabImage: {
    width: deviceHeight / 29,
    height: deviceHeight / 29
  },
  tabText: {
    marginLeft: deviceWidth / 10,
    fontSize: deviceHeight / 40,
    borderBottomWidth: 1,
    borderColor: "#7fb7ef",
    flex: 1,
    paddingBottom: 20
  },
  faqSettingsView: {
    marginVertical: deviceHeight / 100
  }
});
