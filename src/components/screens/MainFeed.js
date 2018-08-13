/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-05-22 10:32:36 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-05 14:49:15
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import config from './../config/index'
import { PostFeed } from './../container'
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
                <PostFeed />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    barIcon: {
        width: 26,
        height: 26,
    },
})