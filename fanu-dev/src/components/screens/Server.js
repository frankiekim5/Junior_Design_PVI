import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native'
import { RawButton } from 'react-native-gesture-handler';

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw = "'username':'FirstLast',\n'accessToken':\"w1hwVSEOh8j2zCUqnTWbOkvFRzDSnVMKNeQsx3Yqa06QcT8tJ8cPtdeBybW4mhpmEcTy0zhBgKc3BSrCgYnc7vu1mYcXefZpFWY0xfTUw9YbdhxGbmdeCpRrClnBlNqaXYnTTq6SInAmTO2G60kVclm2quuyTxTmCOJrHyUKNzwjQeOv6cVAs8bOPstSux3GQc9JEWYzktisfNBkCv1KQbYzC0kyvEXN0FONRIx5shVA3BfWCA2Kq35kY6jIaAG\"\n";
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

// fetch("127.0.0.1:8080/inventory", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

export default class Server extends Component {
  constructor() {
    super();
    this.state = {
      isLoading:true,
      dataSource: []
    }
  }

  

  componentDidMount() {
    fetch('http://127.0.0.1:8080/inventory', requestOptions).then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading:false,
        dataSource: responseJson
      })
    })
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => alert(item.body)}>
      <View style={styles.item}>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
    
  );

  render() {
    if(this.state.isLoading) {
      return(
        <View style= {styles.container}>
          <ActivityIndicator size="large" animating />
        </View>
      )
    }else {
      return (
        <View style= {styles.container}>
          <FlatList
            data = {this.state.dataSource}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index}
          />
        </View>
      )
    }
    
  }

  
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  item: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor:'#eee'
  }
});