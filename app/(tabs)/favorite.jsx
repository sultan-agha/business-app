import FavoiriteListCard from '../../components/favorite/FavoiriteListCard'
import { View, Text, FlatList } from 'react-native'
import React, {useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function favorite() {
    useFocusEffect(
        useCallback(() => {
          GetFavoriteList();
        }, [])
      );
    
        const [favoriteList,setFavoriteList]=useState([]);
    
        const GetFavoriteList=async()=>{
            setFavoriteList([])
        const q= query(collection(db,'FavoriteList'))
        const querySnapshot = await getDocs(q)
    
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setFavoriteList(prev=>[...prev,{id:doc.id,...doc.data()}])
        })
      }
      
  return (
    <View>
        <View style={{
        padding:20,
        display:'flex',
        marginTop:10
    }}>
       <Text style={{
            fontSize:20,
            fontFamily:'outfit-bold',
        }}>
    Favorite Business
  </Text> 
    </View> 
      <FlatList
    data={favoriteList}
    renderItem={({item,index})=>(
        <FavoiriteListCard
        business={item}
        key={index}
        />
    )}
    />
    </View>
  )
}