import { View, Text } from 'react-native'
import React from 'react'

export default function AboutSection({business}) {
  return (
    <View style={{
        padding:20,
        backgroundColor:'#fff',
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>About</Text>
      <Text style={{
        fontFamily:'outfit-regular',
        lineHeight:25
      }}>{business?.about}</Text>
    </View>
  )
}