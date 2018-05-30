import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import { MainFeed, Login, Profile, CameraEx, Search, Favorite  } from './components/screens';

const Tabs = createBottomTabNavigator({
        feed: MainFeed,
        search: Search,
        camera: CameraEx,
        favorite: Favorite,
        profile: Profile
    }
    ,{
        tabBarOptions: {
            showLabel: false,
            showIcon: true
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