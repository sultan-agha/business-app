import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import PopularBusinessCard from './PopularBusinessCard'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import {useRouter } from 'expo-router'
export default function PopularBusiness() {
  const router= useRouter();
  useFocusEffect(
    useCallback(() => {
      GetBusinessList();
    }, [])
  );

    const [bussinessList,setBusinessList]=useState([]);

    const GetBusinessList=async()=>{
        setBusinessList([])
    const q= query(collection(db,'BusinessList'))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc)=>{
        console.log(doc.data());
        setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
    })
  }
    return (
        <View>
           <View style={{
        padding:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10
    }}>
       <Text style={{
            fontSize:20,
            fontFamily:'outfit-bold',
        }}>
    Popular Business
  </Text> 
  <TouchableOpacity onPress={()=>router.push('/business/all-business')}>
  <Text style={{
    fontFamily:'outfit-medium',
    color:Colors.Primary
  }}>View all</Text>
</TouchableOpacity>
    </View> 
    <FlatList
    data={bussinessList}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    renderItem={({item,index})=>(
        <PopularBusinessCard
        business={item}
        key={index}
        />
    )}
    />
    </View>
    
  )
}