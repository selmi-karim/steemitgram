import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import config from '../config/index'
export default class Profile extends Component {  
    
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={config.images.profile}
            style={[styles.barIcon, {tintColor: tintColor}]}
          />
        ),
    };

    render() {
            return( 
                <Text> Profile Page </Text>
            )
        } 
}


const styles = StyleSheet.create({
    barIcon: {
      width: 26,
      height: 26,
    },
});
