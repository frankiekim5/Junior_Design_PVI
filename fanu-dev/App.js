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
import Pie from 'react-native-pie'
import SettingsScreen from './src/components/screens/SettingsScreen'
import InventoryScreen from './src/components/screens/InventoryScreen'
// import HomeScreen from './src/components/screens/HomeScreen'
import MealsScreen from './src/components/screens/MealsScreen'
import LoginScreen from './src/components/screens/LoginScreen'
import RegistrationScreen from './src/components/screens/RegistrationScreen';
import ServerScreen from './src/components/screens/Server'
import HomeScreen from './src/components/screens/HomeScreen'


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
import TabScreen from './src/components/screens/TabScreen';
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


class WelcomeScreen extends Component {
  render() {
    return  (
      <View style ={{flex:1, alignItems:'center', justifyContent:
      'center'}}>
        <Button title= 'Login' onPress={()=>
          this.props.navigation.navigate('LoginScreen')}
        />
        <Button title= 'Register' onPress={()=>
          this.props.navigation.navigate('RegistrationScreen')}
        />
      </View>

    );
  }
}
/* class DashboardScreen extends Component {
  render() {
    return  (
      <View style ={{flex:1, alignItems:'center', justifyContent:
      'center'}}>
        <Text> DashboardScreen</Text>
      </View>
    );
  }
}
 */
const DashboardTabNavigator = createMaterialBottomTabNavigator(
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

const AppStackNavigator = createStackNavigator();

function DashboardStackNavigator() {
  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator>
        <AppStackNavigator.Screen name="DashboardTabNavigator" component={DashboardTabNavigator} />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
}


const AppDrawerNavigator = createDrawerNavigator();

<NavigationContainer>
      <AppDrawerNavigator.Navigator>
        <AppDrawerNavigator.Screen name="Dashboard" component= {TabScreen} />

      </AppDrawerNavigator.Navigator>
</NavigationContainer>
function MyDrawer() {
  return (
    <NavigationContainer>
      <AppDrawerNavigator.Navigator>
        <AppDrawerNavigator.Screen name="Dashboard" component={DashboardStackNavigator} />
      </AppDrawerNavigator.Navigator>
    </NavigationContainer>
  );
}


const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  TabScreen:{screen: TabScreen},
  LoginScreen:{screen:  LoginScreen},
  RegistrationScreen:{screen: RegistrationScreen},
  HomeScreen: {screen: HomeScreen}

});
const AppContainer = createAppContainer(SwitchNavigator);
//
//
//
class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
//   // (
//
//     // <NavigationContainer>
//     //   <Stack.Navigator>
//     //     <Stack.Screen name="Registration" component={RegistrationScreen} />
//     //
//     //   </Stack.Navigator>
//     // </NavigationContainer>
//   // );
//
//
export default App;