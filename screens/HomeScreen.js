import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { MonoText } from "../components/StyledText";
import { NavigationEvents } from "react-navigation";

export default class HomeScreen extends Component<> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Image
            source={require("../images/logo1.png")}
            resizeMode={"contain"}
            style={{ width: "100%", height: 130 }}
          />
        </View>
        <View style={styles.bothButtons}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.button}
          >
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Signup")}
            style={styles.button}
          >
            <Text style={styles.textButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10
  },
  logoView: {
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: 40,
    flex: 0.8
  },
  bothButtons: {
    flex: 0.2,
    justifyContent: "flex-end",
    // backgroundColor: 'blue',
    alignItems: "center"
  },
  button: {
    // flex: 1,
    backgroundColor: "#b01800",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    borderRadius: 5,
    borderColor: "#b01800",
    borderWidth: 1,
    marginVertical: 5
    // paddingVertical: 30
  },
  textButton: {
    color: "#fff",
    fontSize: 20
  }
});
