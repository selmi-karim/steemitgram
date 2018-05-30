import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet, Platform, StatusBar } from 'react-native'
import config from '../config/index'
import { SearchBar } from 'react-native-elements'
import CompleteFlatList from 'react-native-complete-flatlist';


const data = [
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Syah', status: 'Active', time: '9:14 PM', date: '1 Dec 2018' },
  { name: 'Izzat', status: 'Active', time: '8:15 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  {
    name: 'Muhyiddeen',
    status: 'Blocked',
    time: '10:10 PM',
    date: '9 Feb 2018',
  },
];


export default class Search extends Component {  
    
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={config.images.search}
            style={[styles.barIcon, {tintColor: tintColor}]}
          />
          
        ),
    };
    cell(data) {
        return <Text>{data.name}</Text>;
      }
    
    render() {
    const { navigation } = this.props;
    return (
        <CompleteFlatList
        searchKey={['name', 'status', 'time', 'date']}
        highlightColor="yellow"
        pullToRefreshCallback={() => {
        alert('refreshing');
        }}
        data={data}
        renderSeparator={null}
        renderItem={this.cell.bind(this)}
    />
    );
    }
}
    


const styles = StyleSheet.create({
    barIcon: {
      width: 26,
      height: 26,
    },
});

