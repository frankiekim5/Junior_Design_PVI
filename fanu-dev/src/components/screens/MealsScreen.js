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
    title: 'Breakfast',
    data: ['Eggs w/ toast', 'Fruit', 'Smoothies'],
  },
  {
    title: 'Lunch',
    data: ['Salmon w/ spinach', 'Tofu salad'],
  },
  {
    title: 'Dinner',
    data: ['Chicken Alfredo', 'Chicken tacos'],
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

const MealsScreen = () => {
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
      
    </View>
    
  );
};

export default MealsScreen;