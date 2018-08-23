/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-01 10:33:30 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-06 10:59:54
 */

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import config from '../config/index.js'
import Menu, { MenuItem } from 'react-native-material-menu';

export default class Post extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            liked: false,
            lastPress: 0,
            imgprofil: null,
            width: config.styleConstants.screenWidth,
            height: config.styleConstants.screenHeight / 3
        }
    }

    _menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    follow = () => {
        this._menu.hide();
    }

    unfollow = () => {
        this._menu.hide();
    }

    showMenu = () => {
        this._menu.show();
    };

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
        console.log(': '+this.props.navigation)
        const heartIconColor = (this.state.liked) ? 'rgb(252,61,57)' : null
        Image.getSize(this.props.item.body[0], (width, height) => {
            const newHeight = height / (width / this.state.width)
            this.setState({
                height: newHeight
            });
        })
        return (
            <View style={{ paddingTop: 10, backgroundColor: 'white' }} >
                {/* user bar (icon, username,config button */}
                < View style={styles.userBar} >
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Details');
                    }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Image
                                style={styles.userPicture}
                                source={{ uri: this.state.imgprofil }}
                            />
                            <Text>{this.props.item.author}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.menu}>
                        <Menu
                            style={{ width: 30 + '%' }}
                            ref={this.setMenuRef}
                            button={
                                <TouchableOpacity onPress={this.showMenu} >
                                    <Image
                                        style={styles.plusIcon}
                                        source={config.images.plusB}
                                    />
                                </TouchableOpacity>}
                        >
                            <MenuItem onPress={this.follow} textStyle={{ fontSize: 14 }}>Follow</MenuItem>
                            <MenuItem onPress={this.unfollow} textStyle={{ fontSize: 14 }} >Unfollow</MenuItem>
                        </Menu>

                    </View>

                </View >
                {/* images display */}
                < TouchableOpacity onLongPress={() => { this.likeToggle() }
                } >
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
                    <View style={styles.footer} >
                        <Text> {this.props.item.net_votes} J’aime</Text>
                        <Image style={[styles.icon, { height: 25, width: 25 }]} source={config.images.upArrow} />
                        <Text> {this.props.item.pending_payout_value} </Text>
                    </View >
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
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    plusIcon: {
        height: 25,
        width: 25,
        borderRadius: 20,
        marginRight: 8
    },
    menu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})