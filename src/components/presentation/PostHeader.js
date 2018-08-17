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
import Modal from 'react-native-modal'; // 2.4.0


/*
 * users details 
 * feature: add clicked button -> user profile
 */

export default class PostHeader extends PureComponent {
    constructor() {
        super();
        this.state = {
            text: 'Username'
        }
    }

    _menu = null

    exit = async () => {
        this._menu.hide()
        try {
            await AsyncStorage.clear();
        } catch (error) {
        }
        BackAndroid.exitApp()
    }
    showMenu = () => {
        this._menu.show();
    }

    setMenuRef = ref => {
        this._menu = ref;
    }


    hideMenu = () => {
        this._menu.hide()
    }

    /**
     * about as dialog
     */
    aboutAs = () => {
        this._menu.hide()
        this.aboutAsShow(true)
    }

    aboutAsShow = (show) => {
        this.setState({ aboutAs: show })
    }

    /**
     * report bug dialog
     */
    reportBug = () => {
        this._menu.hide()
        this.reportBugShow(true)
    }

    reportBugShow = (show) => {
        this.setState({ reportBug: show })
    }

    /**
     * privacy and security dialog
     */
    privacyAndSecurity = () => {
        this._menu.hide()
        this.privacyAndSecurityShow(true)
    }

    privacyAndSecurityShow = (show) => {
        this.setState({ privacyAndSecurity: show })
    }

    /**
     * render button
     */
    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    /**
     * About As native modal
     */
    _renderAboutAsModal = () => (
        <View style={styles.modalContent}>
            <Image
                source={config.images.latech}
                resizeMode="contain"
                resizeMethod="scale"
                style={{ marginBottom: 10, height: 50, width: 100 }} />
            <Text style={{ marginBottom: 10 }}>{config.text.latech}</Text>
            {this._renderButton('Close', () => this.setState({ aboutAs: false }))}
        </View>
    );


    /**
     * Privacy and Security native modal
     */
    _renderPSModal = () => (
        <View style={styles.modalContent}>
            <Image
                source={config.images.latech}
                resizeMode="contain"
                resizeMethod="scale"
                style={{ marginBottom: 10, height: 50, width: 100 }} />
            <ScrollView>

                <Text style={{ marginBottom: 10 }}>{config.text.privacyAndSecurity} </Text>
            </ScrollView>

            {this._renderButton('Close', () => this.setState({ privacyAndSecurity: false }))}
        </View>
    );

    /**
     * Report Bug native modal
     */
    _renderReportBugModal = () => (
        <View style={styles.modalContent}>
            <Image
                source={config.images.latech}
                resizeMode="contain"
                resizeMethod="scale"
                style={{ marginBottom: 10, height: 50, width: 100 }} />
            <Text style={{ marginBottom: 10 }}>You can help improve Steemitgram by reporting issues and
                    feature requests.</Text>
            {this._renderButton('Close', () => this.setState({ reportBug: false }))}
        </View>
    );

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
                    <MenuItem onPress={this.aboutAs}>About as</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.exit}>Exit</MenuItem>
                </Menu>
                {/* about as dialog*/}
                <Modal
                    isVisible={this.state.aboutAs}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                >
                    {this._renderAboutAsModal()}
                </Modal>

                {/* Privacy and Security dialog*/}
                <Modal
                    isVisible={this.state.privacyAndSecurity}
                    backdropColor={'black'}
                    backdropOpacity={1}
                    animationIn={'zoomInDown'}
                    animationOut={'zoomOutUp'}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                >
                    {this._renderPSModal()}
                </Modal>

                {/* Report Bug dialog */}
                <Modal
                    isVisible={this.state.reportBug}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                >
                    {this._renderReportBugModal()}
                </Modal>

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
    }, container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});