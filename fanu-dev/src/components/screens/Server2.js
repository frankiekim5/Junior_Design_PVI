import React, {Component} from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native'

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = "'username':'FirstLast',\n'accessToken':\"w1hwVSEOh8j2zCUqnTWbOkvFRzDSnVMKNeQsx3Yqa06QcT8tJ8cPtdeBybW4mhpmEcTy0zhBgKc3BSrCgYnc7vu1mYcXefZpFWY0xfTUw9YbdhxGbmdeCpRrClnBlNqaXYnTTq6SInAmTO2G60kVclm2quuyTxTmCOJrHyUKNzwjQeOv6cVAs8bOPstSux3GQc9JEWYzktisfNBkCv1KQbYzC0kyvEXN0FONRIx5shVA3BfWCA2Kq35kY6jIaAG\"\n";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("127.0.0.1:8080/inventory", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));