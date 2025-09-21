import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Text,
  View,
  Button,
  Pressable,
  SafeAreaView,
  Animated,
  Image,
  nativeEvent,
  contentOffset,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "../context/UserContext";

import Login_component from "./Login_component";
import react from "react";
import Line from "./Line";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

HEADER_MAX_HEIGHT = 90;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 70;
PROFILE_IMAGE_MIN_HEIGHT = 30;

const UserScreen = ({ navigation }) => {
  //const[user_id,setUserId]=useState('0');
  //const[login_status,setLoginStatus]=useState(false);

  //const {user_id}=navigation.user_id;

  const { state, dispatch } = useContext(UserContext);
  const user_id = state.user_id;
  const user_name = state.user_name;
  const full_name = state.full_name;
  const gender = state.gender;
  const email = state.email;
  const location = state.location;
  const avatar = state.avatar;
  const phone_no = state.phone_no;
  const company_id=state.company_id;
  const company_avatar=state.company_avatar;
  const company_name=state.company_name;
  const company_description=state.company_description;
  const company_location=state.company_location;
  const company_phone_number=state.company_phone_number;
  const company_email=state.company_email;
 
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
  });

  return user_id < 1 ? (
    <Login_component navigation={navigation} />
  ) : (
    <react.Fragment>
       
      <SafeAreaView style={{ flex: 1 }}>
       
        <View /*style={{
           position:'absolute',
           top:0,
           left:0,
           right:0,
           backgroundColor:'lightskyblue',
           height:headerHeight,
        }}*/
          style={{
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            backgroundColor: "#BD3737",
            height: HEADER_MAX_HEIGHT,
          }}
        >
          <View style={{ position: "absolute", right: 10, bottom: 5 }}>
            <Text style={{ color: "#fff", fontStyle: "normal", fontSize: 16 }}>
              {user_name}
            </Text>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            height: PROFILE_IMAGE_MAX_HEIGHT,
            width: PROFILE_IMAGE_MAX_HEIGHT,
            borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
            borderColor: "white",
            borderWidth: 3,
            overflow: "hidden",
            marginTop: HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
            marginLeft: 10,
          }}
        >
          {avatar ? (
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                backgroundColor: "#F2F1F1",
              }}
              source={{
                uri: "https://app.merrytimesacademy.com/jengo/" + avatar,
              }}
            />
          ) : (
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                backgroundColor: "#F2F1F1",
              }}
              source={require("../../assets/profile/male.png")}
            />
          )}
        </View>

        <View style={{ marginBottom: 10 }}>
          {/*start of profile text display*/}
          <View
            style={{
              flexDirection: "row",
              alignContent: "space-between",
              marginTop: PROFILE_IMAGE_MAX_HEIGHT / 2,
            }}
          >
            <View style={{ width: "70%" }}>
              <Text
                style={{ fontWeight: "normal", fontSize: 18, paddingLeft: 10 }}
              >
                {full_name}
              </Text>
              <Text
                style={{
                  marginTop: 3,
                  fontWeight: "normal",
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "#5C5A5A",
                }}
              >
                {email}
              </Text>
              <Text
                style={{
                  marginTop: 3,
                  fontWeight: "normal",
                  fontSize: 14,
                  paddingLeft: 10,
                  color: "#5C5A5A",
                }}
              >
                {phone_no}
              </Text>
            </View>
            <View style={{ width: "30%" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Edit_profile", { user_id: user_id })
                }
                style={{
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: "#ccc",
                  width: 100,
                  padding: 5,
                  marginRight: 10,
                  alignSelf: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    textAlign: "right",
                    marginRight: 10,
                  }}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/*end of profile text display*/}

        <Line />

        <View style={{ marginTop: 10 }}>
          {/*start of add items/services/company display*/}
          <View
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style="margin:5"
              onPress={() => navigation.navigate("Add_company", { user_id: user_id })}
            >
              <View style={{ flexDirection: "column" }}>
                <Image
                  style={{ width: 40, height: 40, alignSelf: "center" }}
                  source={require("../../assets/profile/company.png")}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    width: 100,
                    textAlign: "center",
                  }}
                >
                  Add Company
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style="margin:5"
              onPress={() =>
                navigation.navigate("Post", {
                  user_id: user_id,
                  category_id: 1,
                  category_name: "Products",
                })
              }
            >
              <View style={{ flexDirection: "column" }}>
                <Image
                  style={{ width: 40, height: 40, alignSelf: "center" }}
                  source={require("../../assets/profile/product.png")}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    width: 100,
                    textAlign: "center",
                  }}
                >
                  Add Products
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style="margin:5"
              onPress={() =>
                navigation.navigate("Post", {
                  user_id: user_id,
                  category_id: 2,
                  category_name: "Services",
                })
              }
            >
              <View style={{ flexDirection: "column" }}>
                <Image
                  style={{ width: 40, height: 40, alignSelf: "center" }}
                  source={require("../../assets/profile/services.png")}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    width: 100,
                    textAlign: "center",
                  }}
                >
                  Add Services
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/*end of add items/services/company display*/}

        <Line />
        
        {
        company_id != null ?
        
        /*start of company display*/
        <View style={{marginTop:10,flexDirection:"row", alignItems:"center"}}> 
           <View style={{height:PROFILE_IMAGE_MAX_HEIGHT,
            width:PROFILE_IMAGE_MAX_HEIGHT,
            borderRadius:PROFILE_IMAGE_MAX_HEIGHT/2,
            borderWidth:3,
            overflow:"hidden",
            borderColor:"#ccc",
            marginLeft:10,
            }}>
              <Image source={{uri:company_avatar}}/>
           </View>
           <View>
              <Text>{company_name}</Text>
              <Text style={{color:"#6B6B6B"}}>{company_email +"  "+ company_phone_number}</Text>
              <Text style={{color:"#6B6B6B"}}>{company_description}</Text>
           </View>
           <View>
              <TouchableOpacity onPress={()=>{navigation.navigate("Edit_company",{company_id:company_id,user_id:user_id,user_name:user_name})}}>
                <Ionicons name="create" size={25} color="#ccc"/>
              </TouchableOpacity>
           </View>
        </View> 
        /*end of company display*/
        
         :
         null
}
        <Line />


      </SafeAreaView>
    </react.Fragment>
  );
};

export default UserScreen;
