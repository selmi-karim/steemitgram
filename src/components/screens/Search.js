import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import config from '../config/index'

export default class Search extends Component {
 
  constructor(props) {

    super(props);

    this.state = {
      isLoading: true,
      text: '',
    }
    this.arrayholder = [] ;
  }

  static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
        <Image
            source={config.images.search}
            style={[styles.barIcon, {tintColor: tintColor}]}
        />
        ),
    };

 
  componentDidMount() {
    
     fetch('https://my.api.mockaroo.com/users.json?key=aab012b0')
      .then((response) => {
          console.log('response----: '+JSON.stringify(response));
      })
      .then((id) => {
        console.log(id);
        /*
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {

          // In this block you can do something with new state.
          this.arrayholder = responseJson ;

        });*/
      })
      .catch((error) => {
        console.error(error);
      });
      
  }

  GetListViewItem (fruit_name) {
    
   Alert.alert(fruit_name);
  
  }
  
   SearchFilterFunction(text){
     
     const newData = this.arrayholder.filter(function(item){
         const itemData = item.fruit_name.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text
     })
 }
 
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
 
 
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
 
    return (
 
      <View style={styles.mainContainer}>
      <TextInput 
          style={styles.textInputStyleClass}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid='transparent'
          placeholder="Search Here"
        />
 
        <ListView
 
          dataSource={this.state.dataSource}
 
          renderSeparator= {this.ListViewItemSeparator}
 
          renderRow={(rowData) => <Text style={styles.rowViewContainer} 

          onPress={this.GetListViewItem.bind(this, rowData.fruit_name)} >{rowData.fruit_name}</Text>}

          enableEmptySections={true}

          style={{marginTop: 10}}
 
        />
 
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
 
  mainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 7,
  },
 
  rowViewContainer: {
   fontSize: 17,
   padding: 10
  },

  textInputStyleClass:{
   marginTop: 40,
   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"    
   },

   barIcon: {
    width: 26,
    height: 26,
  },
});
