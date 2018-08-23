/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-01 10:33:45 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-01 14:47:31
 */

import React from "react";
import {
  FlatList,
  View,
  RefreshControl,
} from "react-native";
import { DisplayUser } from '../presentation'

/** personalized separator in Flatlist */
const _renderSeparator = () => (
  <View style={{ height: 1, backgroundColor: "grey", marginLeft: 80 }} />
);

export default (UserList = props => (
  <FlatList
    data={props.data}
    renderItem={({ item }) => {
      //console.log('qqq: ' + props.navigation)
      return <DisplayUser
        name={item.username} navigation={props.navigation}
      />
    }}
    keyExtractor={item => item.username}
    ItemSeparatorComponent={_renderSeparator}
    refreshControl={
      < RefreshControl refreshing={props.refreshing} onRefresh={props.refresh} />
    }
  />
));
