/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-05-11 10:34:02 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-06 10:26:40
 */
import { Dimensions } from 'react-native'

 // static resources (img,styles,color ...)

export default{
    // static images
    images: {
        heartIcon: require('../../../assets/heart.png'),
        bubbleIcon: require('../../../assets/bubble.png'),
        arrowIcon: require('../../../assets/arrow.png'), 
        blackHeartIcon: require('../../../assets/blackHeart.png'), 
        profile: require('../../../assets/profile.png'), 
        search: require('../../../assets/search.png'), 
        camera: require('../../../assets/camera.png'), 
        accueil: require('../../../assets/accueil.png'), 
        fav: require('../../../assets/fav.png'), 
        param: require('../../../assets/config.png'), 
        upArrow: require('../../../assets/uparrow1.png'), 
        plus: require('../../../assets/plus.png'), 
        plusB: require('../../../assets/plus-b.png'), 
        notif: require('../../../assets/notif.png'), 
        location: require('../../../assets/location.png'), 
        website: require('../../../assets/website.png'), 
        user: require('../../../assets/user.png'), 
        power: require('../../../assets/power.png'), 
        latech: require('../../../assets/latech.png'), 
        
    },
    // static styles
    styleConstants: {
        rowHeight: 50,
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
        halfWidth: Dimensions.get('window').width/2
    }  
}