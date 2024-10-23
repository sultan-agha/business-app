import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Colors } from '@/constants/Colors';
import {useWarmUpBrowser} from './../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';


WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();
    const {startOAuthFlow} = useOAuth({strategy :"oauth_google"});

    const onPress = React.useCallback(async()=>{
        try{
            const {createdSessionId, signIn, signUp,setActive}=
            await startOAuthFlow();

            if(createdSessionId){
                setActive({session:createdSessionId});
            }else{
                //use sign in or sign up for nexxt steps such as NFA
            }
        }catch(err){
            console.error("OAuth error",err);
        }
    },[]);
  return (
    <View>
        <View style ={{
            display:'flex',
            alignItems:'center',
            marginTop:100
        }}>
      <Image source={require ('./../assets/images/login.png')}
      style ={{width:250,height:450,borderRadius:20,borderWidth:6,borderColor:'#000'}}
      />
      </View>
      <View style={styles.subContainer} >
        <Text style ={{
            color:Colors.Primary
        }}>Your Ultimate community business directory app</Text>
        <Text style={{
            fontSize:15,
            fontFamily:'outfit',
            textAlign:'center',
            color:Colors.GRAY,
            marginVertical:15
        }}>Find your favorite business near you and post your own business to your community</Text>
        <TouchableOpacity 
        onPress={onPress}
        style={styles.button}>
            <Text style={{
                textAlign:'center',
                color:"white",
                fontFamily:'outfit'
            }}>Lets get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    subContainer:{
        backgroundColor:'#fff',
        padding:20,
        marginTop:-20
    },
    button:{
        backgroundColor:Colors.Primary,
        padding:16,
        borderRadius:99,
        marginTop:20
    }
})