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
import fetch from 'node-fetch';
import foodPic from '../../img/food.jpg';
import FloatingButton from './FloatingButton';
import LoginScreen from './LoginScreen';

// var requestOptions = {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//   },
//   /**FIXME: username and accessToken*/
//   body: 'action=login&username=' + {username} + '&accessToken=' + {accessToken},
// };

//fetch('http://192.168.1.20:5000/inventory', requestOptions)

var myHeaders = new Headers();
myHeaders.append(
  'Content-Type',
  'application/x-www-form-urlencoded;charset=UTF-8',
);
myHeaders.append('Accept', 'application/json');

export default class Server extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      username: '',
      accessToken: '',
      username: this.props.navigation.dangerouslyGetParent().getParam('username'),
      accessToken: this.props.navigation.dangerouslyGetParent().getParam('accessToken'),
    };
  }



  componentDidMount() {
    /** FIXME: check IP address and port for server*/
    var raw =
      'action=login&username=' +
      this.state.username +
      '&accessToken=' +
      this.state.accessToken;
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    fetch('http://192.168.1.20:5000/inventory', requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          //username: navigation.getParam('username','NO-USER'),
          //accessToken: navigation.getParam('accessToken','NO-AT'),
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  _renderItem = ({item}) => (
    <TouchableOpacity onPress={() => alert(item.amount)}>
      <View style={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
        <Image style={{width: 80, height: 80, margin: 5}} source={foodPic} />
        <View style={{flex: 1, justifyContent: 'center', marginLeft: 5}}>
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
    if (this.state.isLoading) {
      return (
        <View style= {styles.container}>
          <ActivityIndicator size="large" animating />
        </View>
      );
    } else {
      //var myArray = this.state.dataSource.foods;
      return (
        <View style={styles.container}>
          <Text>Status: {this.state.dataSource.status}</Text>
          <FlatList
            data={this.state.dataSource.foods}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
          <FloatingButton style={{marginBottom: 80, marginLeft: 300}} />
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