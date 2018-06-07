/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-05 13:17:33 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-06 15:22:04
 */


import React from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, TouchableHighlight } from "react-native"
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import config from '../config/index'
/*
 * users details 
 * feature: add clicked button -> user profile
 */
_menu = null;

setMenuRef = ref => {
    this._menu = ref;
};

hideMenu = () => {
    this._menu.hide();
};

showMenu = () => {
    this._menu.show();
};
export default (DisplayUser = props => (
    <View
        style={styles.tempNav} >
        <Text styltouche={{ fontSize: 23 }} style={{ position: 'absolute' }}> SteemitGramm </Text>
        <View style={{
            flexDirection: 'row',
            marginLeft: 'auto'
        }} >
           
        </View>
        <Menu
          ref={this.setMenuRef}
          button={<TouchableHighlight onPress={this.showMenu}>
          <Image
            style={styles.configIcon}
            source={config.images.param}
          />
        </TouchableHighlight>}
        >
          <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
          <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
        </Menu>
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