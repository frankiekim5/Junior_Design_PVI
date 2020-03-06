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


class RegistrationScreen extends Component {
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
                 placeholder = "First Name"
                 placeholderTextColor = "#9a73ef"
                 autoCapitalize = "none"
                 onChangeText = {this.handlePassword}/> 

<TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                 placeholder = "Last Name"
                 placeholderTextColor = "#9a73ef"
                 autoCapitalize = "none"
                 onChangeText = {this.handlePassword}/> 

              <TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                 placeholder = "Email"
                 placeholderTextColor = "#9a73ef"
                 autoCapitalize = "none"
                 onChangeText = {this.handleEmail}/>
              
              <TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                 placeholder = "Password"
                 placeholderTextColor = "#9a73ef"
                 autoCapitalize = "none"
                 onChangeText = {this.handlePassword}/>

                <TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                 placeholder = "Confirm Password"
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

  
  export default RegistrationScreen;

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