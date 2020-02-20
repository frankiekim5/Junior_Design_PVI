import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
} from 'react-native';
import background from '../../img/grocery_bag.jpg';
import FloatingButton from './FloatingButton'

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const Item = ({title}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

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

const InventoryScreen = () => {
  return (
    <View>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item title={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
      <FloatingButton style={{ bottom:50, left:325 }}/>
    </View>
    
  );
};

export default InventoryScreen;
