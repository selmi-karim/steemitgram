import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default class Login extends React.Component {
    
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