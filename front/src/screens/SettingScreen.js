import React, { useContext } from "react";
import { Button, Text, View, TextInput,FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from '../context/UserContext';
  
const SettingScreen = () => {
 const {state} = useContext(UserContext);
 // const user_id=route.params.user_id || '0';
  return (
  
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
     
     
      <Text>{state.user_id} User Name {state.user_name}</Text>
      
    </View>

  );
};
  
export default SettingScreen;