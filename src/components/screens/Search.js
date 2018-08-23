/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-05-22 10:23:56 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-05 14:39:31
 */


import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";
import { SearchBar } from 'react-native-elements';
import { SearchUsers, UserDetails } from "../container";
import { createStackNavigator } from 'react-navigation'
import config from '../config/index'

class Search extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: [],
      hasMoreResult: true,
      refreshing: false,
      textInput: 'latech',
    }
  }



  // get users from data base
  async fetchData(text) {
    // https://api.steemjs.com/lookup_accounts?lowerBoundName=latech&limit=10
    const uri = "https://api.steemjs.com/lookup_accounts?";
    /*const response = await fetch(
      `${uri}?lowerBoundName=${username}&limit=${limit}`
    );*/
    const response = await fetch(`https://api.steemjs.com/lookup_accounts?lowerBoundName=${text}&limit=30`);
    const jsondata = await response.json();
    // create data
    let data = []
    jsondata.forEach(function (element) {
      //console.log(element);
      data.push({ username: element })
    });
    return data;
  }

  synchronousFetchData(text) {
    fetch(`https://api.steemjs.com/lookup_accounts?lowerBoundName=${text}&limit=10`)
      .then(response => response.json())
      .then(json => {
        let data = []
        json.forEach(function (element) {
          //console.log(element);
          data.push({ username: element })
        });
        this.setState({
          data: data,
          textInput: text,
        })
        //console.log('dat:' +data)
      });

  }


  // append new users to existing data
  async loadData(text) {
    this.setState({ isFetching: true });
    const data = await this.fetchData(text);
    //const formatedData = this.fromArrayToSectionData(data);
    this.setState({
      data: data,
      isFetching: false,
    });
  }

  // re-read other users randomly
  async refreshData() {
    this.setState({ refreshing: true });
    const data = await this.fetchData(this.state.textInput);
    //const formatedData = this.fromArrayToSectionData(data);
    this.setState({
      data: data,
      refreshing: false,
      hasMoreResult: true,
    });
  }


  /**rn life cycle method, lanched whe component 
   * mounted and ready to be used. */
  async componentDidMount() {
    await this.loadData('latech');
  }

  /** we would filter the JSON array according to given value pass as argument. 
   * After filtering data we would set the newly data in dataSource state. */
  //TODO: add string matching algorithme
  onChangeTextInput = (text) => {
    //console.log('change: ' + text);
    this.synchronousFetchData(text.toLowerCase());
  }

  /** we would filter the JSON array according to given value pass as argument. 
   * After filtering data we would set the newly data in dataSource state. */
  onClearTextInput = () => {
    console.log('clear')
  }

  render() {
    return (
      <View style={styles.container}>
        {/* search users in database*/}

        <SearchBar
          lightTheme
          onChangeText={(text) => this.onChangeTextInput(text)}
          onClear={() => this.onClearTextInput(this)}
          placeholder='Type Here...'
        />

        {/* we send all users data to Container to be handled*/}
        <SearchUsers
          data={this.state.data}
          navigation={this.props.navigation}
          isFetching={this.state.isFetching}
          loadMore={() => this.loadData(this.state.textInput)}
          hasMoreResult={this.state.hasMoreResult}
          refreshing={this.state.refreshing}
          refresh={() => this.refreshData()}
        />
      </View>
    );
  }
}


const SearchNavigator = createStackNavigator({
  SearchFeed: { screen: Search },
  SearchDetails: { screen: UserDetails },

}, {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
    },
  });



export default class SearchApp extends PureComponent {
  // navigation options (icon,title)
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={config.images.search}
        style={[styles.barIcon, { tintColor: tintColor }]}
      />
    ),
  };
  render() {
    return (<SearchNavigator />)
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  barIcon: {
    width: 26,
    height: 26,
  },
});