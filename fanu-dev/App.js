import React, {Component} from 'react';
import {
  // SafeAreaView,
  // StyleSheet,
  // ScrollView,
  View,
  // Text,
  // StatusBar,
  // ImageBackground,
  // Image,
} from 'react-native';
import {
//   Header,
//   LearnMoreLinks,
  Colors,
//   DebugInstructions,
//   ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Pie from 'react-native-pie';
import ProfileScreen from './src/components/screens/ProfileScreen'
import InventoryScreen from './src/components/screens/InventoryScreen'
import HomeScreen from './src/components/screens/HomeScreen'

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
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="settings" size={25} />
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
  },
  {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: {backgroundColor: '#71eeb8'},
  },
);

export default createAppContainer(TabNavigator);
