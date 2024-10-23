import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'
export default function PopularBusinessCard({business}) {
    const router = useRouter();
    return (
    <TouchableOpacity 
    onPress={()=>router.push("/bisinessdetail/"+business?.id)}
    style={{
        width:200,
        marginLeft:20,
        paddingBottom:15,
        paddingHorizontal:2,
        marginBottom:5,
        backgroundColor:'#fff',
        borderRadius:15
    }}>
        <Image source={{uri:business?.imageUrl}}
        style ={{
            width:197,
            height:130,
            borderRadius:15
        }}
        />
        <View style={{
            marginTop:7,
            gap:5
        }}>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:17,
            }}>{business?.name}</Text>
            <Text style={{
                fontFamily:'outfit-regular',
                fontSize:13,
                color:Colors.GRAY,
            }}>
                {business?.address}
            </Text>
        </View>
        <View style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between'
            }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            gap:5
        }}>
            <Image source={require('./../../assets/images/star.png')}
            style={{
                width:15,
                height:15
            }}
            />
            <Text style={{
                fontFamily:'outfit-normal'
            }}>4.5</Text>
        </View>
        <Text style={{
            fontFamily:'outfit-regular',
            backgroundColor:Colors.Primary,
            color:'#fff',
            padding:3,
            fontSize:12,
            borderRadius:5
        }}>{business.category}</Text>
        </View>
    </TouchableOpacity>
  )
}