/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-01 10:33:38 
 * @Last Modified by: kerim-selmi, karimation
 * @Last Modified time: 2018-06-01 10:56:13
 */

import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";

/*
 * users details 
 * feature: add clicked button -> user profile
 */
export default (DisplayUser = props => (
  <View>
    <TouchableOpacity onPress={() => {
      props.navigation.navigate('SearchDetails', { username: props.name });
    }} style={styles.row}>
      <Image style={styles.picture} source={{ uri: `https://steemitimages.com/u/${props.name}/avatar` }} />
      <View>
        <Text style={styles.primaryText}>
          {`${props.name}`}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
));

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12
  },
  picture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 18,
    borderWidth: 2,
    borderColor: '#61c2e2',
  },
  primaryText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    marginBottom: 4
  },
  secondaryText: {
    color: "grey"
  }
});