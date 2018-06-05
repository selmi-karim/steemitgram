/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-01 10:33:30 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-05 13:17:41
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import config from '../config/index.js'
export default class Post extends Component {
    constructor() {
        super();
        this.state = {
            screenWidth: Dimensions.get('window').width,
            screenHeight: Dimensions.get('window').height,
            liked: false,
            lastPress: 0
        }
    }
    // function picture like 
    likeToggle() {
        this.setState({
            liked: !this.state.liked
        })
    };

    /**Double press function- not used yet */
    onDoublePress = () => {
        const time = new Date().getTime();
        const delta = time - this.lastPress;

        const DOUBLE_PRESS_DELAY = 400;
        if (delta < DOUBLE_PRESS_DELAY) {
            // Success double press
            alert.alert('double click :D ')

        }
        this.lastPress = time;
    };

    /*
    * we receive randomly data from postfeed (props) 
    * with params: firstname, lastname, profile-picture and #take-picture#,  
    *
    */

    render() {
        //console.log('item: '+JSON.stringify(this.props.item))
        const heartIconColor = (this.state.liked) ? 'rgb(252,61,57)' : null
        var imageSelection = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtRhS0il0UU65L4prJy0ZtbBP5iVWQQB7JyYYL4dtM9Q2BJ3yLQ';
        return (
            <View >
                {/* user bar (icon, username,config button */}
                <View style={styles.userBar} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Image
                            style={styles.userPicture}
                            source={{ uri: this.props.item.picture.thumbnail }}
                        />
                        <Text>{this.props.item.name.first}</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 32 }}>...</Text>
                    </View>

                </View>
                {/* images display */}
                <TouchableOpacity onLongPress={() => { this.likeToggle() }} >
                    <Image
                        style={{ width: this.state.screenWidth, height: this.state.screenHeight / 1.9, resizeMode: Image.resizeMode.contain }}
                        source={{ uri: imageSelection }}
                    />
                </TouchableOpacity>

                {/* footer msg,like,next buttons */}
                <View style={styles.iconBar} >
                    <TouchableOpacity onPress={() => { this.likeToggle() }} >
                        <Image style={[styles.icon, { tintColor: heartIconColor }]} source={config.images.heartIcon} />
                    </TouchableOpacity>

                    <Image style={styles.icon} source={config.images.bubbleIcon} />
                    <Image style={styles.icon} source={config.images.arrowIcon} />

                </View>

                {/* comments */}
                <View style={styles.commentBar} >
                    <Image style={[styles.icon, { height: 25, width: 25 }]} source={config.images.blackHeartIcon} />
                    <Text>128 Likes</Text>
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    userBar: {
        width: 100 + '%',
        height: config.styleConstants.rowHeight,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    userPicture: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginRight: 5,
    },
    iconBar: {
        height: config.styleConstants.rowHeight,
        width: 100 + '%',
        borderBottomColor: '#fff',
        borderTopColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        height: 40,
        width: 40,
        marginLeft: 5,
    },
    commentBar: {
        width: 100 + '%',
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
    }
})