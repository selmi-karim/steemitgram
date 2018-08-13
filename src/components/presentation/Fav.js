/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-05 12:20:29 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-05 12:28:03
 */

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import config from '../config/index.js'
export default class Fav extends PureComponent {
    constructor() {
        super();
        this.state = {
            liked: false,
            lastPress: 0,
            imgprofil: null,
            width: config.styleConstants.screenWidth,
            height: config.styleConstants.screenHeight / 3
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


    async componentDidMount() {
        const username = this.props.item.author
        this.setState({
            imgprofil: `https://steemitimages.com/u/${username}/avatar`,
        });
    }

    /*
    * we receive randomly data from postfeed (props) 
    * with params: firstname, lastname, profile-picture and #take-picture#,  
    */
    render() {
        const heartIconColor = (this.state.liked) ? 'rgb(252,61,57)' : null
        Image.getSize(this.props.item.body[0], (width, height) => {
            const newHeight = height / (width / this.state.width)
            this.setState({
                height: newHeight
            });
        })
        return (
            <View >
                {/* user bar (icon, username,config button */}
                < View style={styles.userBar} >
                    <TouchableOpacity onPress={() => { Alert.alert('redirection to profile') }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Image
                                style={styles.userPicture}
                                source={{ uri: this.state.imgprofil }}
                            />
                            <Text>{this.props.item.author}</Text>
                        </View>
                    </TouchableOpacity>
                    <View >
                        <TouchableOpacity onPress={() => { Alert.alert('soo: block,unfollow..') }} style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }} >
                            <Image
                                style={styles.plusIcon}
                                source={config.images.plusB}
                            />
                        </TouchableOpacity>
                    </View>

                </View >
                {/* images display */}
                < TouchableOpacity onLongPress={() => { this.likeToggle() }} >
                    <Image
                        style={{ width: this.state.width, height: this.state.height, resizeMode: Image.resizeMode.contain }}
                        source={{ uri: this.props.item.body[0] }}
                    />

                </TouchableOpacity >

                {/* footer msg,like,next buttons */}
                < View style={styles.iconBar} >
                    <TouchableOpacity onPress={() => { this.likeToggle() }} >
                        <Image style={[styles.icon, { tintColor: heartIconColor }]} source={config.images.heartIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Alert.alert('soon: add comments') }} >
                        <Image style={[styles.icon, { height: 35, width: 35 }]} source={config.images.bubbleIcon} />
                    </TouchableOpacity>
                </View >

                {/* comments */}
                < View style={styles.footer} >
                    <Text> {this.props.item.net_votes} J’aime</Text>
                    <Image style={[styles.icon, { height: 25, width: 25 }]} source={config.images.upArrow} />
                    <Text> {this.props.item.pending_payout_value} </Text>
                </View >
            </View >

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
    }, 
    plusIcon: {
        height: 25,
        width: 25,
        borderRadius: 20,
        marginRight: 8
    }
})