import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Pie from 'react-native-pie';

class HomeScreen extends React.Component {
  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('./src/components/img/market-seller-sale-shop.jpg')}
        imageStyle={{opacity: 0.5}}>
        <Text style={{color: 'white'}}>Grocery Basket Grade</Text>
        <Pie
              radius={100}
              innerRadius={40}
              sections={[
                {
                  percentage: 10,
                  color: '#C70039',
                },
                {
                  percentage: 20,
                  color: '#44CD40',
                },
                {
                  percentage: 30,
                  color: '#404FCD',
                },
                {
                  percentage: 40,
                  color: '#EBD22F',
                },
              ]}
              strokeCap={'butt'}
              />
      </ImageBackground>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {
    return (
        <ImageBackground
        style={styles.container}
        source={require('./src/components/img/sleeping-man.jpg')}
        imageStyle={{opacity: 0.5}}>
        <Text style={{color: 'white'}}>ProfileScreen</Text>
      </ImageBackground>  
      
    );
  }
}

class InventoryScreen extends React.Component {
  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('./src/components/img/grocery_bag.jpg')}
        imageStyle={{opacity: 0.5}}>
        <Text style={{color: 'white'}}>InventoryScreen</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
            <Icon name="person" size={25} />
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
