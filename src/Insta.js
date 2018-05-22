import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions} from 'react-native';

export default class Insta extends Component {
        
        constructor() {
            super();
            this.state = {
                screenWidth: Dimensions.get('window').width,
                screenHeight: Dimensions.get('window').height
            };
            
            
        }
        
        
            
        render() {
            

            return(
                <View style={{ flex:1,width:100+'%',height:100+'%' }}>
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
                                <Text style={{ fontSize:32 }}>...</Text>
                            </View>
                    
                    </View>

                    <Image 
                    style={{width:this.state.screenWidth,height:this.state.screenHeight/1.7,resizeMode:Image.resizeMode.contain}}
                    source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtRhS0il0UU65L4prJy0ZtbBP5iVWQQB7JyYYL4dtM9Q2BJ3yLQ'}} 
                    
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
    userPicture: {
        height:40,
        width:40,
        borderRadius: 20
    }
})