import React, { useState,useRef,useEffect} from "react";
import { Text, View,Button,SafeAreaView,ActivityIndicator,StyleSheet,TextInput,TouchableWithoutFeedback,StatusBar,Platform} from "react-native";
import { SearchBar } from "react-native-screens";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



  
const SearchScreen = ({route,navigation}) => {
  const [search_data,setSearchData]=useState('');
  const searchRef=useRef(null);

  useEffect(()=>
  {
     searchRef.current.focus();
  },[]);

  return (
    <View style={{ marginTop: Platform.OS === 'ios'? 50 : StatusBar.currentHeight}}>
    <View style={styles.searchSection}>
      
      <Ionicons onPress={()=> navigation.navigate('Home')} style={styles.searchIcon} name="arrow-back" size={25} color="#000"/>
      
       <TextInput placeholder="Type your search here" style={styles.input} autoFocus={true} ref={searchRef}/>
       <Ionicons style={styles.optionIcon} name="options" size={27} color="#000"/>
     </View>

    </View>
  );
};
  
export default SearchScreen;

const styles = StyleSheet.create({
    input: {
        height: 45,
        margin: 10,
        width:'75%',
        paddingLeft:10,
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:0,
        color:'#000',
        fontSize:15,
        
        
        
      },
    
      searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
       
        marginTop:StatusBar.height,
        left:0,
        right:0,
        position:'absolute',
        
        borderRadius:5,
        shadowColor: "#000",
        shadowOffset: {
             width: 0,
           height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    
        elevation: 6,
       },
       searchIcon: {
        padding: 10,
        position: 'absolute',
        left:0,
        color:'#a0a1a1'
    },
    optionIcon: {
      padding: 10,
      position: 'absolute',
      right:0,
      color:'#d93232',
    },
    
})