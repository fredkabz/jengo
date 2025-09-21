import React, { useState } from "react";
import { Text, View,Button,ImageProps,TouchableOpacity,Image,Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';



  
const PostScreen = ({navigation,route}) => {
  const [image, setImage] = useState(null);
  const [image_array,setImageArray]=useState([]);
  const user_id=route.params.user_id;
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      
    
    });

    //console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      alert(image);
      //image_array.push(result.uri);
      const new_image_array=[...image_array,image];
      setImageArray(new_image_array);
    }
  };
  const img_list=image_array.map((image) => 
  <Text>{image}</Text>

  );
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#006600", fontSize: 40 }}>Post Screen</Text>
      <Ionicons name="md-person-circle-outline" size={80} color="#006600" />
      <Button
        title="Open Picker"
        onPress={pickImage}
      />
      <View>
        {
        image != null ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        :
        null
}

{img_list}
       
      </View>
      
    </View>
  );
};
  
export default PostScreen;