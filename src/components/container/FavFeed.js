/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-05 12:18:30 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-05 12:30:04
 */


import React, { Component } from 'react'
import { Fav } from '../presentation'
import { FlatList } from 'react-native'
import _ from "lodash";

export default class FavFeed extends Component {

    constructor() {
        super();
        this.state = {
            page: 1,
            data: [],
        };
    }

    /** we generate a fake data for home page */
    /**this is the fav image of user */
    async fetchData(page) {
        const response = await fetch('https://steemend.herokuapp.com/api/post/news');
        const jsondata = await response.json();
        return jsondata;
    }

    async loadData(page) {
        const data = await this.fetchData(page);
        const nextPage = page + 1;
        this.setState({
            page: nextPage,
            data: [...this.state.data, ...data],
        });
    }

    async componentDidMount() {
        await this.loadData(this.state.page);
    }


    _renderPost({ item }) {
        return <Fav item={item} />
    }

    _renderKey(item) {
        return item.id.toString()
    }

    render() {
        //console.log(this.state.data)
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={this._renderKey}
                renderItem={this._renderPost}
                onEndReachedThreshold={1}
                onEndReached={({ distanceFromEnd }) => {
                    console.log('on end reached ', distanceFromEnd);
                }}
            />
        )
    }
}