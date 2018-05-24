import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import { MainFeed, Login, Profile, Camera } from './components/screens';

const Tabs = createBottomTabNavigator({
        feed: MainFeed,
        camera: Camera,
        profile: Profile
    }
    ,{
        tabBarOptions: {
            activeTintColor: '#e91e63',
            labelStyle: {
            fontSize: 23,
            },
            style: {
            backgroundColor: '#e3e4e5',
            },
        }
})

const MainStack = createSwitchNavigator({
    main: Tabs, 
    login: Login
})

export default class Insta extends Component {
    render() {
        return <MainStack />
    }
}