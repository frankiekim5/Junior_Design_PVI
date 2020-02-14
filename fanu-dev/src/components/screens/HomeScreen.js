import React from 'react'
import {StyleSheet, ImageBackground, Text} from 'react-native'
import background from '../../img/market-seller-sale-shop.jpg'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const HomeScreen = () => {
    return (
    <ImageBackground
        style={styles.container}
        source={background}
        imageStyle={{opacity: 0.5}}>
        <Text style={{color: 'white'}}>HomeScreen</Text>
    </ImageBackground>
    );
}


export default HomeScreen