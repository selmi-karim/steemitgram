/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-05-22 10:32:36 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-05 14:49:15
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import config from './../config/index'
import { PostFeed, UserDetails } from './../container'
import { PostHeader } from './../presentation'

export default class MainFeed extends Component {


    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={config.images.accueil}
                style={[styles.barIcon, { tintColor: tintColor }]}
            />
        ),
    };

    render() {
        return (
            <View style={{ flex: 1, width: 100 + '%', height: 100 + '%' }}>
                {/* header: app name,dimension */}
                <PostHeader />
                {/* home page with some posts (randomly posts)*/}
                <MainNavigator />
            </View>
        )
    }
}

const MainNavigator = createStackNavigator({
    PostFeed: { screen: PostFeed },
    Details: { screen: UserDetails },

}, {
        headerMode: 'none',
        cardStyle: {
            backgroundColor: 'transparent',
        },
    });


const styles = StyleSheet.create({
    barIcon: {
        width: 26,
        height: 26,
    },
})