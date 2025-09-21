import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
  Picker,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Line from "./Line";
import { UserContext } from "../context/UserContext";

import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";

HEADER_MAX_HEIGHT = 60;
HEADER_MIN_HEIGHT = 40;
PROFILE_IMAGE_MAX_HEIGHT = 70;
PROFILE_IMAGE_MIN_HEIGHT = 30;

const formdata = new FormData();

const URL = "https://app.merrytimesacademy.com/jengo/edit_profile.php";

function EditProfile({ navigation }) {
  const { state, dispatch } = useContext(UserContext);
  const user_id = state.user_id;
  const user_name = state.user_name;
  const full_name = state.full_name;
  const gender = state.gender;
  const email = state.email;
  const location = state.location;
  const avatar = state.avatar;
  const phone_no = state.phone_no;

  const [avatarSource, setAvatar] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [email_edit, setEmail] = useState(email);
  const [full_name_edit, setFullName] = useState(full_name);
  const [gender_edit, setGender] = useState(gender);
  const [location_edit, setLocation] = useState(location);
  const [phone_no_edit, setPhoneNo] = useState(phone_no);
  const [avatar_edit, setAvatarEdit] = useState(avatar);

  const [selectedValue, setSelectedValue] = useState("java");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,

      aspect: [4, 3],
      quality: 1,
    });
    //console.log(result.uri);
    if (!result.cancelled) {
      setAvatar(result.uri);
    }

    const filePath = result.uri;

    const filename = filePath.replace(/^.*[\\\/]/, "");
    const ext = filename.split(".").pop();
    const file_type = result.type + "/" + ext;

    formdata.append("file", {
      uri: result.uri,
      type: file_type,
      name: filename,
    });
  };

  //console.log(JSON.stringify(formdata));

  const post_data = () => {
    setIsUploading(true);
    formdata.append("user_id", user_id);
    formdata.append("email", email_edit);
    formdata.append("full_name", full_name_edit);
    formdata.append("gender", gender_edit);
    formdata.append("location", location_edit);
    formdata.append("phone_no", phone_no_edit);

    fetch(URL, {
      method: "post",
      body: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson, "responseJson");
        setIsUploading(false);
        /* const full_name_returned=responseJson.name;
        const location_returned=responseJson.location;
        const phone_no_returned=responseJson.phone_no;
        const gender_returned=responseJson.gender;
        const avatar_returned=responseJson.avatar;
        const email_returned=responseJson.email;*/
        const avatar_returned = responseJson.avatar_returned;

        dispatch({
          type: "LOGIN",
          payload: {
            user_id: user_id,
            user_name: user_name,
            full_name: full_name_edit,
            location: location_edit,
            phone_no: phone_no_edit,
            gender: gender_edit,
            avatar: avatar_returned,
            email: email_edit,
          },
        });
        //alert(full_name);
        alert("Profile Updated Successfully");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
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
          marginBottom: HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 10,
        }}
      ></View>

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
          marginBottom: PROFILE_IMAGE_MAX_HEIGHT,
          backgroundColor: "#393636",
        }}
      >
        avatarSource ? (
        <ImageBackground
          style={{
            flex: 1,
            width: null,
            height: null,
            backgroundColor: "#F2F1F1",
            opacity: 0.5,
          }}
          source={{ uri: avatarSource }}
        >
          <View>
            <TouchableWithoutFeedback onPress={pickImage}>
              <Image
                style={{
                  position: "absolute",
                  width: 40,
                  height: 35,
                  backgroundColor: "#F2F1F1",
                  top: 12,
                  left: 12,
                }}
                source={require("../../assets/profile/camera_add.png")}
              />
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>
        ) : (
        <ImageBackground
          style={{
            flex: 1,
            width: null,
            height: null,
            backgroundColor: "#F2F1F1",
            opacity: 0.5,
          }}
          source={{
            uri:
              "https://app.merrytimesacademy.com/jengo/images/profile/" +
              avatar_edit,
          }}
        >
          <View>
            <TouchableWithoutFeedback onPress={pickImage}>
              <Image
                style={{
                  position: "absolute",
                  width: 40,
                  height: 35,
                  backgroundColor: "#F2F1F1",
                  top: 12,
                  left: 12,
                }}
                source={require("../../assets/profile/camera_add.png")}
              />
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>
        )
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: 10,
            padding: 5,
          }}
        >
          <TouchableOpacity
            onPress={post_data}
            style={{
              width: 80,
              borderWidth: 2,
              borderRadius: 5,
              padding: 5,
              borderColor: "#ccc",
            }}
          >
            <Text
              style={{ alignSelf: "center", fontWeight: "bold", fontSize: 14 }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {isUploading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#d93232" animating />
            </View>
          ) : (
            <View style={{ alignItems: "center", marginTop: 10 }}>
              {/*start of add items/services/company display*/}

              <TextInput
                placeholder="Name"
                value={full_name_edit}
                style={styles.input}
                onChangeText={(full_name_edit) => setFullName(full_name_edit)}
              />

              <View style={[styles.input, { justifyContent: "center" }]}>
                <Picker
                  selectedValue={gender_edit}
                  onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>

              <TextInput
                placeholder="Location"
                value={location_edit}
                style={styles.input}
                onChangeText={(location_edit) => setLocation(location_edit)}
              />

              <TextInput
                placeholder="Email"
                value={email_edit}
                style={styles.input}
                onChangeText={(email_edit) => setEmail(email_edit)}
              />

              <TextInput
                placeholder="Phone Number"
                value={phone_no_edit}
                style={styles.input}
                onChangeText={(phone_no_edit) => setPhoneNo(phone_no_edit)}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {/*end of add items/services/company display*/}
    </View>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    width: "93%",
    padding: 5,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
  },
});
