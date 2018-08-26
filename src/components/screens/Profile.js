/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-01 10:33:17 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-05 12:28:46
 */

import React, { PureComponent } from 'react';
import { View, Image, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native'
import config from '../config/index'
import { UserProfile } from './../container'

export default class Favorite extends PureComponent {
    constructor() {
        super();
        this.state = {
            username: null
        }
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={config.images.profile}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
    };

    async componentWillMount() {
        this._getUsername().then((auth) => {
            // Checks if the current visitor is a logged in user.
            //console.log('auth: ' + auth)
            if (auth) {
                this.setState({
                    username: JSON.parse(auth).username,
                });
            }
        })
    }

    _getUsername = async () => {
        try {
            return await AsyncStorage.getItem('auth');
        } catch (e) {
            console.warn(e)
            return null
        }
    };

    render() {
        //console.log('render: ' + this.state.username)
        if (this.state.username) {
            return (
                <View style={{ flex: 1, width: 100 + '%', height: 100 + '%' }}>
                    <UserProfile
                        username={this.state.username}
                    />
                </View>
            )
        } else {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
    container: {
        flex: 1,
        justifyContent: 'center'
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }
});
