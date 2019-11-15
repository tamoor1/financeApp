import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator
} from "react-navigation";

import Drawer from "../screens/Drawer";
import HomeScreen from "../screens/HomeScreen";

import LoginScreen from "../screens/LoginScreen";
import MainScreen from "../screens/MainScreen";
import SignupScreen from "../screens/SignupScreen";
import GalleryScreen from "../screens/GalleryScreen";



const AuthStack = createStackNavigator(
  {
    Home:{
      screen: HomeScreen
    },

    Login: {
      screen: LoginScreen
    },

    Signup: {
      screen: SignupScreen
    }
  },
);


const HomeDrawer = createDrawerNavigator(
  {
    Dashboard: {
      screen: MainScreen
    },

    Gallery: {
      screen: GalleryScreen
    },
  },
  {
    contentComponent: Drawer,
    defaultNavigationOptions: {
      headerTitleContainerStyle: {
        justifyContent: "center"
      }
    }
  }
);

const MainSwitch = createSwitchNavigator({
  Auth: {
    screen: AuthStack
  },

  Home: {
    screen: HomeDrawer
  }
});

const AppContainer = createAppContainer(MainSwitch);

export default AppContainer;
