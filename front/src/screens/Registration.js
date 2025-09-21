import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Alert,Button,TextInput,Text, View,Image,TouchableOpacity, StatusBar, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";



import { ScreenStackHeaderRightView } from "react-native-screens";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

  
class LoginScreen extends Component{
    constructor(props) {
 
        super(props)
        const { navigate } = this.props.navigation;
        //const {route}=this.props.route;
        this.state = {

          registerShow: false,
          UserName: '',
          UserEmail: '',
          UserPassword: '',
          user_name:'',
          user_id:'',
          
     
        }
     
      }
      UserRegistrationFunction = () =>{
 
 
        const { UserName, UserEmail , UserPassword}  = this.state;
        

           
        
       fetch('https://funzasoft.grahopesolutions.com/jengo/user_registration.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
           name: UserName,
        
           email: UserEmail,
        
           password: UserPassword,
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
       // Showing response message coming from server after inserting records.
               Alert.alert(responseJson);
               if(responseJson > 0)
               {
                 // alert(responseJson);
                 this.props.navigation.navigate("Home")
               }
        
             }).catch((error) => {
               console.error(error);
             });
        
        
         }


         UserLoginFunction = () =>{
 
            
            const { UserName , UserPassword}  = this.state;
            
    
            
            this.props.navigation.navigate("Account",{user_id:1,login_status:true})
            
            
           fetch('https://funzasoft.grahopesolutions.com/jengo/user_login.php', {
             method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({
            
               name: UserName,
            password: UserPassword,
            
             })
            
           }).then((response) => response.json())
                 .then((responseJson) => {
            
           // Showing response message coming from server after inserting records.
           //alert("niaje");
                   if(responseJson.response_type === "error")
                   {
                     alert(responseJson.msg);
                   }
                   else
                   {
                     //alert(responseJson.user_name);
                     this.setState={user_name:responseJson.user_name};
                     this.setState={user_id:responseJson.user_id};
                    //alert(this.state.user_id=responseJson.user_id);
                   //alert(this.state.user_name=responseJson.user_name);
                   
                   //alert("niaje");
                    this.props.navigation.navigate("Account",{user_id:this.state.user_id,login_status:true});
                   }
                    /*this.setState={user_name:responseJson.user_name};
                    this.setState={user_id:responseJson.user_id};
                  alert(this.state.user_id=responseJson.user_id);
                   alert(this.state.user_name=responseJson.user_name);
                   
                  alert("niaje");
                    this.props.navigation.navigate("Home",{user_id:this.state.user_id,login_status:true});
                  */
            
                 }).catch((error) => {
                   console.error(error);
                 });
            
            
             }

      render()

      {
        const openLogin= ()=>{
           this.setState({registerShow:false})
        }
        const openRegister= ()=>{
            this.setState({registerShow:true})
         }
        return (
 
            <ScrollView style={styles.MainContainer}>
               

                    { this.state.registerShow ?
                <View>
                   
                    <View style={{flex:1, flexDirection:"row",justifyContent:'space-around',alignItems:'baseline', margin:20}}>
                    <View style={{width:'20%', justifyContent:'flex-start'}}>
                    <TouchableWithoutFeedback onPress={()=> this.props.navigation.goBack()}>
                       <Ionicons name="arrow-back" size={25}/>
                    </TouchableWithoutFeedback>
                    </View>
                    <View style={{width:'auto'}}>
                    
                    <TouchableOpacity onPress={ ()=> openLogin() }>
                        <Text style={{
                           color:this.state.registerShow ? '#b1b1b3' : '#000',
                           fontSize:20,
                           fontWeight:'600'
                           

                        }}>LOGIN</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{width:'auto'}}>
                   
                    <TouchableOpacity onPress={ ()=> openRegister()}>
                        <Text style={{
                           color:this.state.registerShow ? '#000' : '#b1b1b3',
                           fontSize:20,
                           borderBottomWidth:2,
                           borderBottomColor:'#ff8a00',
                           fontWeight:'600',
                           textDecorationStyle:'solid',
                           textDecorationColor:'ff8a00'

                        }}>REGISTER</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{width:'20%'}}></View>
                    </View>
                   
                    <View style={styles.searchSection}>
                    <Ionicons style={styles.searchIcon} name="person" size={25} color="#000"/>
                    <TextInput
                      
                      // Adding hint in Text Input using Place holder.
                      placeholder="Enter User Name"
             
                      onChangeText={UserName => this.setState({UserName})}
             
                      // Making the Under line Transparent.
                      underlineColorAndroid='transparent'
             
                      style={styles.input}
                    />
                    </View>
                    <View style={styles.searchSection}>
                     <Ionicons style={styles.searchIcon} name="mail" size={25} color="#000"/>
                    <TextInput
                      
                      // Adding hint in Text Input using Place holder.
                      placeholder="Enter User Email"
             
                      onChangeText={UserEmail => this.setState({UserEmail})}
             
                      // Making the Under line Transparent.
                      underlineColorAndroid='transparent'
             
                      style={styles.input}
                    />
                    </View>
                    <View style={styles.searchSection}>
                    <Ionicons style={styles.searchIcon} name="key" size={25} color="#000"/>
                    <TextInput
                      secureTextEntry={true}
                      // Adding hint in Text Input using Place holder.
                      placeholder="Enter User Password"
             
                      onChangeText={UserPassword => this.setState({UserPassword})}
             
                      // Making the Under line Transparent.
                      underlineColorAndroid='transparent'
             
                      style={styles.input}
            
                      secureTextEntry={true}
                    />
                    </View>
                    <View style={{marginTop:20, marginRight: 10, marginLeft:10}}>
                        <TouchableOpacity onPress={this.UserRegistrationFunction} 
                        style={{width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#ff8a00', padding: 10, borderRadius:5}} >
                    <Text style={{fontSize:17, fontWeight:'bold', color:'#fff'}}>Create Account</Text>
                    </TouchableOpacity>
                    </View>
                 </View>
                 : <View>
                
                 <View style={{flex:1, flexDirection:"row",justifyContent:'space-around',alignItems:'baseline', margin:20}}>

                 <View style={{width:'20%', justifyContent:'flex-start'}}>
                    <TouchableWithoutFeedback onPress={()=> this.props.navigation.goBack()}>
                       <Ionicons name="arrow-back" size={25}/>
                    </TouchableWithoutFeedback>
                    </View>
                 <View style={{width:'auto'}}>
                     <TouchableOpacity onPress={ ()=> openLogin()}>
                     <Text style={{
                        color:this.state.registerShow ? '#b1b1b3' : '#000',
                        fontSize:20,
                        fontWeight:'600',
                        borderBottomWidth:2,
                        borderBottomColor:'#ff8a00',
                        
                        

                     }}>LOGIN
                     </Text>
                     </TouchableOpacity>
                 </View>
                
                 <View style={{width:'auto'}}>
                 <TouchableOpacity onPress={ ()=> openRegister()}>
                     <Text style={{
                        color:this.state.registerShow ? '#000' : '#b1b1b3',
                        fontSize:20,
                        fontWeight:'600'

                     }}>REGISTER</Text>
                 </TouchableOpacity>
                 </View>
                 <View style={{width:'20%'}}>
                  
                 </View>
                 
                 </View>
                 <View style={styles.searchSection}>
                    <Ionicons style={styles.searchIcon} name="person" size={25} color="#000"/>
                    <TextInput
                      
                      // Adding hint in Text Input using Place holder.
                      placeholder="Enter User Name"
             
                      onChangeText={UserName => this.setState({UserName})}
             
                      // Making the Under line Transparent.
                      underlineColorAndroid='transparent'
             
                      style={styles.input}
                    />
                    </View>
                 <View style={styles.searchSection}>
                 <Ionicons style={styles.searchIcon} name="key" size={25} color="#000"/>
                 <TextInput
                   secureTextEntry={true}
                   // Adding hint in Text Input using Place holder.
                   placeholder="Enter User Password"
          
                   onChangeText={UserPassword => this.setState({UserPassword})}
          
                   // Making the Under line Transparent.
                   underlineColorAndroid='transparent'
          
                   style={styles.input}
         
                   secureTextEntry={true}
                 />
                 </View>
                 <View style={{marginTop:20, marginRight: 10, marginLeft:10}}>
                        <TouchableOpacity onPress={this.UserLoginFunction} 
                        style={{width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#ff8a00', padding: 10, borderRadius:5}} >
                    <Text style={{fontSize:17, fontWeight:'bold', color:'#fff'}}>Login</Text>
                    </TouchableOpacity>
                    </View>
              </View>
      }
               
                    
                  
                
             
            </ScrollView>
                        
                );
              }
      }
 
      



  
export default LoginScreen;
const styles = StyleSheet.create({
 
    MainContainer :{
     
  
    flex:1,
    marginTop:StatusBar.currentHeight,
    backgroundColor:'#fff'
    },
     
    input: {
        
        height: 50,
        margin: 10,
        width:'85%',
        paddingLeft:10,
        borderRadius:5,
        borderWidth:0,
        borderColor:'#ccc',
        color:'#000',
        fontSize:15,
        
        
        
      },
    searchSection: {
       alignItems:'flex-end',
       width:'95%',
        margin:10,
        height:50,
        borderWidth:0,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
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
        position: 'absolute',
        left:0,
        color:'#a0a1a1',
        margin:10
    },
     
    });
     
   // AppRegistry.registerComponent('LoginScreen', () => LoginScreen);