/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-01 10:33:17 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-05 12:28:46
 */

import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import config from './../config/index'
import { FavFeed, UserDetails } from './../container'
import { FavHeader } from './../presentation'

export default class Favorite extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={config.images.notif}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
    };

    render() {
        return (
            <View style={{ flex: 1, width: 100 + '%', height: 100 + '%' }}>
                {/* header: app name,dimension */}
                <FavHeader />
                {/* home page with some posts (randomly posts)*/}
                <MainNavigator />
            </View>
        )
    }
}


const MainNavigator = createStackNavigator({
    PostFeed: { screen: FavFeed },
    Details: { screen: UserDetails },

}, {
        headerMode: 'none',
        cardStyle: {
            backgroundColor: 'transparent',
        },
    });

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
});
