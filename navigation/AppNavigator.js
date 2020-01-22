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
import AddCustomerScreen from "../screens/AddCustomerScreen";
import ListCustomersScreen from "../screens/ListCustomersScreen";



const AuthStack = createStackNavigator(
  {
    Home: {
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

    addCustomer: {
      screen: AddCustomerScreen
    },

    listCustomer: {
      screen: ListCustomersScreen
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
