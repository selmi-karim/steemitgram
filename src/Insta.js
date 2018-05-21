import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions} from 'react-native';

export default class Insta extends Component {
        
        render() {
            Image.getSize('https://medias.lequipe.fr/img-photo-jpg/encore-un-trophee-pour-messi/1500000000938685/129:61,2500:1643-624-416-75/fba64.jpg', (width, height) => {
                console.log('w: '+width)
                console.log('h: '+height)
                
            });
            
            return(
                <View style={{ flex:1 }}>
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
                    style={styles.image}
                    source={{uri:'https://medias.lequipe.fr/img-photo-jpg/encore-un-trophee-pour-messi/1500000000938685/129:61,2500:1643-624-416-75/fba64.jpg'}} 
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
        height: 416,
        backgroundColor:'#256555',
        resizeMode: Image.resizeMode.contain,

    },
    userPicture: {
        height:40,
        width:40,
        borderRadius: 20
    }
})