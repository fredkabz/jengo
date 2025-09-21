import React from  'react';
import {View,Text,StyleSheet} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
  


function CategoryDetails(props) {
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#006600", fontSize: 40 }}>Settings Screen!</Text>
      <Ionicons name="list-box" size={80} color="#ccc" />
    </View>
    );
}

export default CategoryDetails;

