import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default (DisplayUser = props => (
  <View>
    <TouchableOpacity onPress={this._onPressButton} style={styles.row}>
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