import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import Category from '../../components/Home/category'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList'
export default function explore() {
  //to get the business list according to category

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [businessList,setBusinessList]=useState([])

   // Function to get business list according to category and search term
  const GetBusinessByCategory = async (category) => {
    setBusinessList([]); // Clear the previous list
    setSelectedCategory(category); // Track the selected category

    let q = query(collection(db, 'BusinessList'), where('category', '==', category));

    // If a search term is provided, add a 'where' clause to filter by business name
    if (searchTerm.trim() !== '') {
      q = query(
        collection(db, 'BusinessList'),
        where('category', '==', category),
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff') // Search for name starting with the searchTerm
      );
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  // Function to update the search term and trigger a new search
  const handleSearch = (text) => {
    setSearchTerm(text); // Update the search term state

    // If there is a category selected, search businesses within that category
    if (selectedCategory) {
      GetBusinessByCategory(selectedCategory);
    }
  };

  return (
    <View style={{
      padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>
        Explore More
      </Text>
      {/* search bar */}
      <View style ={{
            display:'flex',
            flexDirection:'row',
            gap:10,
            alignItems:'center',
            backgroundColor:'white',
            padding:10,
            marginVertical:10,
            marginTop:15,
            borderRadius:8,
            borderWidth:1,
            borderColor:Colors.Primary
        }}>
            <Ionicons name='search' size={24} color={Colors.Primary}/>
            <TextInput placeholder='Search...'
             value={searchTerm} // Controlled input
             onChangeText={handleSearch} // Trigger search on text input   
            style={{
                fontFamily:'outfit',
                fontSize:16
            }}
            />
        </View>
      {/* category */}
      <Category
      explore="true"
      onCategorySelect={(category)=>GetBusinessByCategory(category)}
      />
      {/* BusinessList */}
      <ExploreBusinessList businessList={businessList}/>
    </View>
  )
}