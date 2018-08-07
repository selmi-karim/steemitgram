import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import SteemConnect from 'react-native-steem-signin'

export default class App extends Component {

  _signIn(auth) {
    Alert.alert('Auth data: ' + auth);
  }

  render() {
    return (
      <SteemConnect
        onLoggedIn={(auth) => this._signIn(auth)}
        btnWidth={180}
        btnHeight={80}
        fontFamily={'System'}
      />
    );
 
  }
}