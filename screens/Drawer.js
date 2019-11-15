import React, { Component } from "react";
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
import functions from "../utils/functions";
import services from "../utils/services";

const deviceHeight = Dimensions.get("screen").height;

const deviceWidth = Dimensions.get("screen").width;

export default class DrawerScreen extends Component<> {
  state = {
    userData: {},
    cmsData: {}
  };
  async logout() {
    await AsyncStorage.multiRemove(["user_token", "isloggedin", "userData"]);
    var date = new Date();
    // const logindata = { isLogin: 0, LastLoginData: date };
    // await functions.setLoginData(logindata);
    this.props.navigation.navigate("Auth");
  }
  async componentDidMount() {
    const userData = await functions.getUserData();
    this.setState({ userData });
    console.log(userData);
    const cmsData = await functions.getCMSData();
    this.setState({ cmsData });
    console.log("NAv color: ", cmsData.nav_color);
  }
  
  openNavigation(route) {
    const { navigation } = this.props;
    navigation.closeDrawer();
    navigation.navigate(route);
  }
  
  render() {
    const { navigation } = this.props;
    const { userData } = this.state;
    const { cmsData } = this.state;
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
                {userData.name}
              </Text>
              <Text style={styles.fontColor}>My Gallery</Text>
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
              onPress={() => this.openNavigation("Jobs")}
              style={styles.tabBar}
            >
              <Icon
                name="align-left"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>
                {cmsData.jobs_title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openNavigation("DoneJobs")}
              style={styles.tabBar}
            >
              <Icon
                name="check-square-o"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>
                {cmsData.jobs_outstanding_title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openNavigation("RaiseJob")}
              style={styles.tabBar}
            >
              <Icon
                name="pencil"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>
                {cmsData.raise_form_title}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.faqSettingsView}>
            <TouchableOpacity
              onPress={() => this.openNavigation("WriteTags")}
              style={styles.tabBar}
            >
              <Icon
                name="tags"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>Write Tags</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openNavigation("WriteKeys")}
              style={styles.tabBar}
            >
              <Icon
                name="key"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>Write Keys</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openNavigation("faq")}
              style={styles.tabBar}
            >
              <Icon
                name="question-circle"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>
                {cmsData.faq_title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openNavigation("contact")}
              style={styles.tabBar}
            >
              <Icon
                name="user"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>
                {cmsData.contact_us_title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handlePress()}
              style={styles.tabBar}
            >
              <Icon
                name="bell"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>
                {"Panic Alarms"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openNavigation("editProfile")}
              style={styles.tabBar}
            >
              <Icon
                name="user"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>
                {cmsData.profile_title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openNavigation("CustomerList")}
              style={styles.tabBar}
            >
              <Icon
                name="building"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>
                Customer List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openNavigation("ScanJob")}
              style={styles.tabBar}
            >
              <Icon
                name="info-circle"
                backgroundColor="#3b5998"
                color="#FFFFFF"
                size={20}
              />
              <Text style={[styles.tabText, styles.fontColor]}>
                {cmsData.info_title}
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
