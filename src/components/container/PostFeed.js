import React, { Component } from 'react'
import { Post } from '../presentation'
import { FlatList } from 'react-native'

export default class PostFeed extends Component {
    
    constructor(){
        super();
        this.state = {
          page: 1,
          data: [],
        };
    }

    async fetchData(page) {
    const uri = "https://randomuser.me/api/";
    const response = await fetch(
        `${uri}?page=${page}&results=${this.state.results}&seeds=${this.state
        .seed}`
    );
    const jsondata = await response.json();
    return jsondata.results;
    }

    async loadData(page) {
    this.setState({ isFetching: true });
    const data = await this.fetchData(page);
    const nextPage = page + 1;
    const formatedData = this.fromArrayToSectionData(data);
    this.setState({
        page: nextPage,
        data: [...this.state.data, ...data],
    });
    }
    
    async componentDidMount() {
        await this.loadData(this.state.page);
    }

    
    _renderPost({item}) {
        return <Post item={item} />
    }

    _renderKey(item){
        return item.toString()
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
                //console.log('on end reached ', distanceFromEnd);
            }}
            />
        )
    }
}