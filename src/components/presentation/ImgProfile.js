/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-07-15 10:33:30 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-06 10:59:54
 */

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import config from '../config/index.js'
export default class ImgProfile extends PureComponent {
    constructor() {
        super();
        this.state = {
            width: config.styleConstants.screenWidth,
            height: config.styleConstants.screenHeight / 3
        }
    }
    render() {
        Image.getSize(this.props.item.body[0], (width, height) => {
            const newHeight = height / (width / this.state.width)
            this.setState({
                height: newHeight
            });
        })
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image source={{ uri: this.props.item.body[0] }} 
                style={[styles.imageView, { height: this.state.height, width: this.state.width, resizeMode: Image.resizeMode.contain }]} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageView: {
        margin: 7,
        borderRadius: 7
    },
    textView: {
        width: '50%',
        textAlignVertical: 'center',
        padding: 10,
        color: '#000'
    }
})