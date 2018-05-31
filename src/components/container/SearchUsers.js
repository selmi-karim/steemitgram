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
const _renderSeparator = () => (
  <View style={{ height: 1, backgroundColor: "grey", marginLeft: 80 }} />
);
const _renderHeader = () => (
  <View
    style={{ height: 30, backgroundColor: "#4fc3f7", justifyContent: "center" }}
  >
    <Text>Header</Text>
  </View>
);
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
    return <Button color="#4fc3f7" title="Afficher plus" onPress={loadMore} />;
  }

  return null;
};
const _renderEmpty = () => (
  <View style={{ height: 40, alignItems: "center", justifyContent: "center" }}>
    <Text>Aucun résultat</Text>
  </View>
);

_onPressItem = (name) => {
  // updater functions are preferred for transactional updates
  Alert('item: '+name)
};

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