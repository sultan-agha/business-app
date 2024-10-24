import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { collection,setDoc, doc, getDoc, query } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/Intro';
import ActionButtons from '../../components/BusinessDetail/ActionButtons';
import AboutSection from '../../components/BusinessDetail/AboutSection';
import Reviews from '../../components/BusinessDetail/Reviews';

export default function BusinessDetail() {
    
    const {businessid}=useLocalSearchParams();
    const[businessDetail,setBusinessDetail]=useState([]);
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
        GetBussinesDetailById();
    },[])

    const GetBussinesDetailById=async()=>{
        setBusinessDetail([]);
        setLoading(true);
        const docRef=doc(db,'BusinessList',businessid)
        const docSnap =await getDoc(docRef)

        if(docSnap.exists()){
            setBusinessDetail({id:docSnap.id,...docSnap.data()});
            setLoading(false);
        }else{
            console.log("No data found");
        }

    }

    return (
    <ScrollView>
        {loading?
        <ActivityIndicator
        size={'large'}
        color={Colors.Primary}
        style={{
            marginTop:'70%'
        }}
        />: 
        <View>
            {/* Intro */}
            <Intro business={businessDetail}/>
            {/* ActionButtons */}
            <ActionButtons business={businessDetail}/>
            {/* About section */}
            <AboutSection business={businessDetail}/>
            {/* Review section */}
            <Reviews business = {businessDetail}/>
        
        </View>   
    }
    </ScrollView>
  )
}