import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import config from './components/config/index.js' 
export default class Insta extends Component {
        constructor() {
            super();
            this.state = {
                screenWidth: Dimensions.get('window').width,
                screenHeight: Dimensions.get('window').height,
                liked: false,
            }
        
        }

        // function like 
        likeToggle(){
            this.setState({
                liked: !this.state.liked
            })
        };
        render() {
            const heartIconColor = (this.state.liked) ? 'rgb(252,61,57)' : null
            return(
                <View style={{ flex:1,width:100+'%',height:100+'%' }}>
                    {/* header: app name,dimension */}
                    <View 
                        style={styles.tempNav} >
                        <Text style={{ fontSize:20 }}>SteemitGramm </Text>

                    </View>
                    {/* user bar (icon, username,config button */}
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
                    {/* images display */}    
                    <TouchableOpacity onLongPress={() =>{ this.likeToggle() } } >
                        <Image 
                        style={{width:this.state.screenWidth,height:this.state.screenHeight/1.9,resizeMode:Image.resizeMode.contain}}
                        source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtRhS0il0UU65L4prJy0ZtbBP5iVWQQB7JyYYL4dtM9Q2BJ3yLQ'}}                     
                        />
                    </TouchableOpacity>    

                    {/* footer msg,like,next buttons */}
                    <View style={styles.iconBar} > 
                        <TouchableOpacity onPress={() =>{ this.likeToggle() } } >
                            <Image style={[styles.icon,{tintColor:heartIconColor} ]} source={config.images.heartIcon} />
                        </TouchableOpacity>    
                            
                            <Image style={styles.icon} source={config.images.bubbleIcon} />
                            <Image style={styles.icon} source={config.images.arrowIcon} />

                    </View>
                    
                    {/* comments */}
                    <View style={styles.commentBar} > 
                        <Image style={[styles.icon,{height:30,width:30} ]} source={config.images.heartIcon} />
                    </View>

                    
                </View>
            )
        }
}

const styles = StyleSheet.create({
    tempNav: {
        width:100+'%',
        height:75  , 
        backgroundColor:'#e3e4e5',
        borderBottomColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 20
    },
    userBar: {
        width:100+'%',
        height:config.styleConstants.rowHeight , 
        backgroundColor:'#fff',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent:'space-between',
      },
    userPicture: {
        height:40,
        width:40,
        borderRadius: 20
    },
    iconBar: {
        height: config.styleConstants.rowHeight,
        width:100+'%',
        borderBottomColor: '#fff',
        borderTopColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection:'row',
        alignItems:'center',
    },
    icon: {
        height:40,
        width:40,
        marginLeft: 5,
    },
    commentBar: {
        width:100+'%',
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
    }
})