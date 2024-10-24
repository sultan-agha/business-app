import { View, Text, Image, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
export default function Intro({business}) {
  const router =useRouter();
  const {user}=useUser()
  const [isFavorite, setIsFavorite] = useState(false); // Track if the business is a favorite
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, [business?.id]);

  // Check if the business is already in the favorite list when the component mounts
  const checkFavoriteStatus = async () => {
    const favoriteRef = doc(db, 'FavoriteList', business?.id);
    const favoriteSnap = await getDoc(favoriteRef);
    if (favoriteSnap.exists()) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };
  const toggleFavorite = async () => {
    setLoading(true);
    const favoriteRef = doc(db, 'FavoriteList', business?.id);
    
    if (isFavorite) {
      // If it's a favorite, remove it from the favorite list
      await deleteDoc(favoriteRef);
      ToastAndroid.show("Removed from Favorites!", ToastAndroid.LONG);
      setIsFavorite(false);
    } else {
      // If it's not a favorite, add it to the favorite list
      await setDoc(favoriteRef, {
        name: business.name,
        address: business.address,
        contact: business.contact,
        about: business.about,
        website: business.website,
        category: business.category,
        imageUrl: business.imageUrl,
        username: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        UserImage: user?.imageUrl
      });
      ToastAndroid.show("Added to Favorites!", ToastAndroid.LONG);
      setIsFavorite(true);
    }

    setLoading(false);
  };

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

        {/* Heart icon for toggling favorite status */}
        <TouchableOpacity onPress={toggleFavorite} disabled={loading}>
          <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={40} color={isFavorite?'red':'white'} />
        </TouchableOpacity>
        
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