import React from 'react'
import {
    StyleSheet,
    ImageBackground,
    Text,
    View,
    SectionList
} from 'react-native'
import background from '../../img/grocery_bag.jpg'

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

const Item = ({ title }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}


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
        padding: 8
    }
});

const InventoryScreen = () => {
    return (
    <>
        <ImageBackground
            style={styles.container}
            source={background}
            imageStyle={{opacity: 0.5}}>
            <Text style={{color: 'white'}}>InventoryScreen</Text>
        </ImageBackground>
        <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item title={item} />}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
            )}
        />
    </>
    );
}

export default InventoryScreen