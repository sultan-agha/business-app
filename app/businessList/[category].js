import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '../../constants/Colors';

export default function BusinessListByCategory() {
    
    const navigation=useNavigation();
    const {category}=useLocalSearchParams();
    const[businessListCategory,setBusinessListCategory]=useState([]);
    const [Loading,setLoading]=useState(false)
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:category
        });
        getBusinessListByCategory();
    },[])
    const getBusinessListByCategory=async()=>{
      setLoading(true)  
      setBusinessListCategory([]);
      const q = query(collection(db,'BusinessList'),where("category",'==',category));
        const querySnapShot=await getDocs(q);
        querySnapShot.forEach((doc)=>{
            console.log(doc.data())
            setBusinessListCategory(prev=>[...prev,{id:doc?.id, ...doc.data()}])
        })
        setLoading(false)
    }

    return (
    <View>
        {businessListCategory?.length>0 &&Loading==false?
      <FlatList
      onRefresh={getBusinessListByCategory}
      refreshing={Loading}
      data={businessListCategory}
      renderItem={({item,index})=>(
        <BusinessListCard
        business={item}
        key={index}
        />
      )}
      />: 
      Loading?<ActivityIndicator
      style={{marginTop:'60'}}
      size={'large'}
      color={Colors.Primary}
      />:
      <Text style={{
        fontSize:20,
        fontFamily:'outfit-bold',
        color:Colors.GRAY,
        textAlign:'center',
        marginTop:'50%'
      }}>No Business found</Text>}
    </View>
  )
}