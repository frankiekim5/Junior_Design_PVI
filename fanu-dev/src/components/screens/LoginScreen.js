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

//var raw = "'username':'FirstLast',\n'accessToken':\"w1hwVSEOh8j2zCUqnTWbOkvFRzDSnVMKNeQsx3Yqa06QcT8tJ8cPtdeBybW4mhpmEcTy0zhBgKc3BSrCgYnc7vu1mYcXefZpFWY0xfTUw9YbdhxGbmdeCpRrClnBlNqaXYnTTq6SInAmTO2G60kVclm2quuyTxTmCOJrHyUKNzwjQeOv6cVAs8bOPstSux3GQc9JEWYzktisfNBkCv1KQbYzC0kyvEXN0FONRIx5shVA3BfWCA2Kq35kY6jIaAG\"\n";
// var raw = "action=login&username=FirstLast&password=123456"

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   //redirect: 'follow'
// };



class LoginScreen extends Component {

  // constructor(){
  //   super();

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
        var raw = "action=login&username=FirstLast&password=123456"
        //var raw = "action=login&username=" + username
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          
        };
        //will have to put fetch call here .. 
        //or handle with submit button
        fetch('http://192.168.1.20:5000/login', requestOptions).then((response) => response.json())
        //.then((responseJson) => {(console.log(responseJson))
      
        alert('email: ' + email + ' password: ' + pass)
     }
    
   

     render() {
        return (
           <View style = {styles.container}>
               <TextInput style = {styles.input}
                 underlineColorAndroid = "transparent"
                 placeholder = "Username"
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



                
              
               <TouchableOpacity
                 style = {styles.submitButton}
                 onPress = {
                    () => this.login(this.state.email, this.state.password)
                 }>
                 <Text style = {styles.submitButtonText}> Submit </Text>
              </TouchableOpacity>

              <Text></Text>
              <Text>New user? Reigster</Text>


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
  input:{
  },
  submitButton:{
    backgroundColor: "#eeeeee",
    //alignSelf: 'stretch',
    alignItems: 'center',
    //padding:15,


  },
  });