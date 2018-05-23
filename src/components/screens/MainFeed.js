import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import config from './../config/index'
import {PostFeed} from './../container'

export default class Insta extends Component {      
    render() {
            return(
                <View style={{ flex:1,width:100+'%',height:100+'%' }}>
                    {/* header: app name,dimension */}
                    <View 
                        style={styles.tempNav} >
                        <Text style={{ fontSize:20 }}>SteemitGramm </Text>

                    </View>
                <PostFeed />    
                </View>
            )
        }
}

const styles = StyleSheet.create({
    tempNav: {
        width:100+'%',
        height:45  , 
        backgroundColor:'#e3e4e5',
        borderBottomColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 20
    }
})