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

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={config.images.profile}
                style={[styles.barIcon, { tintColor: tintColor }]}
            />
        ),
    };

    /**fake profile pictures */
    constructor() {
        super();
        this.state = {
            profilePics: [{ id: 1, url: 'http://dtlon6z3v1kfl.cloudfront.net/wp-content/uploads/2017/01/22080908/Leo-Messi.jpg' },
            { id: 2, url: 'http://dtlon6z3v1kfl.cloudfront.net/wp-content/uploads/2017/01/22080908/Leo-Messi.jpg' },
            { id: 3, url: 'http://dtlon6z3v1kfl.cloudfront.net/wp-content/uploads/2017/01/22080908/Leo-Messi.jpg' },
            { id: 4, url: 'https://www.trollfootball.me/upload/full/2017/10/29/neymar-on-instagram-my-idol-is-my-friend-leo-messi.jpg' },
            { id: 5, url: 'https://i.pinimg.com/originals/49/da/be/49dabefa0f07cac3cd9aca3587396af7.jpg' },
            { id: 6, url: 'https://images.complex.com/complex/image/upload/c_limit,w_680/fl_lossy,pg_1,q_auto/Neymar_rtba2j.jpg' },
            { id: 7, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjRwAlPnJsZEeIqSdmoQYpJD4DqDU-CQIV3crPy9M4_yoY7hNz' },
            { id: 8, url: 'http://dtlon6z3v1kfl.cloudfront.net/wp-content/uploads/2017/01/22080908/Leo-Messi.jpg' },
            { id: 9, url: 'http://dtlon6z3v1kfl.cloudfront.net/wp-content/uploads/2017/01/22080908/Leo-Messi.jpg' },
            { id: 10, url: 'http://dtlon6z3v1kfl.cloudfront.net/wp-content/uploads/2017/01/22080908/Leo-Messi.jpg' }
            ],
        };

    }

    async componentDidMount() {
        const username = this.props.username
        console.log('received: '+this.props.username)
        this.setState({
            imgprofil: `https://steemitimages.com/u/${username}/avatar`,
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
                                    source={{ uri: 'https://scontent.ftun2-1.fna.fbcdn.net/v/t1.0-9/31946801_1811694005802190_7145020242580733952_n.jpg?_nc_cat=0&oh=08c817fd49ac2d16d4bbad0bae590d21&oe=5B7931F8' }}
                                />
                            </View>
                            <View style={{ flex: 7, height: 100 }} >
                                <View style={{ flexDirection: 'row', flex: 1 }} >
                                    <View style={styles.statCol}>
                                        <Text>30</Text>
                                        <Text>Posts</Text>
                                    </View>
                                    <View style={styles.statCol}>
                                        <Text>65</Text>
                                        <Text>Followers</Text>
                                    </View>
                                    <View style={styles.statCol}>
                                        <Text>80</Text>
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
                            <Text style={styles.fontSm} >kerim SELMI</Text>
                            <Text style={styles.fontBold} >JS lovers</Text>
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
