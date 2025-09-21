import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  ImageProps,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Picker,KeyboardAvoidingView
  
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from "expo-image-picker";
import { RollInLeft } from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import Line from "./Line";
import LoginScreen from "./LoginScreen";
let fd = new FormData();

const PostScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [image_array, setImageArray] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [category_array, setCategoryArray] = useState([]);
  const [sub_category_name_selected, setSubCategoryName] =
    useState("Select Category");
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState(null);

  const user_id = route.params.user_id;
  const category_id = route.params.category_id;
  const category_name = route.params.category_name;

  //alert(user_id);

  useEffect(() => {
    //alert(category_id);
    image != null ? setImageArray([...image_array, image]) : null;
    //alert(category_id)
    fetch("https://app.merrytimesacademy.com/jengo/get_categories.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_id: category_id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setCategoryArray(responseJson);
        //console.log(category_array);
      })
      .catch((error) => {
        Alert(error);
      });
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,

      aspect: [4, 3],
      quality: 0.3,
      maxWidth: 225,
      maxHeight: 225,
    });

    console.log(result);

    if (!result.cancelled) {
      const filePath = result.uri;

      const filename = filePath.replace(/^.*[\\\/]/, "");
      const ext = filename.split(".").pop();
      const file_type = result.type + "/" + ext;

      setImage(result.uri);

      fd.append("file[]", {
        uri: result.uri,
        type: file_type,
        name: filename,
      });
      //setImageArray([...image_array,image])
      //alert(image);
      //image_array.push(result.uri);
      //const new_image_array=[...image_array,image];
      //setImageArray(new_image_array);
    }
  };
  const img_list = image_array.map((image, i) => (
    <Image key={i} source={{ uri: image }} style={{ width: 50, height: 50 }} />
  ));

  const upload_post = () => {
    setIsUploading(true);
    fd.append("category_id", category_id);
    fd.append("category_name", category_name);
    fd.append("user_id", user_id);
    fd.append("title", title);
    fd.append("description", description);

    fd.append("location", location);
    fd.append("price", price);
    fd.append("sub_category_name", sub_category_name_selected);

    fetch("https://app.merrytimesacademy.com/jengo/add_post.php", {
      method: "POST",
      body: fd,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //alert("Post Successful Added")
        setIsUploading(false);
        if (responseJson.msg_type === "success") {
          alert("Post Added Successfully");
        }
        if (responseJson.msg_type === "error") {
          alert("Post addes successfully");
        }
        console.log(responseJson);
        setImageArray([]);
        setImage(null);
        
        alert("Post Added Successfully");
      })
      .catch((error) => {
        Alert(error);
      });
  };

  /*displayItems = ({ item }) => {
    return (
      <Picker.Item
        label={item.sub_category_name}
        value={item.sub_category_name}
      />
    );
  };*/

  return (
  
    <ScrollView nestedScrollEnabled={true} style={{flex:1}}>
      {isUploading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop:150,
          }}
        >
          <ActivityIndicator size="large" color="#d93232" animating />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            marginLeft: 15,
            marginRight: 15,
            top: 20,
            bottom: 50,
            backgroundColor: "#ffffff",
            elevation: 20,
            borderRadius: 8,
            shadowColor: "#52006A",
            padding: 5,
          }}
        >
          <View style={{ padding: 10, margin: 2 }}>
            <Ionicons name="list" size={25} color="#6F9E4C">
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  padding: 10,
                  color: "#6F9E4C",
                }}
              >
                Post {category_name}
              </Text>
            </Ionicons>
          </View>

          <Line />

          <View style={[styles.input, { justifyContent: "center" }]}>
            <Picker
              selectedValue={sub_category_name_selected}
              onValueChange={(itemValue, itemIndex) =>
                setSubCategoryName(itemValue)
              }
            >
              <Picker.Item
                label={sub_category_name_selected}
                value={sub_category_name_selected}
              />
              {category_array.map((item) => {
                return (
                  <Picker.Item
                    label={item.sub_category_name}
                    value={item.sub_category_name}
                  />
                );
              })}
            </Picker>
          </View>

          <View style={{ flex: 1, marginTop: 10 }}>
            <TextInput
              placeholder="Title*"
              style={styles.input}
              onChangeText={(title) => setTitle(title)}
            />

            <TextInput
              placeholder="Description*"
              style={styles.input}
              onChangeText={(description) => setDescription(description)}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              display: "flex",
            }}
          >
            <View style={{ height: 75, width: 70, alignItems: "center" }}>
              <TouchableOpacity style={{ padding: 1 }} onPress={pickImage}>
                <Ionicons
                  style={{ alignSelf: "center" }}
                  name="add-circle"
                  size={55}
                  color="#6F9E4C"
                />
                <Text style={{ fontSize: 12 }}>Add Image</Text>
              </TouchableOpacity>
            </View>
            {image_array.length > 0 ? (
              <ScrollView
                nestedScrollEnabled={true}
                horizontal
                contentContainerStyle={{ flexDirection: "row-reverse" }}
              >
                {image_array.map((image, i) => (
                  <View style={{ margin: 5, borderRadius: 5, elevation: 5 }}>
                    <Image
                      key={i}
                      source={{ uri: image }}
                      style={{ width: 70, height: 70, borderRadius: 5 }}
                    />
                  </View>
                ))}
              </ScrollView>
            ) : null}
          </View>

          <View style={{ flex: 1, marginTop: 10 }}>
            <TextInput
              placeholder="Location*"
              style={styles.input}
              onChangeText={(location) => setLocation(location)}
            />
            <TextInput
              placeholder="Price*"
              style={styles.input}
              onChangeText={(price) => setPrice(price)}
            />

            <TouchableOpacity
              style={{
                backgroundColor: "#6F9E4C",
                padding: 10,
                marginTop: 10,
                marginBottom: 100,
                alignSelf: "center",
                width: "70%",
                borderRadius: 5,
              }}
              onPress={upload_post}
            >
              <Text
                style={{ color: "#fff", alignSelf: "center", fontSize: 16 }}
              >
                Upload Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
    
  );
};

export default PostScreen;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },

  input: {
    height: 50,
    margin: 10,
    width: "95%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#252222",
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
