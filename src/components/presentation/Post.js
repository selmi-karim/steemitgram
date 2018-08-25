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
            height: config.styleConstants.screenHeight / 3,
            votes: this.props.item.net_votes
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

        // TODO request post to steem
        if (this.state.liked) {
            this.setState({
                votes: this.state.votes - 1
            })
        } else {
            this.setState({
                votes: this.state.votes + 1
            })
        }
        this.setState({
            liked: !this.state.liked
        })
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
            <View style={{ paddingTop: 10, backgroundColor: 'white' }} >
                {/* user bar (icon, username,config button */}
                <View style={styles.userBar} >
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Details', { username: this.props.item.author });
                    }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }} >
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
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                    <Text style={{ fontWeight: 'bold' }} >@{this.props.item.title}  </Text>
                    <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }} >#{this.props.item.category}</Text>
                </View>
                {/* footer msg,like,next buttons */}
                < View style={styles.iconBar} >
                    <TouchableOpacity onPress={() => { this.likeToggle() }} >
                        <Image style={[styles.icon, { tintColor: heartIconColor }]} source={config.images.heartIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Alert.alert('soon: add comments') }} >
                        <Image style={[styles.icon, { height: 30, width: 30 }]} source={config.images.bubbleIcon} />
                    </TouchableOpacity>
                    <View style={styles.footer} >
                        <Text> {this.state.votes} J’aime</Text>
                        <Image style={[styles.icon, { height: 20, width: 20 }]} source={config.images.upArrow} />
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
        height: 35,
        width: 35,
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
        paddingRight: 5
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