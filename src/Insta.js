import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions} from 'react-native';

export default class Insta extends Component {
       

        render() {
            return(
                <View style={{ flex:1, width:100+'%', height:100+'%' }}>
                    <View 
                        style={styles.tempNav} >
                        <Text style={{ fontSize:20 }}>SteemitGramm </Text>

                    </View>
                    <View style={styles.userBar} >
                            <View style={{flexDirection:'row', alignItems:'center'}} > 
                                <Image 
                                    style={styles.userPicture}
                                    source={{uri:'https://lh3.googleusercontent.com/-XCnsa2r8hsU/AAAAAAAAAAI/AAAAAAAAAAA/AIcfdXCfLo8epxEOGePK66s01RIP9BQVsg/s48-c-mo/photo.jpg'}}
                                />
                                <Text>kerimSelmi </Text>
                            </View>
                            <View style={{}}> 
                                <Text style={{ fontSize:30 }}>...</Text>
                            </View>
                    
                    </View>

                    <Image 
                    style={styles.image}
                    source={{uri:'http://pngimg.com/uploads/penguin/pinguin_PNG15.png'}} 
                    />
                </View>
            )
        }
}

const styles = StyleSheet.create({
    tempNav: {
        width:100+'%',
        height:75  , 
        backgroundColor:'#e3e4e5',
        borderBottomColor: '#93979b',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 20
    },
    userBar: {
        width:100+'%',
        height:50  , 
        backgroundColor:'#fff',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent:'space-between',
      },
    image:{
        width: 100+'%', 
        height: 100+'%'
    },
    userPicture: {
        height:40,
        width:40,
        borderRadius: 20
    }
})