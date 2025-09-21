import React, { Component, useContext, useState } from "react";
import {
  AppRegistry,
  StyleSheet,
  Alert,
  Button,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CommonActions } from "@react-navigation/native";

import { ScreenStackHeaderRightView } from "react-native-screens";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserContext } from "../context/UserContext";

const Login_component = ({ navigation }) => {
  const { state, dispatch } = useContext(UserContext);

  
  //const {route}=props.route;
  const [registerShow, setRegisterShow] = useState(false);
  const [UserName, setUserName] = useState("");
  const [UserName_reg, setUserName_reg] = useState("");
  const [UserEmail, setUserEmail] = useState("");

  const [full_name_reg, setFullName] = useState(null);
  const [gender_reg, setGender] = useState(null);
  const [location_reg, setLocation] = useState(null);
  const [phone_no_reg, setPhoneNo] = useState(null);
  const [avatar_reg, setAvatar] = useState(null);

  const [UserPassword, setUserPassword] = useState("");
  const [UserPassword_reg, setUserPassword_reg] = useState("");
  //const [user_id,setUserId]=useState();

  const openLogin = () => {
    setRegisterShow(false);
  };
  const openRegister = () => {
    setRegisterShow(true);
  };

  const UserLoginFunction = ({ UserName, UserPassword }) => {
    fetch("https://app.merrytimesacademy.com/jengo/user_login.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: UserName,
        password: UserPassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.response_type === "error") {
          alert(responseJson.msg);
        } else {
          //console.log(responseJson);
          const user_name_returned = responseJson.user_name;
          const user_id_returned = responseJson.user_id;
          const full_name_returned = responseJson.name;
          const location_returned = responseJson.location;
          const phone_no_returned = responseJson.phone_no;
          const gender_returned = responseJson.gender;
          const avatar_returned = responseJson.avatar;
          const email_returned = responseJson.email;
          const company_name = responseJson.company_name;
          const company_description = responseJson.company_description;
          const company_email = responseJson.company_email;
          const company_location = responseJson.company_location;
          const company_phone_number = responseJson.company_phone_number;
          const company_avatar = responseJson.company_avatar;

          dispatch({
            type: "COMBINED",
            payload: {
              user_id: user_id_returned,
              user_name: user_name_returned,
              full_name: full_name_returned,
              location: location_returned,
              phone_no: phone_no_returned,
              gender: gender_returned,
              avatar: avatar_returned,
              email: email_returned,
              company_name: company_name,
              company_description: company_description,
              company_email: company_email,
              company_location: company_location,
              company_phone_number: company_phone_number,
              company_avatar: company_avatar,
            },
          });

          /* dispatch({
            type: "COMPANY_DATA",
            payload: {
              company_name: company_name,
              company_description: company_description,
              company_email: company_email,
              company_location: company_location,
              company_phone_number: company_phone_number,
              company_avatar: company_avatar,
            },
          })*/

          /*dispatch({
            type: "COMPANY_DATA",
            payload: {
              company_name: company_name,
              company_description: company_description,
               company_email:company_email,
               company_location:company_location,
               company_phone_number:company_phone_number,
               company_avatar:company_avatar,
             
            },
          });*/

          //alert(user_id_returned);
          //navigation.navigate("Account",{user_id:state.user_id,login_status:true});
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const UserRegistrationFunction = () => {
    //alert(UserName_reg)

    fetch("https://app.merrytimesacademy.com/jengo/user_registration.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: UserName_reg,
        email: UserEmail,
        password: UserPassword_reg,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const user_name_returned_reg = responseJson.user_name;
        const user_id_returned_reg = responseJson.user_id;

        if (responseJson.msg_type === "error") {
          alert(responseJson.msg);
        } else {
          dispatch({
            type: "LOGIN",
            payload: { user_id: user_id_returned_reg },
          });
        }
      })
      .catch((error) => {
        Alert(error);
      });
  };

  return (
    <ScrollView style={styles.MainContainer}>
      {registerShow === true ? (
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "baseline",
              margin: 20,
            }}
          >
            <View style={{ width: "20%", justifyContent: "flex-start" }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={25} />
              </TouchableOpacity>
            </View>
            <View style={{ width: "auto" }}>
              <TouchableOpacity onPress={() => openLogin()}>
                <Text
                  style={{
                    color: registerShow ? "#b1b1b3" : "#000",
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "auto" }}>
              <TouchableOpacity onPress={() => openRegister()}>
                <Text
                  style={{
                    color: registerShow ? "#000" : "#b1b1b3",
                    fontSize: 20,
                    borderBottomWidth: 2,
                    borderBottomColor: "#ff8a00",
                    fontWeight: "600",
                    //textDecorationStyle:'solid',
                    //textDecorationColor:'ff8a00'
                  }}
                >
                  REGISTER
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "20%" }}></View>
          </View>
          <ScrollView>
            <View style={styles.searchSection}>
              <Ionicons
                style={styles.searchIcon}
                name="person"
                size={25}
                color="#000"
              />
              <TextInput
                // Adding hint in Text Input using Place holder.
                placeholder="Enter User Name"
                onChangeText={(UserName_reg) => setUserName_reg(UserName_reg)}
                // Making the Under line Transparent.
                underlineColorAndroid="transparent"
                style={styles.input}
              />
            </View>
            <View style={styles.searchSection}>
              <Ionicons
                style={styles.searchIcon}
                name="mail"
                size={25}
                color="#000"
              />
              <TextInput
                // Adding hint in Text Input using Place holder.
                placeholder="Enter User Email"
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                // Making the Under line Transparent.
                underlineColorAndroid="transparent"
                style={styles.input}
              />
            </View>
            <View style={styles.searchSection}>
              <Ionicons
                style={styles.searchIcon}
                name="key"
                size={25}
                color="#000"
              />
              <TextInput
                secureTextEntry={true}
                // Adding hint in Text Input using Place holder.
                placeholder="Enter User Password"
                onChangeText={(UserPassword_reg) =>
                  setUserPassword_reg(UserPassword_reg)
                }
                // Making the Under line Transparent.
                underlineColorAndroid="transparent"
                style={styles.input}
                secureTextEntry={true}
              />
            </View>
          </ScrollView>
          <View style={{ marginTop: 20, marginRight: 10, marginLeft: 10 }}>
            <TouchableOpacity
              onPress={() => UserRegistrationFunction()}
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ff8a00",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "bold", color: "#fff" }}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "baseline",
              margin: 20,
            }}
          >
            <View style={{ width: "20%", justifyContent: "flex-start" }}>
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={25} />
              </TouchableWithoutFeedback>
            </View>
            <View style={{ width: "auto" }}>
              <TouchableOpacity onPress={() => openLogin()}>
                <Text
                  style={{
                    color: state.registerShow ? "#b1b1b3" : "#000",
                    fontSize: 20,
                    fontWeight: "600",
                    borderBottomWidth: 2,
                    borderBottomColor: "#ff8a00",
                  }}
                >
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: "auto" }}>
              <TouchableOpacity onPress={() => openRegister()}>
                <Text
                  style={{
                    color: state.registerShow ? "#000" : "#b1b1b3",
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  REGISTER
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "20%" }}></View>
          </View>

          <ScrollView>
            <View style={styles.searchSection}>
              <Ionicons
                style={styles.searchIcon}
                name="person"
                size={25}
                color="#000"
              />
              <TextInput
                // Adding hint in Text Input using Place holder.
                placeholder="Enter User Name"
                onChangeText={(UserName) => setUserName(UserName)}
                // Making the Under line Transparent.
                underlineColorAndroid="transparent"
                style={styles.input}
              />
            </View>
            <View style={styles.searchSection}>
              <Ionicons
                style={styles.searchIcon}
                name="key"
                size={25}
                color="#000"
              />
              <TextInput
                secureTextEntry={true}
                // Adding hint in Text Input using Place holder.
                placeholder="Enter User Password"
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                // Making the Under line Transparent.
                underlineColorAndroid="transparent"
                style={styles.input}
                secureTextEntry={true}
              />
            </View>
          </ScrollView>

          <View style={{ marginTop: 20, marginRight: 10, marginLeft: 10 }}>
            <TouchableOpacity
              onPress={() => UserLoginFunction({ UserName, UserPassword })}
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ff8a00",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "bold", color: "#fff" }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Login_component;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },

  input: {
    height: 50,
    margin: 10,
    width: "85%",
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: "#ccc",
    color: "#000",
    fontSize: 15,
  },
  searchSection: {
    alignItems: "flex-end",
    width: "95%",
    margin: 10,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    //borderRadius:5,
    //shadowColor: "#000",
    /*shadowOffset: {
             width: 0,
           height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    
        elevation: 6,*/
  },
  searchIcon: {
    padding: 10,
    position: "absolute",
    left: 0,
    color: "#a0a1a1",
    margin: 10,
  },
});

// AppRegistry.registerComponent('LoginScreen', () => LoginScreen);
