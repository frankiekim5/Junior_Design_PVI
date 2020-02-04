import React from 'react'
import {StyleSheet, ImageBackground, Text} from 'react-native'
import background from '../../img/grocery_bag.jpg'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

const InventoryScreen = () => {
    return (
    <ImageBackground
        style={styles.container}
        source={background}
        imageStyle={{opacity: 0.5}}>
        <Text style={{color: 'white'}}>InventoryScreen</Text>
    </ImageBackground>
    );
}

export default InventoryScreen