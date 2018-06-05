/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-01 10:33:17 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-05 12:28:46
 */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import config from '../config/index'
import {FavFeed} from './../container'

export default class Favorite extends Component {  
    
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={config.images.fav}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
    };

    render() {
            return(
                <View style={{paddingTop:40}}> 
                    <FavFeed />
                </View>
            )
        } 
}


const styles = StyleSheet.create({
    icon: {
      width: 26,
      height: 26,
    },
});
