/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-05-21 10:33:50 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-05 12:30:15
 */

 import React, { Component } from 'react'
import { Post } from '../presentation'
import { FlatList } from 'react-native'
import _ from "lodash";

export default class PostFeed extends Component {
    
    constructor(){
        super();
        this.state = {
          page: 1,
          data: [],
        };
    }

    /** we generate a fake data for home page */
    async fetchData(page) {
    const uri = "https://randomuser.me/api/";
    const response = await fetch(
        `${uri}?page=${page}&results=10&seeds=demo`
    );
    const jsondata = await response.json();
    return jsondata.results;
    }

    async loadData(page) {
    const data = await this.fetchData(page);
    const nextPage = page + 1;
    const formatedData = this.fromArrayToSectionData(data);
    this.setState({
        page: nextPage,
        data: [...this.state.data, ...data],
    });
    }

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

    
    async componentDidMount() {
        await this.loadData(this.state.page);
    }

    
    _renderPost({item}) {
        return <Post item={item} />
    }

    _renderKey(item){
        return item.email.toString()
    }

    render() {
        //console.log(this.state.data)
        return(
            <FlatList 
            data={this.state.data} 
            keyExtractor = { this._renderKey }
            renderItem= { this._renderPost }
            onEndReachedThreshold={1}
            onEndReached={({ distanceFromEnd }) => {
                console.log('on end reached ', distanceFromEnd);
            }}
            />
        )
    }
}