/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-05-21 10:31:42 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-06 12:57:01
 */

import React, { PureComponent } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking, FlatList } from 'react-native'
import config from '../config/index'
import { ImgProfile } from '../presentation';

export default class Profile extends PureComponent {


    /**fake profile pictures */
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            coverImage: null,
            imgprofil: null,
            username: this.props.username
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
        const username = this.state.username
        await this.loadData(username);
        this.setState({
            imgprofil: `https://steemitimages.com/u/${username}/avatar`,
        });
    }

    /**
     * 
     * @param {String} username 
     * return user follows count
     */
    async getFollowCount(username) {
        const uri = "https://steemend.herokuapp.com/api/users/getFollowCount";
        const response = await fetch(
            `${uri}/${username}`
        );
        const jsondata = await response.json();
        return jsondata;
    }
    /**
     * 
     * @param {String} username 
     * return user profile from steemend api
     */
    async getUserProfile(username) {
        const uri = "https://steemend.herokuapp.com/api/users/profile";
        const response = await fetch(
            `${uri}/${username}`
        );
        const jsondata = await response.json();
        return jsondata;
    }

    /**
     * 
     * @param {String} username 
     * return user posts from steemEnd api
     */
    async getUserPosts(username) {
        const uri = "https://steemend.herokuapp.com/api/users/getUserPosts";
        const response = await fetch(
            `${uri}/${username}`
        );
        const jsondata = await response.json();
        //console.log('user: ' + JSON.stringify(jsondata))
        return jsondata;
    }

    async loadData(username) {
        const followCount = await this.getFollowCount(username);
        const user = await this.getUserProfile(username);
        this.setState({
            follower: followCount.follower_count,
            following: followCount.following_count,
            location: user.location,
            website: user.website,
            posts: user.post_count,
            power: user.voting_power
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
                                <View style={styles.editPro} >
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }} >{this.state.username}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1 }} >
                                    <View style={styles.statCol}>
                                        <Text>{this.state.posts}</Text>
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


                            </View>
                        </View>

                        <View style={styles.info} >
                            <TouchableOpacity style={styles.clickbtn} onPress={() => { Linking.openURL('http://maps.google.co.in/maps?q=' + this.state.location) }} >
                                <Image style={styles.icon} source={config.images.location} />
                                <Text> {this.state.location} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.clickbtn} onPress={() => { Linking.openURL(this.state.website) }} >
                                <Image style={styles.icon} source={config.images.website} />
                                <Text> {this.state.website} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.clickbtn} onPress={() => { Alert.alert('Your vote power is ' + this.state.power) }} >
                                <Image style={styles.icon} source={config.images.power} />
                                <Text> {this.state.power} </Text>
                            </TouchableOpacity>

                        </View >
                    </View>
                    <ImgProfile username={this.state.username} />

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
        width: config.styleConstants.halfWidth,
        height: config.styleConstants.halfWidth,
    },
    profileInfo: {
        width: 100 + '%',
        //height: config.styleConstants.screenHeight / 3,
        display: 'flex',
        flexDirection: 'column',
        //backgroundColor: '#655655',
        paddingVertical: 20
    },
    fontBold: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 40

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
        width: 80,
        borderWidth: 2,
        borderColor: '#61c2e2',
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
    clickbtn: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 5

    },
    nameDisplay: {
        flexDirection: 'column',
        width: 100 + '%',
        paddingLeft: 20,
        //backgroundColor: 'yellow',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingLeft: 5
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 20
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 7
    }

});
