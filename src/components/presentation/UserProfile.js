/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-05-21 10:31:42 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-06 12:57:01
 */

import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import config from '../config/index'

export default class Profile extends Component {


    /**fake profile pictures */
    constructor() {
        super();
        this.state = {
            profilePics: [
                { id: 1, url: 'http://dtlon6z3v1kfl.cloudfront.net/wp-content/uploads/2017/01/22080908/Leo-Messi.jpg' },
            ],
            location: null,
            coverImage: null,
            imgprofil: null
        };

    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={config.images.profile}
                style={[styles.barIcon, { tintColor: tintColor }]}
            />
        ),
    }
    async componentDidMount() {
        const username = this.props.username
        await this.loadData(username);
        this.setState({
            imgprofil: `https://steemitimages.com/u/${username}/avatar`,
        });
    }


    /** we generate a fake data for home page */
    async getFollowCount(username) {
        const uri = "https://steemend.herokuapp.com/api/users/getFollowCount";
        const response = await fetch(
            `${uri}/${username}`
        );
        const jsondata = await response.json();
        return jsondata;
    }

    /** we generate a fake data for home page */
    async getUserProfile(username) {
        const uri = "https://steemend.herokuapp.com/api/users/profile";
        const response = await fetch(
            `${uri}/${username}`
        );
        const jsondata = await response.json();
        console.log('user: ' + JSON.stringify(jsondata))
        return jsondata;
    }

    async loadData(username) {
        const followCount = await this.getFollowCount(username);
        const user = await this.getUserProfile(username);
        this.setState({
            follower: followCount.follower_count,
            following: followCount.following_count,
            location: user.location,
            coverImage: user.cover_image
        });
    }



    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, width: 100 + '%', height: 100 + '%', paddingTop: 20 }}>
                    <View style={styles.profileInfo} >
                        <View style={{ flexDirection: 'row', width: 100 + '%' }} >
                            <View style={styles.userContainerPicture} >
                                <Image
                                    style={styles.userPicture}
                                    source={{ uri: this.state.imgprofil }}
                                />
                            </View>
                            <View style={{ flex: 7, height: 100 }} >
                                <View style={{ flexDirection: 'row', flex: 1 }} >
                                    <View style={styles.statCol}>
                                        <Text>30</Text>
                                        <Text>Posts</Text>
                                    </View>
                                    <View style={styles.statCol}>
                                        <Text>{this.state.follower}</Text>
                                        <Text>Followers</Text>
                                    </View>
                                    <View style={styles.statCol}>
                                        <Text>{this.state.following}</Text>
                                        <Text>Following</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.editPro} onPress={() => { Alert.alert('soon: edit interface') }} >
                                    <View style={styles.editPro} >
                                        <Text>Edit Profile</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={styles.nameDisplay} >
                            <Text style={styles.fontSm} >{this.props.username}</Text>
                            <Text style={styles.fontBold} >{this.state.location}</Text>
                        </View>
                        <View></View>
                    </View>
                    <View style={styles.profilePicContainer} >
                        {this.state.profilePics.map((pic, i) => {
                            return (
                                <Image
                                    key={pic.id}
                                    style={styles.profilePicThumb}
                                    source={{ uri: pic.url }}
                                />
                            )
                        })}
                    </View>


                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    profilePicContainer: {
        width: 100 + '%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#efefef',
    },
    barIcon: {
        width: 26,
        height: 26,
    },
    profilePicThumb: {
        width: config.styleConstants.oneThirdWidth,
        height: config.styleConstants.oneThirdWidth,
    },
    profileInfo: {
        width: 100 + '%',
        //height: config.styleConstants.screenHeight / 3,
        display: 'flex',
        flexDirection: 'column',
        //backgroundColor: '#655655',
        paddingVertical: 20
    },
    fontSm: {
        fontSize: 16,
        paddingLeft: 20

    },
    fontBold: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 20

    },
    userContainerPicture: {
        flex: 3,
        height: 100,
        //backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userPicture: {
        height: 80,
        borderRadius: 40,
        width: 80
    },
    statCol: {
        flexDirection: 'column',
        flex: 1
    },
    editPro: {
        width: 100 + '%',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef',
        borderRadius: 5,
    },
    nameDisplay: {
        flexDirection: 'column',
        width: 100 + '%',
        //backgroundColor: 'yellow',
    }
});
