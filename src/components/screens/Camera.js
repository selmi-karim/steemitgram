import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Vibration, AppState} from 'react-native';
import { Camera, Permissions, FileSystem, } from 'expo';
import config from '../config/index'

export default class CameraEx extends React.Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={config.images.camera}
        style={[styles.barIcon, {tintColor: tintColor}]}
      />
    ),
  };
  
  state = {
    hasCameraPermission: null,
    type: 'back'
  };

  async componentWillMount() {

    console.log('route name: '+this.props.navigation.state.routeName);
    console.log('is focused: '+this.props.navigation.isFocused());
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });
    
  }

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        FileSystem.moveAsync({
          from: data.uri,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1,
          });
          Vibration.vibrate();
        });
        console.log(data);
      });
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      console.log('hascameraPermission is null')
      return null;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={[
                  styles.flipButton,
                  styles.picButton,
                  { flex: 0.3, alignSelf: 'flex-end' },
                ]}
                onPress={this.takePicture.bind(this)}>
                <Text style={styles.flipText}> SNAP </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  barIcon: {
    width: 26,
    height: 26,
  },
});