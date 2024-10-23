import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import * as ImagePicker from'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { db, storage } from '../../config/FirebaseConfig'
import { getDocs, query , collection, setDoc, doc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
 
export default function addBusiness() {
  const navigation=useNavigation();
  const router=useRouter();
  const {user} =useUser();
  const [image,setImage]=useState(null);
  const [categoryList,setCategortyList]=useState([])
  const [name,setName]=useState();
  const [address,setAddress]=useState();
  const [contact,setContact]=useState();
  const [website,setWebsite]=useState();
  const [about,setAbout]=useState();
  const [category,setCategory]=useState();
  const[loading,setLoading]=useState(false)


  useEffect(()=>{
    navigation.setOptions({
        headerTitle:'Add New Business',
        headerShown:true
    })
    getCategoryList();
  },[])

  const onImagePick=async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      setImage(result?.assets[0].uri);
      console.log(result);
  }
  const  getCategoryList=async()=>{
    setCategortyList([]);
    const q = query(collection(db,'Cattegory'))
    const snapShot = await getDocs(q);
    snapShot.forEach((doc)=>{
        console.log(doc.data())
        setCategortyList(prev=>[...prev,{
            label:(doc.data()).name,
            value:(doc.data()).name
        }])
    })
  }

  //uploading the image
  const onAddNewBusiness=async()=>{
    setLoading(true);
    const fileName=Date.now().toString()+".jpg";
    const resp=await fetch(image);
    const blob=await resp.blob();

    const imageRef=ref(storage,'business-app/'+fileName);
    uploadBytes(imageRef,blob).then((snapShot)=>{
        console.log("File UPLOADED");
    }).then(resp=>{
        getDownloadURL(imageRef).then(async(downloadUrl)=>{
            console.log(downloadUrl);
            //saving it on firebase
            saveBusinessDeatil(downloadUrl);
        })
    })
    setLoading(false);
  }

  const saveBusinessDeatil=async(imageUrl)=>{
    await setDoc(doc(db,'BusinessList',Date.now().toString()),{
        name:name,
        address:address,
        contact:contact,
        about:about,
        website:website,
        category:category,
        imageUrl:imageUrl,
        username:user?.fullName,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        UserImage:user?.imageUrl
    })
    setLoading(false);
    ToastAndroid.show('New Business Added',ToastAndroid.LONG)
    router.back();  
}

    return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25
      }}>Add New Business</Text>
      <Text style={{
        fontFamily:'outfit-regular',
        color:Colors.GRAY

      }}>Fill all details in order to add new business</Text>

      <TouchableOpacity style={{
        marginTop:20
      }}
      onPress={()=>onImagePick()}
      >
        {!image?(
      <Image source={require('./../../assets/images/placeholder.png')}
      style={{
        width:100,
        height:100
      }}
      />
    ):(<Image source={{uri:image}}
      style={{
        width:100,
        height:100,
        borderRadius:15
      }}
      />
    )}
      </TouchableOpacity>
      <View>
        <TextInput placeholder='Name'
        onChangeText={(v)=>setName(v)}
        style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'#fff',
            marginTop:10,
            borderColor:Colors.Primary,            fontFamily:'outfit'
        }}
        />
        <TextInput placeholder='Address'
        onChangeText={(v)=>setAddress(v)}
        style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'#fff',
            marginTop:10,
            borderColor:Colors.Primary,            fontFamily:'outfit'
        }}
        />
        <TextInput placeholder='Contact'
        onChangeText={(v)=>setContact(v)}
        style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'#fff',
            marginTop:10,
            borderColor:Colors.Primary,            fontFamily:'outfit'
        }}
        />
        <TextInput placeholder='Website'
        onChangeText={(v)=>setWebsite(v)}
        style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'#fff',
            marginTop:10,
            borderColor:Colors.Primary,            fontFamily:'outfit'
        }}
        />
        <TextInput placeholder='About'
        onChangeText={(v)=>setAbout(v)}
        multiline
        numberOfLines={5}
        style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'#fff',
            marginTop:10,
            borderColor:Colors.Primary,
            fontFamily:'outfit',
            height:100
        }}
        />
        <View style={{
              padding:10,
              borderWidth:1,
              borderRadius:5,
              fontSize:17,
              backgroundColor:'#fff',
              marginTop:10,
              borderColor:Colors.Primary,            
              fontFamily:'outfit'  
        }}>
        <RNPickerSelect
      onValueChange={(value) => setCategory(value)}
      items={categoryList}
    />
        </View>
      </View>
      <TouchableOpacity
      disabled={loading}
      onPress={()=>onAddNewBusiness()}
      style={{
        padding:15,
        borderRadius:5,
        backgroundColor:Colors.Primary,
        marginTop:20
      }}>
        {loading?(
        <ActivityIndicator size={'large'} color={'white'}/>):
        (<Text style={{
            textAlign:'center',
            fontFamily:'outfit-regular',
            color:'#fff'
        }}>
            Add New Business</Text>)}
      </TouchableOpacity>
    </View>
  )
}