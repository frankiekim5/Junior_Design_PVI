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

// const RegistrationScreen = () => {
//     return (
//       <View>
//           <Text>hello</Text>
        
        
//       </View>
      
//     );
//   };


class LoginScreen extends Component {
    state = {
        email: '',
        password: ''
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
     render() {
        return (
           <View style = {styles.container}>
               <TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                 placeholder = "Username"
                 placeholderTextColor = "#9a73ef"
                 autoCapitalize = "none"
                 underlineColorAndroid = "#808080"
                 onChangeText = {this.handlePassword}/>
                 
              
              <TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                 placeholder = "Password"
                 placeholderTextColor = "#9a73ef"
                 autoCapitalize = "none"
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

  
  export default LoginScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
  });