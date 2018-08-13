/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-05-07 13:17:33 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-07 11:11:29
 */


import React from "react"
import { View, Text,  StyleSheet } from "react-native"
import { FavHeader } from ".";
/*
 * users details 
 * feature: add clicked button -> user profile
 */
export default (FavHeader = props => (
    <View
        style={styles.tempNav} >
        <Text styltouche={{ fontSize: 23 }} style={{ position: 'absolute' }}> Trending Posts </Text>
        <View style={{
            flexDirection: 'row',
            marginLeft: 'auto'
        }} >

        </View>
        
    </View>
));

const styles = StyleSheet.create({
    tempNav: {
        flexDirection: 'row',
        width: 100 + '%',
        height: 45,
        backgroundColor: '#e3e4e5',
        borderBottomColor: '#e3e4e5',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    configIcon: {
        height: 25,
        width: 25,
        borderRadius: 20,
        marginRight: 8
    },
});