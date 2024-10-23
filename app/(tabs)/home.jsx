import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/category'
import PopularBusiness from '../../components/Home/PopularBusiness'
export default function home() {
  return (
    <ScrollView>
      <View>
      {/* //header */}
      <Header/>
      {/* Slider */}
      <Slider/>
      {/* Category */}
      <Category/>
      {/* popular buismiss list */}
      <PopularBusiness/>
    </View>
    <View style={{height:50}}></View>
    </ScrollView>
  )
}