import React, { Component } from 'react'
import { Alert, AsyncStorage } from 'react-native'
import SteemConnect from 'react-native-steem-signin'
import Insta from './src/Insta'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: false,
    }
  }

  /**
      *  Fetch the token from storage then navigate to our appropriate  place
      */
  _checkLogged = async () => {
    try {
      return await AsyncStorage.getItem('auth');
    } catch (e) {
      console.warn(e)
      return null
    }
  };

  _clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {

    }
  }


  componentDidMount() {
    //this._clearStorage();

    this._checkLogged().then((auth) => {
      // Checks if the current visitor is a logged in user.
      //console.log('au: '+auth)
      if (auth) {
        this.setState({
          logged: true,
        })
      }
    })
  }


  _signIn(auth) {
    this.setState({
      logged: true,
    })
  }


  render() {
    if (this.state.logged) {
      return (
        <Insta />
      );
    } else {
      return (
        <SteemConnect
          onLoggedIn={(auth) => this._signIn(auth)}
          btnWidth={180}
          btnHeight={80}
          fontFamily={'System'}
        />
      )
    }
  } 
}

