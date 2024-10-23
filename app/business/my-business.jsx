import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { db, } from '../../config/FirebaseConfig'
import { getDocs, query , collection, where } from 'firebase/firestore';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function MyBusiness() {
  const {user}=useUser();
  const [businessList,setBusinessList]=useState([]);
  const [loading,setLoading]=useState(false)
  const navigation=useNavigation()
  useEffect(()=>{
    navigation.setOptions({
        headerShown:true,
        headerTitle:"My Business",
        headerStyle:{
            backgroundColor:Colors.Primary
        }
    })
    user && GetUserBusiness()
  },[user])

  const GetUserBusiness=async()=>{
    setLoading(true);
    setBusinessList([]);
    const q = query(collection(db,'BusinessList'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress));

    const querySnapshot=await getDocs(q)

    querySnapshot.forEach((doc) => {
        console.log(doc.data())
        setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
    });
    setLoading(false);
  }
    return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>MyBusiness</Text>

      <FlatList
      onRefresh={GetUserBusiness}
      refreshing={loading}
      data={businessList}
      renderItem={({item,index})=>(
        <BusinessListCard
        business={item}
        key={index}
        />
      )}
      />
    </View>
  )
}