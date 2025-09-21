import React from  'react';
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Line from "./Line"
  

HEADER_MAX_HEIGHT=60;
HEADER_MIN_HEIGHT=70;
PROFILE_IMAGE_MAX_HEIGHT=70;
PROFILE_IMAGE_MIN_HEIGHT=30;

function EditProfile(props,route) {
     
    return (
    
      <View style={{flex:1}}>

      <View /*style={{
         position:'absolute',
         top:0,
         left:0,
         right:0,
         backgroundColor:'lightskyblue',
         height:headerHeight,
      }}*/
      style={{
        marginTop:0,
        marginLeft:0,
        marginRight:0,
        backgroundColor:'#BD3737',
         height:HEADER_MAX_HEIGHT,
      }}>
        </View>

         <View style={{
           position:'absolute',
           height:PROFILE_IMAGE_MAX_HEIGHT,
           width:PROFILE_IMAGE_MAX_HEIGHT,
           borderRadius:PROFILE_IMAGE_MAX_HEIGHT / 2,
           borderColor:'white',
           borderWidth:3,
           overflow:'hidden',
           marginTop:HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT / 2),
           marginLeft:10,
          backgroundColor:'#393636',
          Image:{}
          
           }}>
              <Image style={{flex:1,width:null,height:null,opacity: .5}} source={require('../../assets/profile/male.png')}/>
              
         </View>

         <View style={{marginBottom:10}}>{/*start of profile text display*/}
              <View style={{flexDirection:"row",alignContent:"space-between",marginTop:PROFILE_IMAGE_MAX_HEIGHT / 2}}>
             <View style={{width:'40%'}}>
               <Text style={{fontWeight:'normal',fontSize:18,paddingLeft:10}}>Fredrick Kaberia</Text>
               <Text style={{marginTop:3,fontWeight:'normal',fontSize:14,paddingLeft:10,color:'#5C5A5A'}}>fredkabz@gmail.com</Text>
             </View>
             <View style={{width:'60%'}}>
               <TouchableOpacity onPress={()=> navigation.navigate("Edit_profile",{user_id:user_id})}  style={
               { 
                 
                
                 borderRadius:5,
                 borderWidth:2,
                 borderColor:'#ccc',
                 width:100,
                 padding:5,
                 marginRight:10,
                 alignSelf:'flex-end',
                 
                 }
                 
                }>
                  <Text style={{fontSize:14,fontWeight:'bold',textAlign:'right',marginRight:10}}>Edit Profile</Text>
              </TouchableOpacity>
              
            
              </View>
             
             </View>
         </View>{/*end of profile text display*/}


         <Line/>

        
    
 
  </View>

    );
}

export default EditProfile;

