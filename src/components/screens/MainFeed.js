import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import config from './../config/index'
import {PostFeed} from './../container'

export default class MainFeed extends Component {      

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={config.images.accueil}
            style={[styles.barIcon, {tintColor: tintColor}]}
          />
        ),
    };

    render() {
            return( 
                <View style={{ flex:1,width:100+'%',height:100+'%' }}>
                    {/* header: app name,dimension */}
                    <View 
                        style={styles.tempNav} >
                        <Text styltouche={{ fontSize:20 }}>SteemitGramm </Text>

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
    },
    barIcon: {
        width: 26,
        height: 26,
    },
})