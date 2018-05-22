import React, { Component } from 'react'
import { Post } from '../presentation'
import { FlatList } from 'react-native'

export default class PostFeed extends Component {
    
    _renderPost({item}) {
        return <Post item={item} />
    }

    _renderKey(item){
        return item.toString()
    }

    render() {
        return(
            <FlatList data={[
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9
            ]} 
            keyExtractor = { this._renderKey }
            renderItem= { this._renderPost }
            />
        )
    }
}