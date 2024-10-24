import { View, Text, FlatList, ScrollView } from 'react-native'
import React, {useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import FavoiriteListCard from '../../components/favorite/FavoiriteListCard'

export default function AllBusiness() {
  useFocusEffect(
    useCallback(() => {
      GetBusinessList();
    }, [])
  );

    const [businessList,setBusinessList]=useState([]);

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
<ScrollView>
    <View style={{
    padding:20,
    display:'flex',
    marginTop:10
}}>
   <Text style={{
        fontSize:20,
        fontFamily:'outfit-bold',
    }}>
All Business
</Text> 
</View> 
  <FlatList
data={businessList}
renderItem={({item,index})=>(
    <FavoiriteListCard
    business={item}
    key={index}
    />
)}
/>
</ScrollView>
)
}