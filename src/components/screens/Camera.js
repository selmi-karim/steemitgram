/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-07-24 10:33:17 
 * @Last Modified by: kerim-selmi, karimation
 */

import React, { Component } from 'react';
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import takePhoto from './../container/TakePhoto'
import upload from './../container/UploadPhoto'

export default class Camera extends Component {

  render() {
    return (
      <View style={{ flex: 1, width: 100 + '%', height: 100 + '%' }}>
        <CamNavigation />
      </View>
    )
  }
}
const CamNavigation = createStackNavigator({
  TakePhoto: { screen: takePhoto },
  Upload: { screen: upload },
}, {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
    },
  });
