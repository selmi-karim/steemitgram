import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import SearchableFlatlist from "searchable-flatlist";
import config from '../config/index'

const data = [
    { id: 1, name: "Francesco Raoux" },
    { id: 2, name: "Tasha Bonanno" },
    { id: 3, name: "Merle Braunstein" },
    { id: 4, name: "Aleda Bouzan" },
    { id: 5, name: "Issiah Elnaugh" }
  ];
  
export default class Profile extends Component {  
    
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={config.images.profile}
            style={[styles.barIcon, {tintColor: tintColor}]}
          />
        ),
    };
    state = { searchTerm: "" };
    render() {
      let { sContainer, sSearchBar, sTextItem } = styles;
      return (
        <View style={sContainer}>
          <TextInput
            placeholder={"Search"}
            style={sSearchBar}
            onChangeText={searchTerm => this.setState({ searchTerm })}
          />
          <SearchableFlatlist
            searchProperty={"name"}
            searchTerm={this.state.searchTerm}
            data={data}
            containerStyle={{ flex: 1 }}
            renderItem={({ item }) => <Text style={sTextItem}>{item.name}</Text>}
            keyExtractor={item => item.id}
          />
        </View>
      );
    }
}
const styles = StyleSheet.create({
    sContainer: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    sTextItem: {
        height: 50,
        width: "100%",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18
    },
    sSearchBar: {
        paddingHorizontal: 10,
        margin: 10,
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        fontSize: 18
    },
    barIcon: {
      width: 26,
      height: 26,
    },
});
