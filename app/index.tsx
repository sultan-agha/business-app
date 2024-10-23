import { Redirect } from "expo-router";
import { Text, View ,StyleSheet } from "react-native";

export default function Index() {
  const{container}=styles
  return <Redirect href={'/home'}/>
}

const styles = StyleSheet.create({
 container:{
  flex: 1,
 }
}
)
