import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '../../constants/Colors'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'

export default function Reviews({business}) {
    const [rating,setRating]=useState(4)
    const[userInput,setUserInput]=useState();
    const {user}=useUser();
    const onSubmit=async()=>{
        const docRef=doc(db,'BusinessList',business?.id)
        await updateDoc(docRef,{
            reviws:arrayUnion({
                rating:rating,
                comment:userInput,
                userName:user?.fullName,
                userImage:user?.imageUrl
            })
        })

        ToastAndroid.show('Comment Added Successfully !',ToastAndroid.BOTTOM)
    }
    
    return (
    <View style={{
        padding:20,
        backgroundColor:'#fff'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>Reviews</Text>
      <View>
        <Rating
        showRating={false}
        imageSize={25}
        onFinishRating={(rating)=>setRating(rating)}
        style={{
            paddingVertical:10
        }}
        />
        <TextInput 
        placeholder='Write your comment here'
        numberOfLines={4}
        onChangeText={(value)=>setUserInput(value)}
        style={{
            borderWidth:1,
            padding:10,
            borderRadius:10,
            borderColor:Colors.GRAY,
            textAlignVertical:'top'
        }}
        />
        <TouchableOpacity
        disabled={!userInput}
        onPress={()=>onSubmit()}
        style={{
            padding:10,
            backgroundColor:Colors.Primary,
            borderRadius:6,
            marginTop:10
        }}
        >
            <Text style={{
                fontFamily:'outfit-regular',
                color:'#fff',
                textAlign:'center'
            }}> Submit</Text>
        </TouchableOpacity>
    </View>
    {/* Display previous reviews */}
<View>
  {business?.reviws && business.reviws.length > 0 ? (
    business.reviws.map((item, index) => (
      <View key={index} style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        borderRadius: 15,
        marginTop: 10
      }}>
        <Image 
          source={{ uri: item.userImage }} 
          style={{ 
            width: 50, 
            height: 50, 
            borderRadius: 99 
          }} 
        />
        <View style={{ display: 'flex', gap: 5 }}>
          <Text style={{ fontFamily: 'outfit-medium' }}>{item.userName}</Text>
          <Rating 
            imageSize={20} 
            startingValue={item.rating} // startingValue instead of ratingCount for display 
            readonly // ensures the rating cannot be changed
            style={{ alignItems: 'flex-start' }} 
          />
          <Text>{item.comment}</Text>
        </View>
      </View>
    ))
  ) : (
    <Text style={{ fontStyle: 'italic', color: Colors.GRAY }}>No reviews yet.</Text>
  )}
</View>
    </View>
    
  )
}