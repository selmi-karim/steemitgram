import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native'

export default class Profile extends Component {   
    static navigationOptions = {
        tabBarIcon: () => (
          <Image
            source={require('../../../assets/arrow.png')}
            style={CommonStyles.tabBarIcon}
          />
        )
    }
    render() {
            return( 
                <Text> Profile Page </Text>
            )
        } 
}
