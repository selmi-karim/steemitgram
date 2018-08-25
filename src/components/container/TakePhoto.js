/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-07-24 10:33:17 
 * @Last Modified by: kerim-selmi, karimation
 */
import React from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import { ImagePicker, Permissions } from 'expo'

export default class TakePhoto extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            image: null,
            uploading: false,
            isModalVisible: true
        }
    }
    _toggleModal = () =>
        this.setState({ isModalVisible: false });

    /**
     * About As native modal
     */
    _renderModal = () => (
        <View style={styles.modalContent}>
            <TouchableOpacity onPress={this._pickImage}>
                <View style={styles.button}>
                    <Text>From Device</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._takePhoto}>
                <View style={styles.button}>
                    <Text>Take a photo</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._cancel}>
                <View style={styles.button}>
                    <Text>Cancel</Text>
                </View>
            </TouchableOpacity>

        </View>
    );

    render() {
        if (this.state.uploading) {
            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}>
                    <ActivityIndicator color="#fff" animating size="large" />
                </View>
            )
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Modal
                    isVisible={this.state.isModalVisible}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                >
                    {this._renderModal()}
                </Modal>
            </View>
        )
    }


    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}>
                    <ActivityIndicator color="#fff" animating size="large" />
                </View>
            )
        }
    }


    _takePhoto = async () => {
        const permissions = Permissions.CAMERA
        const { status } = await Permissions.askAsync(permissions)
        if (status === 'granted') {
            let pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            })
            this._handleImagePicked(pickerResult)
        }
    }

    _pickImage = async () => {
        const permissions = Permissions.CAMERA_ROLL
        const { status } = await Permissions.askAsync(permissions)
        if (status === 'granted') {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            })
            this._handleImagePicked(pickerResult)
        }
    }

    _cancel = () => {
        this.setState({ isModalVisible: false })

    }


    refresh() {
        this.setState({ isModalVisible: true })
    }

    _handleImagePicked = async pickerResult => {
        /*let uploadResponse, uploadResult
        try {
            this.setState({ isModalVisible: false, uploading: true })

            if (!pickerResult.cancelled) {
                uploadResponse = await uploadImageAsync(pickerResult.uri)
                uploadResult = await uploadResponse.json()
                this.setState({ image: uploadResult.location })
            }
        } catch (e) {
            console.log({ uploadResponse })
            console.log({ uploadResult })
            console.log({ e })
            alert('Upload failed, sorry :(')
        } finally {
            this.setState({ uploading: false })
            this.props.navigation.navigate('Upload', {
                image: this.state.image, onGoBack: () => this.refresh(),
            })
        }*/
        this.setState({ isModalVisible: false, uploading: true })
        const ur = 'https://cdn2.vectorstock.com/i/1000x1000/75/41/abstract-cute-angry-cartoon-pinguin-isolated-on-a-vector-17507541.jpg'
        this.setState({ uploading: false })
        this.props.navigation.navigate('Upload', {
            image: ur, onGoBack: () => this.refresh(),
        })
    }
}


async function uploadImageAsync(uri) {
    let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload'

    // Note:
    // Uncomment this if you want to experiment with local server
    //
    // if (Constants.isDevice) {
    //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`
    // } else {
    //   apiUrl = `http://localhost:3000/upload`
    // }

    let uriParts = uri.split('.')
    let fileType = uri[uri.length - 1]

    let formData = new FormData()
    formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    })

    let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    }

    return fetch(apiUrl, options)
}


const styles = StyleSheet.create({
    container: {
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
    icon: {
        width: 30,
        height: 30,
    }

});