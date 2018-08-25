/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-05 13:17:33 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-07 11:11:29
 */


import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage, BackHandler, TextInput, ScrollView, ActivityIndicator } from "react-native"
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import {Util} from 'expo'
import config from '../config/index'
import Modal from 'react-native-modal' // 2.4.0
import ReadMore from 'react-native-read-more-text'
import Modal from "react-native-modal"



/*
 * users details 
 * feature: add clicked button -> user profile
 */

export default class PostHeader extends PureComponent {
    constructor() {
        super();
        this.state = {
            text: '',
            sendmsg: true,
        }
    }

    _menu = null


    logout = async () => {
        this._menu.hide()
        try {
            await AsyncStorage.clear();
            Util.reload()
        } catch (error) {
        }
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
        <View style={[styles.modalContent, { height: 70 + '%' }]}>
            <Image
                source={config.images.latech}
                resizeMode="contain"
                resizeMethod="scale"
                style={{ marginBottom: 10, height: 50, width: 100, marginTop: 10 }} />
            <ScrollView>
                <ReadMore
                    numberOfLines={8}
                    onReady={this._handleTextReady}>
                    <Text style={styles.cardText}>
                        Most blockchain technology is inherently public. The addresses, balances, and transaction history are available to anyone who desires to look. This presents a unique situation in terms of privacy, and understanding it will help you grasp the reasons why certain simple actions are inadvisable. Youve probably heard that you shouldnt tell others how much cryptocurrency you have, especially if its a lot. The core issue is the risk of associating yourself with your wallet address. This can be done both intentionally (due to your privacy) or accidentally (due to your security), and the association between the address and yourself can happen in varying degrees.
                        For instance, MetaMask can be used to associate your IP address with your wallet address, making it possible to potentially geolocate the wallet owner and compromise them through the IP attack vector. These attacks include:
                        Distributed denial of service (DDoS) attacks
                        Brute forcing SSH to gain access to the machine
                        Port scanning for vulnerable services to exploit
                        Mounting a man in the middle (MitM) attack
                        While the general risk of these attacks is low, your chances increase depending on how much value you have in your wallets. People with greater funds are at a significantly higher risk in this situation since the attacks would be done in a targeted manner (as opposed to botnet-style exploits where risk/reward is removed from the equation). Additionally, wallets that are 1-2 degrees of transactional separation are more likely to be owned by the same user and could potentially also be stolen in one attack. Its easy to identify wallets owned by an exchange or non-user address (like an ICO fund), so assessing the risk/reward ratio can be done with a level of confidence.
                        These risks are based on the IP attack vector, but this isnt the one you should be most mindful of. Associating other personally identifying information with your public address is vastly more risky for a number of reasons. Firstly, more data can be gathered easily with only a small amount of initial information. Gathering enough personal information to exploit a person can be much easier than trying to exploit the systems they use. This means that privacy is directly linked to your security, and you must take care to keep yourself from being vulnerable at the same level you would treat your systems. Takeaway II: privacy matters.
                        Lets use myself as an example. In just this post, Ive mentioned the university I attended and degree I earned. Given my username, its not a far-off assumption to determine my first name. My post history includes a photo of myself and other much more revealing information, and all of this is stored on a permanent, public blockchain. I have linked 2 or 3 of my wallets in various posts while fervently asking for donations, and the transaction history on the Ethereum blockchain will link these addresses to even more that I own. Theres actually much more information you could dig up, but Ill let that be an exercise for you (feel free to leave anything interesting you find in the comments though).
                        You may be thinking so what if I know some useless information now, but this is not the proper mindset to have in the security world. In fact, theres more than enough information to attempt a decent spear phishing attack to try and get me to accidentally download some malware or share sensitive information. Perhaps theres already sensitive information out there that you could leverage as blackmail, or even something that lets you bypass me altogether and gain access to my system directly. This example shows what it means to think with in the security mindset."
                    </Text>
                </ReadMore>
            </ScrollView>
            {this._renderButton('Close', () => this.setState({ privacyAndSecurity: false }))}
        </View >
    );

    /**
     * Report Bug native modal
     */
    _renderReportBugModal = () => (
        <View style={styles.modalContent}>

            {this.Feedback(this.state.sendmsg)}

        </View>
    );

    /**
     * send mail to steemEnd api
     */
    SendMail = (username, message) => {
        this.setState({ sendmsg: false })
        fetch('https://steemend.herokuapp.com/api/mail/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                message: message,
            }),
        }).then(res => res.json())
            .catch(error => console.error('SendMail Error:', error))
            .then(response => { console.log('SendMail Success:', response), this.setState({ sendmsg: true, reportBug: false }) });

    }

    /**
     * debug dialog and send mail
     */
    Feedback = (sendmsg) => {
        //this._menu.show();
        if (sendmsg) {
            return (
                <View>
                    <Image
                        source={config.images.latech}
                        resizeMode="contain"
                        resizeMethod="scale"
                        style={{
                            marginBottom: 10, height: 50, width: 100, justifyContent: 'center', alignItems: 'center',
                        }} />
                    <Text style={{ marginBottom: 10 }}>You can help improve Steemitgram by reporting issues and
                    feature requests.</Text>
                    <View style={styles.textAreaContainer} >
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder={"your feedback"}
                            placeholderTextColor={"grey"}
                            numberOfLines={10}
                            multiline={true}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />
                    </View>
                    {this._renderButton('Send', () => {
                        if (this.state.text !== '')

                            this.SendMail('latech', this.state.text)

                    })}
                    {this._renderButton('Close', () => this.setState({ reportBug: false }))}
                </View>)
        }
        return (
            <View>
                <Text>Please wait...</Text>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>);
    }
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
                    button={
                        <TouchableOpacity onPress={this.showMenu}>
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
                    <MenuItem onPress={this.logout}>Log Out</MenuItem>
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
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
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
        height: 10+'%',
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
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',

    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    cardText: {
        fontSize: 14,
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 50,
        justifyContent: "flex-start"
    }
});