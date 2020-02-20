import React from 'react'
import {StyleSheet, ImageBackground, Text} from 'react-native'
import background from '../../img/sleeping-man.jpg'
// import 


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


const ProfileScreen = () => {
    return (
    <ImageBackground
        style={styles.container}
        source={background}
        imageStyle={{opacity: 0.5}}>
        <Text style={{color: 'white'}}>Settings</Text>
    </ImageBackground>
    );
}


export default ProfileScreen