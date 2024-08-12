import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs } from 'expo-router'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors';
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';

export default function TabLayout() {

  return (
    <Tabs screenOptions={
      {
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#121212',
          borderWidth: 0,
          borderColor: '#121212'
        }
      }
    }>

      <Tabs.Screen name='home'
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
        }} />
      <Tabs.Screen name='find'
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />
        }} />
      <Tabs.Screen name='myprofile'
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />
        }} />
    </Tabs>
  )
}