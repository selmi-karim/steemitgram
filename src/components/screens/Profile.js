import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native'

export default class Profile extends Component {   

    constructor() {
        super() 
        this.state = {
        }
        getAllImage();
    }

    getAllImage() {
        const domain = 'my.api.mockaroo.com'
        const headers = { "X-API-Key": 'aab012b0' }
        fetch(`http://${domain}/profile.json`, { headers })
        .then(response => response.json())
        .then(users => console.log(users))
    }

    render() {
            return( 
                <Text> Profile Page </Text>
            )
        } 
}
