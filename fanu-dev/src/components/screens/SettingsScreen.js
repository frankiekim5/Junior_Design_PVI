import React from 'react'
import {StyleSheet, ImageBackground, Text, Button, View, Alert} from 'react-native'
import background from '../../img/sleeping-man.jpg'
// import 


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop:100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        
        marginTop:200,
        paddingBottom:20,
        fontSize:200
        
        
        //property
        // position: 'absolute',
        // top: 40,
        // left: 40
      }
});


const SettingsScreen = () => {
    return (
        
        <View>
            <View style={styles.buttonContainer}>
            <Button style={styles.buttonContainer}
            color="#f2be2e"
          title="Change Password"
          onPress={() => Alert.alert('Button pressed')}
        /></View>
        <View>
        <Button color="#f2be2e"
          title="Change Email"
          onPress={() => Alert.alert('Button pressed')}
        />
        </View>
        
            
            
        
      </View>
    // <ImageBackground
    //     style={styles.container}
    //     source={background}
    //     imageStyle={{opacity: 0.5}}>
    //     <Text style={{color: 'white'}, {fontSize:20}}>Settings</Text>
    // </ImageBackground>
    );
}


export default SettingsScreen