import React, { Component } from 'react'
import { Post } from '../presentation'
import { FlatList } from 'react-native'

export default class PostFeed extends Component {
    
    constructor(){
        super();
        this.state = {
          data: [1,2,3,4,5,6,7],
        };
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