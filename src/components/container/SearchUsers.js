/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-01 10:33:45 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-01 14:47:31
 */

import React from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Button,
  RefreshControl,
} from "react-native";
import { DisplayUser } from '../presentation'

const _renderItem = ({ item }) => (
  <DisplayUser
    name={item.username}
  />
);
/** personalized separator in Flatlist */
const _renderSeparator = () => (
  <View style={{ height: 1, backgroundColor: "grey", marginLeft: 80 }} />
);

/**personalized header in Flatlist */
const _renderHeader = () => (
  <View
    style={{ backgroundColor: "#4fc3f7", justifyContent: "center" }}
  >

  </View>
);
/**footer (search other users if possible) */
const _renderFooter = (isFetching, hasMoreResult, loadMore) => {
  if (isFetching) {
    return (
      <ActivityIndicator
        size="large"
        animating={true}
        color="#4fc3f7"
        style={{ marginBottom: 12 }}
      />
    );
  }
  if (hasMoreResult) {
    return <Button color="#4fc3f7" title="Show more" onPress={loadMore} />;
  }

  return null;
};

/** show when  */
const _renderEmpty = () => (
  <View style={{ height: 40, alignItems: "center", justifyContent: "center" }}>
    <Text>No result</Text>
  </View>
);


export default (UserList = props => (
  <FlatList
    data={props.data}
    renderItem={_renderItem}
    keyExtractor={item => item.username}
    ItemSeparatorComponent={_renderSeparator}
    refreshControl={
      <RefreshControl refreshing={props.refreshing} onRefresh={props.refresh} />
    }
  />
));