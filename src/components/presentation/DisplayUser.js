/*
 * @Author: kerim-selmi, karimation 
 * @Date: 2018-06-01 10:33:38 
 * @Last Modified by:   kerim-selmi, karimation 
 * @Last Modified time: 2018-06-01 10:33:38 
 */

 import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default (DisplayUser = props => (
  <View>
    <TouchableOpacity onPress={() => { Alert.alert(`${props.name} ${props.firstName}`); }} style={styles.row}>
      <Image style={styles.picture} source={{ uri: props.picture }} />
      <View>
        <Text style={styles.primaryText}>
          {`${props.name} ${props.firstName}`}
        </Text>
        <Text style={styles.secondaryText}>{props.email}</Text>
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
    marginRight: 18
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