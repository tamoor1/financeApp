import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Dialog, {
  SlideAnimation,
  DialogContent,
  ScaleAnimation
} from "react-native-popup-dialog";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  NetInfo
} from "react-native";
import services from "../utils/services";
import PropTypes from "prop-types";
import DropdownMessageAlert from "../templates/DropdownMessageAlert";
import functions from "../utils/functions";
import { StackNavigator } from "react-navigation";

const deviceHeight = Dimensions.get("screen").height;

export default class Navbar extends Component<{}> {
  state = {
    popupVisible: false,
  };

  static propTypes = {
    showDrawer: PropTypes.bool,
    showCartIcon: PropTypes.bool,
    showNotificationIcon: PropTypes.bool,
    showUserIcon: PropTypes.bool
  };
 
  async logout() {
    this.setState({
      popupVisible: false
    });
    await AsyncStorage.multiRemove(["user_token", "isloggedin", "userData"]);
    var date = new Date();
    // const logindata = { isLogin: 0, LastLoginData: date };
    // await functions.setLoginData(logindata);
    this.props.navigation.navigate("Auth");
  }

  popupVisible() {
    this.setState({
      popupVisible: true
    });
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'red',
          height: deviceHeight / 10,
          paddingTop: deviceHeight / 25,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {this.props.showDrawer !== true ? (
            <TouchableOpacity
              style={{
                width: 50,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Image
                source={require("../images/Back-arrow.png")}
                resizeMode={"contain"}
                style={{ width: "100%", height: 20 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ width: 50, justifyContent: "center" }}
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Image
                source={require("../images/menu_icon.png")}
                resizeMode={"contain"}
                style={{ width: "100%", height: 40 }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>{this.props.title}</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            right: 0
          }}
        >
          {this.props.showUserIcon !== false ? (
            <TouchableOpacity
              style={styles.icon}
              onPress={() => this.props.navigation.navigate("abc")}
            >
              <Image
                source={require("../images/user-icon1.png")}
                resizeMode={"contain"}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity style={styles.icon} onPress={() => this.logout()}>
            <Image
              source={require("../images/logout.png")}
              resizeMode={"contain"}
              style={{ width: 30, height: 20 }}
            />
          </TouchableOpacity>
        </View>

        <DropdownMessageAlert ref={c => (this._dropdown = c)} />
      </View>
    );
  }
}
const styles = {
  navbar: {
    backgroundColor: "#1B98E1",
    height: deviceHeight / 10,
    paddingTop: deviceHeight / 25,
    flexDirection: "row",
    alignItems: "center"
    // justifyContent: 'space-between'
  },
  headerTextView: {
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#fff"
  },
  icon: {
    width: 35,
    paddingTop: deviceHeight / 25,
    // height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  iconImage: {
    width: 40,
    height: 25
  },
  rfmButton: {
    // backgroundColor: '#f33155',
    height: 25,
    borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 8,
    // marginTop: 3,
    width: "30%",
    alignItems: "center",
    justifyContent: "center"
  },
  rfmText: {
    color: "#f33155",
    fontSize: 15
  }
};
