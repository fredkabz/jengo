import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Ionicons} from '@expo/vector-icons';

import HomeScreen from "./src/screens/HomeScreen";
import UserScreen from "./src/screens/UserScreen";
import SettingScreen from "./src/screens/SettingScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import LoginScreen from "./src/screens/LoginScreen";
//import PostScreen from "./src/screens/PostScreen";
import SearchScreen  from "./src/screens/SearchScreen";

import AddAdvert from "./src/screens/AddAdvert";
import AdvertDetails from "./src/screens/AdvertDetails";
import CategoryDetails from "./src/screens/CategoryDetails";
import EditProfile from "./src/screens/EditProfile";
import MessageDetails from "./src/screens/MessageDetails";
import MessageList from "./src/screens/MessageList";

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const HomeStack=createNativeStackNavigator();
function HomeStackScreen()
{
  return(
    <HomeStack.Navigator>
       <HomeStack.Screen name="Search" component={HomeScreen} />
       <HomeStack.Screen name="LoginPage" component={LoginScreen} />
       <HomeStack.Screen name="Search" component={SearchScreen}/>
       <CategoriesStack.Screen name='Category_details' component={CategoryDetails}/>
      <CategoriesStack.Screen name='Advert_details' component={AdvertDetails}/>
    </HomeStack.Navigator>
  );
}

const CategoriesStack=createNativeStackNavigator();

function CategoriesStackScreen()
{
  return(
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen name='Categories' component={CategoriesScreen}/>
      <CategoriesStack.Screen name='Category_details' component={CategoryDetails}/>
      <CategoriesStack.Screen name='Advert_details' component={AdvertDetails}/>
    </CategoriesStack.Navigator>
  );
}

const AccountStack=createNativeStackNavigator()

function AccountStackScreen()
{
  return(
    <AccountStack.Navigator>
      <AccountStack.Screen name='Account' component={UserScreen}/>
      <AccountStack.Screen name='Edit_profile' component={EditProfile}/>
      <AccountStack.Screen name='Add_advert' component={AddAdvert}/>
      <AccountStack.Screen name='Advert_details' component={AdvertDetails}/>
      <AccountStack.Screen name='Messages_list' component={MessageList}/>
      <AccountStack.Screen name='Message_details' component={MessageDetails}/>
    </AccountStack.Navigator>
  );
}

const SettingsStack=createNativeStackNavigator();

function SettingsStackScreen()
{
  return(
     <SettingsStack.Navigator>
       <SettingsStack.Screen name='Settings' component={SettingScreen}/>
     </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={
        {
          headerShown:false,
          tabBarShowLabel:true,
          tabBarActiveTintColor: '#d93232',
          tabBarStyle: 
          {
          height: 50,
          paddingHorizontal: 2,
          paddingTop: 0,
         
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: '#eaebef',
         },
       }
      }  >

        <Tab.Screen name='Home' component={HomeStackScreen} options={{
             tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="home"
                  size={20}
                  color={tabInfo.focused ? "#d93232" : "#8e8e93"}
                />
              );
            },
           }} />
        <Tab.Screen name='Categories' component={CategoriesStackScreen} options={{
             tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="list"
                  size={20}
                  color={tabInfo.focused ? "#cf1818" : "#8e8e93"}
                />
              );
            },
           }}/>
        <Tab.Screen name='Account' component={AccountStackScreen} options={{
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="person"
                  size={20}
                  color={tabInfo.focused ? "#cf1818" : "#8e8e93"}
              />
            );
           },
          }} />
        <Tab.Screen name='Settings' component={SettingsStackScreen} options={{
             tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="settings"
                  size={20}
                  color={tabInfo.focused ? "#cf1818" : "#8e8e93"}
                />
              );
            },
           }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
