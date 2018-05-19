import React, { Component } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

export default class Insta extends Component {

        render() {
            return(
                <View style={{ flex:1 }}>
                    <Text> Homme </Text>
                    <Image 
                    style={{width: 100, height: 100, margin:20}}
                    source={{uri:'http://pngimg.com/uploads/penguin/pinguin_PNG15.png'}} 
                    />
                </View>
            )
        }
}