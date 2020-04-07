import 'react-native-gesture-handler';
import {

} from 'react-native';
import {

  Colors,

} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Pie from 'react-native-pie'
import InventoryScreen from './InventoryScreen'
import SettingsScreen from './SettingsScreen'
// import HomeScreen from './src/components/screens/HomeScreen'
import MealsScreen from './MealsScreen'


import ServerScreen from './Server'
import HomeScreen from './HomeScreen'

import React, {Component} from 'react';
// import {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createBottomTabNavigator } from 'react-navigation';
// import { MaterialCommunityIcons } from 'react-native-vector-icons';
//
import { NavigationContainer } from '@react-navigation/native';
import{ createSwitchNavigator} from 'react-navigation';
// import{DashboardStackNavigator} from './src/components/screens/TabNavigator'
//
//
// //<Stack.Screen name="Home" component={HomeScreen} />
//
// // const Stack = createStackNavigator();
// //
// // // function Tabs() {
// // //   return (
// //
// // //   )
// // // }
//

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="home" size={25} />
          </View>
        ),
      },
    },
    Inventory: {
      screen: InventoryScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="local-grocery-store" size={25} />
          </View>
        ),
      },
    },
    Meals: {
      screen: MealsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <OIcon name="food" size={25} />
          </View>
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="settings" size={25} />
          </View>
        ),
      },
    },

    Server: {
      screen: ServerScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="developer-mode" size={25} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: {backgroundColor: '#71eeb8'},
  },
);

export default createAppContainer(TabNavigator);
