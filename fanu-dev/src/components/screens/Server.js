import React, {Component} from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native'
const apiGetAllFoods = '127.0.0.1:8080/inventory'

async function getFoodsFromServer() {
    try {
      let response = await fetch(apiGetAllFoods, {
        method: 'POST' ,
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
          'username':
          'token':
        },
        body: JSON.stringify(params)
      });
      let responseJson = await response.json()
      return responseJson.food;
    } catch(error) {
        console.error('Error is: ${error}')
    }
}
export {getFoodsFromServer};