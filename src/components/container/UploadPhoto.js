import React, { Component } from 'react';
import {
    Text, View, Image, Clipboard, Share, StyleSheet, Dimensions,
    ScrollView, Alert, TouchableOpacity, ActivityIndicator, AsyncStorage
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
            loading: false
        }
    }


    /**
    *  Fetch the token from storage then navigate to our appropriate  place
    */
    _getToken = async () => {
        try {
            return await AsyncStorage.getItem('auth');
        } catch (e) {
            console.warn(e)
            return null
        }
    };

    componentWillMount() {
        //this._clearStorage();
        this._getToken().then((auth) => {
            // Checks if the current visitor is a logged in user.
            if (auth) {
                this.setState({
                    token: JSON.parse(auth).token,
                })
            }
        })
    }


    async componentDidMount() {
        const { navigation } = this.props;
        const image = navigation.getParam('image')
        this.setState({ image });

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
        this.setState({ loading: true })
        let tags = ""
        this.tag.itemsSelected.forEach(function (item) {
            tags += item.label + "#";
        });
        let { title, image, token } = this.state
        //console.log(title + ' ' + description + ' ' + tags)
        if (title.length === 0 && image.length === 0) {
            this.setState({ loading: false })
            Alert.alert('ops')
        }
        else {
            // todo post to steemitend
            let body = {title: title, description: image,tags:tags} 
            fetch('https://steemend.herokuapp.com/api/post/addPost', {
                method: 'post',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }),
                body: JSON.stringify(body)
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log('resp' + JSON.stringify(responseData));
                })
                .done()
            this.setState({ loading: false })
            this.props.navigation.goBack()
        }
    };


    _cancel = () => {
        this.props.navigation.goBack()
    };



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
