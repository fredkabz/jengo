import React, { useState,useEffect,useContext} from "react";
import { Text, View,Button, Pressable, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



//import { TouchableWithoutFeedback } from "react-native-gesture-handler";
//import { SafeAreaView } from "react-navigation";
//import { UserContext } from "../context/UserContext";

HEADER_MAX_HEIGHT=120;
HEADER_MIN_HEIGHT=70;
PROFILE_IMAGE_MAX_HEIGHT=80;
PROFILE_IMAGE_MIN_HEIGHT=40;

const UserProfile = ({navigation}) => {
  
  //const[user_id,setUserId]=useState('0');
  //const[login_status,setLoginStatus]=useState(false);
  
  const {user_id}=navigation.user_id;
 

  

  
  
  return (
<SafeAreaView>
      {user_id < 1 ?
        <Login_component navigation={navigation} />
        :
        <View style={{ paddingTop: 100 }}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Post", { user_id: user_id })}>
            <View style={{ backgroundColor: '#ccc', color: '#ff0000' }}><Text>Add My Products</Text></View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Post", { user_id: user_id })}>
            <View style={{ backgroundColor: '#ccc', color: '#ff0000' }}><Text>Add Services</Text></View>
          </TouchableWithoutFeedback>
        </View>
      }
    </SafeAreaView>
  );
  
};
  
export default UserProfile;

