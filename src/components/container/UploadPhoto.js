import React, { Component } from 'react';
import {
    Text, View, Image, Clipboard, Share, StyleSheet, Dimensions,
    ScrollView, Alert, TouchableOpacity, ActivityIndicator
} from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { TagSelect } from 'react-native-tag-select';



export default class UploadPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 4,
            title: '',
            description: '',
            loading: false
        }
    }


    async componentDidMount() {
        const { navigation } = this.props;
        //const image = navigation.getParam('image')
        this.setState({ image: 'https://avatarko.ru/img/kartinka/11/multfilm_pingvin_10797.jpg' });

    }

    _share = () => {
        Share.share({
            message: this.state.image,
            title: 'Check out this photo',
            url: this.state.image,
        });
    };

    _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert('Copied image URL to clipboard');
    };

    _post = () => {
        //console.log('back' + this.props.navigation)
        this.props.navigation.goBack()
    };

    _cancel = () => {
        console.log('back' + this.props.navigation)
        this.props.navigation.goBack()
    };

    componentWillUnmount() {
        this.props.navigation.state.params.onGoBack();
    }


    render() {
        const data = [
            { id: 1, label: 'life' },
            { id: 2, label: 'photography' },
            { id: 3, label: 'technology' },
            { id: 4, label: 'health' },
            { id: 5, label: 'bitcoin' },
            { id: 6, label: 'gaming' },
            { id: 7, label: 'sports' },
        ];
        let { title, description, loading } = this.state
        if (loading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                }} >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View >
            )
        } else {
            return (
                <ScrollView>
                    <View style={styles.container} behavior="padding" enabled>
                        {this._maybeRenderImage()}
                        <View style={{ paddingLeft: 10, paddingRight: 10 }} >
                            <TextField
                                label='Title'
                                value={title}
                                onChangeText={(title) => this.setState({ title })}
                                characterRestriction={50}
                            />
                            <TextField
                                label='Description'
                                value={description}
                                onChangeText={(description) => this.setState({ description })}
                                characterRestriction={140}
                            />
                        </View>
                        <View style={{ paddingLeft: 10 }} >
                            <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }} >#tags</Text>
                            <TagSelect
                                data={data}
                                max={3}
                                ref={(tag) => {
                                    this.tag = tag;
                                }}
                                onMaxError={() => {
                                    Alert.alert('Ops', 'Max reached');
                                }}
                            />
                        </View>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={this._post}>
                                <View style={styles.button}>
                                    <Text> Post </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._cancel}>
                                <View style={styles.button}>
                                    <Text>Cancel</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>
            )
        }
    }


    _maybeRenderImage = () => {
        let { image } = this.state
        if (!image) {
            return;
        } else {
            return (
                <View style={{ marginTop: 20 }} >
                    <Image
                        source={{ uri: image }}
                        style={{ width: this.state.width, height: this.state.height, resizeMode: Image.resizeMode.contain }}
                    />
                </View>
            );
        }
    };

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',

    },

});