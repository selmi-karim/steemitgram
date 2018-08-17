/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-05 13:17:33 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-07 11:11:29
 */


import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage, BackAndroid, Button, TextInput } from "react-native"
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import config from '../config/index'
import { Dialog } from 'react-native-simple-dialogs';

/*
 * users details 
 * feature: add clicked button -> user profile
 */

export default class PostHeader extends PureComponent {
    constructor() {
        super();
        this.state = {
        }
    }

    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    }


    hideMenu = () => {
        this._menu.hide()
    }

    privacyAndSecurity = () => {
        this._menu.hide()
    }

    AboutAs = () => {
        this._menu.hide()
        this.aboutAs(true)
    }

    reportBug = () => {
        this._menu.hide()
    }

    exit = async () => {
        this._menu.hide()
        try {
            await AsyncStorage.clear();
        } catch (error) {
        }
        BackAndroid.exitApp()
    }

    aboutAs = (show) => {
        this.setState({ aboutAs: show })
    }

    showMenu = () => {
        this._menu.show();
    };
    render() {
        return (
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
                    button={<TouchableOpacity onPress={this.showMenu}>
                        <Image
                            style={styles.configIcon}
                            source={config.images.param}
                        />
                    </TouchableOpacity>}
                >
                    <MenuItem onPress={this.privacyAndSecurity}>Privacy & Security</MenuItem>
                    <MenuItem onPress={this.reportBug}>Report Bug</MenuItem>
                    <MenuItem onPress={this.AboutAs}>About as</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.exit}>Exit</MenuItem>
                </Menu>
                <Dialog
                    visible={this.state.aboutAs}
                    title="Latech"
                    onTouchOutside={() => this.aboutAs(false)}
                    contentStyle={{ justifyContent: 'center', alignItems: 'center', }}
                    animationType="fade">
                    <Image
                        source={config.images.latech}
                        resizeMode="contain"
                        resizeMethod="scale"
                        style={{ marginBottom: 10, height: 50, width: 100 }} />
                    <Text style={{ marginBottom: 10 }}>LaTech est une société française avec une vaste expérience dans
                     la gestion de projets locaux et le mode nearshore. Au-delà de la relation client / fournisseur,
                     LaTech développe des partenariats et s'engage pour la réussite des projets en adoptant une approche
                     basée sur la coopération et la transparence.</Text>
                    <Button onPress={() => this.aboutAs(false)} style={{ marginTop: 10 }} title="CLOSE" />
                </Dialog>

            </View>
        )
    }
}

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