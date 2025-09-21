import React, { useState,useEffect } from "react";
import { Text, View,Button,ImageProps,TouchableOpacity,Image,Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImageManipulator from 'expo-image-manipulator';
import {ImageBrowser} from 'expo-image-picker-multiple';

import * as ImagePicker from 'expo-image-picker';



  
const PostScreen = ({navigation,route}) => {
  const [image, setImage] = useState(null);
  const [image_array,setImageArray]=useState([]);
  const [photos,setPhotos]=useState([]);
  const user_id=route.params.user_id;

   useEffect(()=>{
        const [params]=route.params;
        if(params){
          const {photos}=params;
          if(photos) setPhotos(photos);
          delete params.photos;
        }
      
   }
   ,[]);

  renderImage(item,i)
  {
    return(
      <Image style={{height:50,width:50}}
      source={{uri:item.uri}}
      key={i}
      />
    )
  }
   
  _getHeaderLoader= ()=> (
    <ActivityIndicator size='small' color={'#0580FF'}/>
  );

  imagesCallBack=(callback)=> {
    
  }

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