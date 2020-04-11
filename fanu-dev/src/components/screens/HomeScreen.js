import React from 'react'
import {StyleSheet, ImageBackground, Text, View} from 'react-native'
import background from '../../img/market-seller-sale-shop.jpg'
import FloatingButton from './FloatingButton'
import {Component} from 'react';


export default class Server extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username:this.props.navigation.dangerouslyGetParent().getParam('username'),
      };
    }

        render() {
                return (
    <ImageBackground
        style={styles.container}
        source={background}
        imageStyle={{opacity: 0.5}}>
        <Text style={{color: 'black', fontSize:30}}>Hello {this.state.username},</Text>
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
})

// const HomeScreen = () => {
//     return (
//     <ImageBackground
//         style={styles.container}
//         source={background}
//         imageStyle={{opacity: 0.5}}>
//         <Text style={{color: 'black', fontSize:30}}>Hello user,</Text>
//         <Text>this.props.navigation.dangerouslyGetParent().getParam('username')</Text>
//     </ImageBackground>
//     );
// }


//export default HomeScreen