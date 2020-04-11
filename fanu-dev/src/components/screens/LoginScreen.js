import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import FloatingButton from './FloatingButton';
//import TabScreen from './TabScreen';

import FloatingButton from './FloatingButton'
import TabScreen from './TabScreen'


var myHeaders = new Headers();
myHeaders.append(
  'Content-Type',
  'application/x-www-form-urlencoded;charset=UTF-8',
);
myHeaders.append('Accept', 'application/json');

//var raw = "'username':'FirstLast',\n'accessToken':\"w1hwVSEOh8j2zCUqnTWbOkvFRzDSnVMKNeQsx3Yqa06QcT8tJ8cPtdeBybW4mhpmEcTy0zhBgKc3BSrCgYnc7vu1mYcXefZpFWY0xfTUw9YbdhxGbmdeCpRrClnBlNqaXYnTTq6SInAmTO2G60kVclm2quuyTxTmCOJrHyUKNzwjQeOv6cVAs8bOPstSux3GQc9JEWYzktisfNBkCv1KQbYzC0kyvEXN0FONRIx5shVA3BfWCA2Kq35kY6jIaAG\"\n";

class LoginScreen extends Component {
  // constructor(){
  //   super();

  constructor() {
    super();
    this.state = {
      isLoading: true,
      dataSource: [],
      username: '',
      password: '',
      accessToken: '',
    };
  }
  
 

  // state = {
  //     username: '',
  //     password: '',
  //     dataSource:[],
  //     isLoading = true
  //  }
  handleUsername = text => {
    this.setState({username: text});
  };
  handlePassword = text => {
    this.setState({password: text});
  };
  login = (user, pass) => {
    var raw =
      'action=login&username=' +
      this.state.username +
      '&password=' +
      this.state.password;
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    //will have to put fetch call here ..
    //handle with submit button
    //FIXME: change IP and/or port
    fetch('http://192.168.1.20:5000/login', requestOptions)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('hello', data.status);
        this.setState({
          dataSource: data,
          isLoading: false,
          accessToken: this.state.dataSource.accessToken,
          username: user,

        });
        if (this.state.dataSource.status == 'Login success') {
          //this.state.dataSource.accessToken
          alert('Login successful!');
          this.props.navigation.navigate(
            'TabScreen',
            {accessToken: this.state.accessToken,
            username: this.state.username},
          );
          
          //FIXME:
        } else {
          alert('Login failed. Please try again.');
        }
      });

    var success = 'Login success';
  };

  /* if ("Login success" == this.state.dataSource.status) {
            alert('Login successful!')

         }
         else {
           //either call spurriously failed, OR unsuccesful login (wrong user/password)
           alert('Status: ' + this.state.dataSource.status)
         } */

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Username"
          placeholderTextColor="#000000"
          autoCapitalize="none"
          //underlineColorAndroid="#808080"
          onChangeText={this.handleUsername}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#000000"
          autoCapitalize="none"
          //underlineColorAndroid="#808080"
          onChangeText={this.handlePassword}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.username, this.state.password)}>
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>

        <Text />
        <Text>New user? Reigster</Text>
      </View>
    );
  }
}


export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03cafc',
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
  input: {},
  submitButton: {
    backgroundColor: '#eeeeee',
    //alignSelf: 'stretch',
    alignItems: 'center',
    //padding:15,
  },

});

