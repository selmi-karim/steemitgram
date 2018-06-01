/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-01 10:33:45 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-01 13:12:33
 */

import React from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Button,
  RefreshControl,
  Alert
} from "react-native";
import { DisplayUser } from '../presentation'

const _renderItem = ({ item }) => (
  <DisplayUser
    name={item.name.last}
    firstName={item.name.first}
    picture={item.picture.thumbnail}
    email={item.email}
  />
);
/** personalized separator in Flatlist */
const _renderSeparator = () => (
  <View style={{ height: 1, backgroundColor: "grey", marginLeft: 80 }} />
);

/**personalized header in Flatlist */
const _renderHeader = () => (
  <View
    style={{ height: 30, backgroundColor: "#4fc3f7", justifyContent: "center" }}
  >
    <Text>Header</Text>
    
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
    <Text>No result,Please try another username</Text>
  </View>
);


export default (UserList = props => (
  <FlatList
    data={props.data}
    renderItem={_renderItem}
    keyExtractor={item => item.email}
    ItemSeparatorComponent={_renderSeparator}
    ListHeaderComponent={_renderHeader}
    ListFooterComponent={() =>
      _renderFooter(props.isFetching, props.hasMoreResult, props.loadMore)}
    ListEmptyComponent={_renderEmpty}
    refreshControl={
      <RefreshControl refreshing={props.refreshing} onRefresh={props.refresh} />
    }
  />
));