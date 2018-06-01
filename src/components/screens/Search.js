/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-05-22 10:23:56 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-01 15:15:33
 */


import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, SearchBar } from 'react-native-elements';
import Icon from '@expo/vector-icons/FontAwesome';
import { SearchUsers } from "../container";
import _ from "lodash";
import config from '../config/index'

export default class Search extends Component {
  state = {
    page: 1,
    results: 20,
    totalPage: 3,
    seed: "demo",
    isFetching: false,
    data: [],
    hasMoreResult: true,
    refreshing: false,
    formatedData: [],
    textInput:'',
    fixedData: []
  };

  // navigation options (icon,title)
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={config.images.search}
        style={[styles.barIcon, { tintColor: tintColor }]}
      />
    ),
  };


  // get users from data base
  async fetchData(page) {
    const uri = "https://randomuser.me/api/";
    const response = await fetch(
      `${uri}?page=${page}&results=${this.state.results}&seeds=${this.state
        .seed}`
    );
    const jsondata = await response.json();
    return jsondata.results;
  }


  // append new users to existing data
  async loadData(page) {
    this.setState({ isFetching: true });
    const data = await this.fetchData(page);
    const nextPage = page + 1;
    const formatedData = this.fromArrayToSectionData(data);
    this.setState({
      page: nextPage,
      data: [...this.state.data, ...data],
      isFetching: false,
      hasMoreResult: nextPage <= this.state.totalPage,
      formatedData: formatedData,
      fixedData: data
    });
  }

  // re-read other users randomly
  async refreshData() {
    this.setState({ refreshing: true });
    const data = await this.fetchData(1);
    const formatedData = this.fromArrayToSectionData(data);
    this.setState({
      page: 2,
      data: data,
      refreshing: false,
      hasMoreResult: true,
      formatedData: formatedData
    });
  }

  // transform data to read-only data
  fromArrayToSectionData(data) {
    let ds = _.groupBy(data, d => d.name.last.charAt(0));
    ds = _.reduce(
      ds,
      (acc, next, index) => {
        acc.push({
          key: index,
          data: next
        });
        return acc;
      },
      []
    );
    ds = _.orderBy(ds, ["key"]);
    return ds;
  }

  /**rn life cycle method, lanched whe component 
   * mounted and ready to be used. */
  async componentDidMount() {
    await this.loadData(this.state.page);
  }


  /** we would filter the JSON array according to given value pass as argument. 
   * After filtering data we would set the newly data in dataSource state. */
  onChangeTextInput = (text) => {
          console.log('change: '+text);
          const newData = this.state.fixedData.filter(function(item){
              console.log('item: '+JSON.stringify(item))
              const itemData = item.name.first.toUpperCase() + ' ' + item.name.last.toUpperCase()
              const textData = text.toUpperCase()
              return itemData.indexOf(textData) > -1
          })
          /**handle new data */
          this.setState({
            data: newData,
          })
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
          isFetching={this.state.isFetching}
          loadMore={() => this.loadData(this.state.page)}
          hasMoreResult={this.state.hasMoreResult}
          refreshing={this.state.refreshing}
          refresh={() => this.refreshData()}
        />
      </View>
    );
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