import React from 'react';
import {StyleSheet, ImageBackground, Text, View} from 'react-native';
import background from '../../img/market-seller-sale-shop.jpg';
import FloatingButton from './FloatingButton';
import {username} from './LoginScreen.js'
import {Component} from 'react';

class HomeScreen extends Component {
    constructor(props) {
      super(props);
  
      var username = props.navigation.state.params.username;
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


const Home = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={background}
      imageStyle={{opacity: 0.5}}>
      <Text style={{color: 'black', fontSize: 30}}>
        Hello user {username}
      </Text>
    </ImageBackground>
  );
};

export default Home;
