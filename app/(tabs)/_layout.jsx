import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from './../../constants/Colors'
export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown: false, // This removes the app bar globally for all screens
      }}>
        <Tabs.Screen name='home'
        options={{
            tabBarLabel:'Home',
            tabBarIcon:({color})=>
                <Ionicons name='home'
            size={24} color={color}/>,
            tabBarActiveTintColor:Colors.Primary
        }}
        />
        <Tabs.Screen name='explore'
        options={{
            tabBarLabel:'Explore',
            tabBarIcon:({color})=>
                <Ionicons name='search'
            size={24} color={color}/>,
            tabBarActiveTintColor:Colors.Primary
        }}
        />
        <Tabs.Screen name='profile'
        options={{
            tabBarLabel:'Profile',
            tabBarIcon:({color})=>
                <Ionicons name='people-circle'
            size={24} color={color}/>,
            tabBarActiveTintColor:Colors.Primary
        }}
        />
    </Tabs>
  )
}