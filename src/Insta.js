/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-05-07 10:31:50 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-05 14:23:05
 */

import React, { Component } from 'react';
import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import { MainFeed, Login, Profile, CameraEx, Search, Favorite } from './components/screens';

const Tabs = createBottomTabNavigator({
    search: Search,
    feed: MainFeed,
    camera: CameraEx,
    favorite: Favorite,
    profile: Profile
}
    , {
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