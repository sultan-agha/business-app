import { View, Text, FlatList, ScrollView } from 'react-native';
import React from 'react';
import BusinessListCard from './BusinessListCard';

export default function ExploreBusinessList({ businessList }) {
  return (
    <ScrollView>
      {businessList.length > 0 ? (
        <FlatList
          data={businessList}
          renderItem={({ item, index }) => (
            <BusinessListCard key={index} business={item} />
          )}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text
            style={{
              fontSize: 25,
              color: 'black',
            }}
          >
            No data found
          </Text>
        </View>
      )}
      <View
        style={{
          height: 100,
        }}
      ></View>
    </ScrollView>
  );
}
