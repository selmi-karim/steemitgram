/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-01 10:33:17 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-05 12:28:46
 */

import React, { PureComponent } from 'react';
import { View, Image, StyleSheet } from 'react-native'
import config from '../config/index'
import { UserProfile } from './../presentation'

export default class Favorite extends PureComponent {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={config.images.profile}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
    };

    render() {
        return (
            <View style={{ flex: 1, width: 100 + '%', height: 100 + '%' }}>
                <UserProfile />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
});
