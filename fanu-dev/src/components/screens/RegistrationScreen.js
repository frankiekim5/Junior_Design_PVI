import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  TextInput
} from 'react-native';

import FloatingButton from './FloatingButton'


class RegistrationScreen extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        username:''
     }
     handleEmail = (text) => {
        this.setState({ email: text })
     }
     handlePassword = (text) => {
        this.setState({ password: text })
     }
     login = (email, pass) => {
        alert('email: ' + email + ' password: ' + pass)
     }
     handleFirstName = (text) => {
        this.setState({firstName: text})
     }

     handleLastName = (text) => {
      this.setState({lastName: text})
   }

     render() {
        return (
           <View style = {styles.container}>
               <TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                 placeholder = "First Name"
                 placeholderTextColor = "#000000"
                 autoCapitalize = "none"
                 underlineColorAndroid = "#808080"
                 onChangeText = {this.handleFirstName}/>
                 

<TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                 placeholder = "Last Name"
                 placeholderTextColor = "#000000"
                 autoCapitalize = "none"
                 underlineColorAndroid = "#808080"
                 onChangeText = {this.handleLastName}/> 

              <TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                 placeholder = "Email"
                 placeholderTextColor = "#000000"
                 autoCapitalize = "none"
                 underlineColorAndroid = "#808080"
                 onChangeText = {this.handleEmail}/>
              
              <TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                 placeholder = "Password"
                 placeholderTextColor = "#000000"
                 autoCapitalize = "none"
                 underlineColorAndroid = "#808080"
                 onChangeText = {this.handlePassword}/>

                <TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                 placeholder = "Confirm Password"
                 placeholderTextColor = "#000000"
                 autoCapitalize = "none"
                 underlineColorAndroid = "#808080"
                 onChangeText = {this.handlePassword}/> 


                
              
              <TouchableOpacity
                 style = {styles.submitButton}
                 onPress = {
                    () => this.login(this.state.email, this.state.password)
                 }>
                 <Text style = {styles.submitButtonText}> Submit </Text>
              </TouchableOpacity>
           </View>
        )
     }
}

  
  export default RegistrationScreen;

  const styles = StyleSheet.create({
  
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#03cafc",
    },
    item: {
      width: '100%',
      paddingVertical: 15,
      padding: 20,
    },
    header: {
      backgroundColor: '#eee',
      paddingVertical: 6,
      padding: 8,
    },
    submitButton: { 
      backgroundColor: "#eeeeee"

    }
    
  });