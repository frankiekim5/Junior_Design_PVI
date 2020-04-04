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

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
myHeaders.append("Accept", "application/json");


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
     handleFirstName = (text) => {
      this.setState({firstName: text})
   }

      handleLastName = (text) => {
       this.setState({lastName: text})
   }

   handleUsername = (text) => {
      this.setState({username: text})
  }


     register = (email, pass) => {
         var raw = "action=register&username=" + this.state.username + "&password=" + this.state.password + "&fName=" 
            + this.state.firstName+ "&lName=" + this.state.lastName + "&email=" + email
         var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
        
         };
         //will have to put fetch call here .. 
         //handle with submit button
         fetch('http://192.168.1.20:5000/login', requestOptions)
         .then((responseJson) => {
         this.setState({
            dataSource: responseJson
         })
         })
         

        alert('email: ' + email + ' password: ' + pass)
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
                 placeholder = "Username"
                 placeholderTextColor = "#000000"
                 autoCapitalize = "none"
                 underlineColorAndroid = "#808080"
                 onChangeText = {this.handleUsername}/>
              
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
                    () => this.register(this.state.email, this.state.password)
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