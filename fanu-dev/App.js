import 'react-native-gesture-handler';
import {
  // SafeAreaView,
  // StyleSheet,
  // ScrollView,
  //View,
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
import OIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Pie from 'react-native-pie';
import SettingsScreen from './src/components/screens/SettingsScreen'
import InventoryScreen from './src/components/screens/InventoryScreen'
//import HomeScreen from './src/components/screens/HomeScreen'
import MealsScreen from './src/components/screens/MealsScreen'
import ServerScreen from './src/components/screens/ServerScreen'
import LoginScreen from './src/components/screens/LoginScreen'
import RegistrationScreen from './src/components/screens/RegistrationScreen';


import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';




//<Stack.Screen name="Home" component={HomeScreen} />

const Stack = createStackNavigator();

// function Tabs() {
//   return (

//   )
// }



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




// const TabNavigator = createMaterialBottomTabNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//       navigationOptions: {
//         tabBarIcon: ({tintColor}) => (
//           <View>
//             <Icon name="home" size={25} />
//           </View>
//         ),
//       },
//     },
//     Inventory: {
//       screen: InventoryScreen,
//       navigationOptions: {
//         tabBarIcon: ({tintColor}) => (
//           <View>
//             <Icon name="local-grocery-store" size={25} />
//           </View>
//         ),
//       },
//     },
//     Meals: {
//       screen: MealsScreen,
//       navigationOptions: {
//         tabBarIcon: ({tintColor}) => (
//           <View>
//             <OIcon name="food" size={25} />
//           </View>
//         ),
//       },
//     },
//     Settings: {
//       screen: SettingsScreen,
//       navigationOptions: {
//         tabBarIcon: ({tintColor}) => (
//           <View>
//             <Icon name="settings" size={25} />
//           </View>
//         ),
//       },
//     },
//     // Registration: {
//     //   screen: RegistrationScreen,
//     //   navigationOptions: {
//     //     tabBarIcon: ({tintColor}) => (
//     //       <View>
//     //         <Icon name="settings" size={25} />
//     //       </View>
//     //     ),
//     //   },
      
      
//     // }
//     Server: {
//       screen: ServerScreen,
//       navigationOptions: {
//         tabBarIcon: ({tintColor}) => (
//           <View>
//             <Icon name="developer-mode" size={25} />
//           </View>
//         ),
//       },
//     },
//   },
//   {
//     initialRouteName: 'Home',
//     activeColor: '#f0edf6',
//     inactiveColor: '#3e2465',
//     barStyle: {backgroundColor: '#71eeb8'},
//   },
// );