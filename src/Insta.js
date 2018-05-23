import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { createSwitchNavigator, TabNavigator } from 'react-navigation'
import { MainFeed, Login } from './components/screens';

 
const MainStack = createSwitchNavigator({
    main: MainFeed,
    login: Login
})

export default class Insta extends Component {
    render() {
        return <MainStack />
    }
}