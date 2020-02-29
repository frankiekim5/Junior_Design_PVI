import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
} from 'react-native';
import background from '../../img/grocery_bag.jpg';
import FloatingButton from './FloatingButton'
import { getFoodsFromServer } from './Server'

export default class BasicFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      foodsFromServer: []
    });
    }
  }
}