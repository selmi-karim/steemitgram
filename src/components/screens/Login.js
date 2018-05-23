import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
export default class PostFeed extends Component {
    
    login() {
        console.log('login button')
        this.props.navigation.navigate('main')
    }
    render() {
        return(
            <TouchableOpacity onPress={() => {this.login()}}>
                    <Text>Login Page</Text> 
            </TouchableOpacity>
        )
    }
}