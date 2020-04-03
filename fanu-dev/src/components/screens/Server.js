import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { RawButton } from 'react-native-gesture-handler';
import fetch from "node-fetch"
import foodPic from '../../img/food.jpg';



var requestOptions = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  body: "username=kmont3&accessToken=KOwe0useac9anwOKei93UPFtscOPS0EvU5uQCIDE6x1IB1WPPn0zpP6UC8ShHJwqwldaOM18knJAS9ZIelKihH3PTPuvmc7txBUFgCoVpXEk7GpdKW7MQGGjjZHyMQmhQoQyH022uJdR5PpkaYlKmT40SZhuAf0SrIAnNWUFosPfQbcrrYMFhDdGo9Bg67Ibc3EEnMsOE8m3C4sMNEEmeEdJmD0MHK0rkXSfiMJSTxQWYPl5dOrjU8CunULSnq0"
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
    fetch('http://192.168.1.74:8080/inventory', requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading:false,
        dataSource: responseJson
      })
    }).catch((error) => {
      console.error(error)
    });
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => alert(item.amount)}>
      <View style={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
        <Image style={{width: 80, height: 80, margin: 5}} source={foodPic} />
        <View style = {{flex:1, justifyContent:'center', marginLeft:5}}>
          <Text style={{fontSize:35, color:'#3969d2', marginBottom:3}}>
            {item.name}
          </Text>
          <Text style={{fontSize:16, color:'black'}}>
            Amount: {item.amount}
          </Text>
          <Text style={{color:'black'}}>
            Store: {item.store}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  renderSeparator = () => {
    return (
      <View
        style={{height:1,width:'100%',backgroundColor:'black'}}>
      </View>
    )
  }

  render() {
    if(this.state.isLoading) {
      return(
        <View style= {styles.container}>
          <ActivityIndicator size="large" animating />
        </View>
      )
    }else {
      //var myArray = this.state.dataSource.foods;
      return (
        <View style= {styles.container}>
          <Text>Status: {this.state.dataSource.status}</Text>
          <FlatList data={this.state.dataSource.foods}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      )
    }
    
  }

  
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:'#F5FCFF',
  },
  item: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor:'#eee'
  }
});