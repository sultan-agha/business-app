import { View, Text, Image, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
export default function Intro({business}) {
  const router =useRouter();
  const {user}=useUser()
  const OnDelete=()=>{
    Alert.alert('Do you want to Delete','Do you really want to delete thise business?',[
      {
        text:'Cancel',
        style:'cancel'
      },
      {
        text:'Delete',
        style:'destructive',
        onPress:()=>deleteBusiness()
      }
    ])
  }

  const deleteBusiness=async()=>{
    console.log("deleted");
    await deleteDoc(doc(db,'BusinessList',business?.id));
    router.back();
    ToastAndroid.show("Business Deleted!",ToastAndroid.LONG)
  }
    return (
    <View>
      <View style={{
        position:'absolute',
        zIndex:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        padding:20
      }}>
        <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name='arrow-back-circle'size={40} color={'white'}/>
        </TouchableOpacity>
        <Ionicons name='heart-outline' size={40} color={'white'}/>
      </View>
      <Image source={{uri:business.imageUrl}}
      style={{
        width:'100%',
        height:340
      }}
      />
      <View style={{
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#fff',
        marginTop:-20,
        padding:20,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        justifyContent:'space-between'
        
      }}>
      <View style={{
        padding:20,
        marginTop:-20,
        backgroundColor:'#fff',
        flex:1,
        borderTopLeftRadius:25,
        borderTopRightRadius:25
      }}>
        <Text style={{
            fontSize:26,
            fontFamily:'outfit-bold'
        }}>{business.name}</Text>
        <Text style={{
            fontFamily:'outfit-regular',
            fontSize:18
        }}>{business.address}</Text>
      </View>
      {user?.primaryEmailAddress?.emailAddress==business?.userEmail &&
      <TouchableOpacity onPress={()=>OnDelete()}>
      <Ionicons name='trash' size={24} color={"red"}/>
      </TouchableOpacity>}
    </View>
    </View>
  )
}