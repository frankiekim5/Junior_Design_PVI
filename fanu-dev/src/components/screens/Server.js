import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native'
import { RawButton } from 'react-native-gesture-handler';

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw = "'username':'kmont3',\n'accessToken':\"FTUvovkWVzI82BkTaQbISKU1J3OeSE2h1rrN3MbvOxZmH8C4qMrBtWVgwloNumdtIozzkpYIZJoozEllNVXNJcDid3ymCHjIKR7iKNCeTcrdxbxesTXGrZ0dRfuGHL6xLzQWJNJUz7vroirTpvzRciNGazRkzYs4s4ovG9ptj9e7GJhoTTYbbCQsJJYqrjVpANAQ3nkr1BA8Rek8Z0tuWvsa0jZEAqAVrsIdzD9hSsz6GwNQcNjTSwuKQF4xtTr FTUvovkWVzI82BkTaQbISKU1J3OeSE2h1rrN3MbvOxZmH8C4qMrBtWVgwloNumdtIozzkpYIZJoozEllNVXNJcDid3ymCHjIKR7iKNCeTcrdxbxesTXGrZ0dRfuGHL6xLzQWJNJUz7vroirTpvzRciNGazRkzYs4s4ovG9ptj9e7GJhoTTYbbCQsJJYqrjVpANAQ3nkr1BA8Rek8Z0tuWvsa0jZEAqAVrsIdzD9hSsz6GwNQcNjTSwuKQF4xtTr\"\n";
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

export default class Server extends Component {
  constructor() {
    super();
    this.state = {
      isLoading:true,
      dataSource: []
    }
  }

  

  componentDidMount() {
    fetch('http://localhost:8080/inventory', requestOptions).then((response) => response.json())
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