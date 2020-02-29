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
        },
        body: JSON.stringify({
          'username':'FirstLast',
          'accessToken':"w1hwVSEOh8j2zCUqnTWbOkvFRzDSnVMKNeQsx3Yqa06QcT8tJ8cPtdeBybW4mhpmEcTy0zhBgKc3BSrCgYnc7vu1mYcXefZpFWY0xfTUw9YbdhxGbmdeCpRrClnBlNqaXYnTTq6SInAmTO2G60kVclm2quuyTxTmCOJrHyUKNzwjQeOv6cVAs8bOPstSux3GQc9JEWYzktisfNBkCv1KQbYzC0kyvEXN0FONRIx5shVA3BfWCA2Kq35kY6jIaAG"

        })
        //body: JSON.stringify(params)
      });
      let responseJson = response.json()
      console.log('hello', 'Response.json: ${responseJson}')
      return responseJson.foods;
    } catch(error) {
        console.error('Error is: ${error}')
    }
}
export {getFoodsFromServer};