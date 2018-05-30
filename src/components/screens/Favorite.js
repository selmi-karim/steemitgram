import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import config from '../config/index'
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
                <Text> fav Page </Text>
            )
        } 
}


const styles = StyleSheet.create({
    icon: {
      width: 26,
      height: 26,
    },
});
