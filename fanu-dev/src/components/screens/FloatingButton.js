import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class FloatingButton extends React.Component {
  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;
    Animated.spring(this.animation, {
      toValue,
      friction: 5,
    }).start();
    this.open = !this.open;
  };
  render() {
    const pinStyle = {
      transform: [
        {scale: this.animation},
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80],
          }),
        },
      ],
    };

    const thumbStyle = {
      transform: [
        {scale: this.animation},
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -148],
          }),
        },
      ],
    };

    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
          }),
        },
      ],
    };

    const opacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    });
    return (
      <View style={(styles.container, this.props.style)}>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[styles.button, styles.secondary, thumbStyle, opacity]}>
            <Icon name="delete" size={30} color="#F02A4B" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View
            style={[styles.button, styles.secondary, pinStyle, opacity]}>
            <Icon name="autorenew" size={30} color="#F02A4B" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <Icon name="edit" size={33} color="#FFF" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "right",
    position: "absolute",
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: '#F02A4B',
    shadowOpacity: 0.3,
    shadowOffset: {height: 10},
  },
  menu: {
    backgroundColor: '#F02A4B',
  },
  secondary: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
  },
});
