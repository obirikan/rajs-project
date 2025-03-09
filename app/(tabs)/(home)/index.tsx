import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link ,router} from "expo-router";
import React from 'react'

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Pressable onPress={()=>    router.push({
      pathname: `/[id]`,
      params: { id: "category.id", }
    })}>
           <Text style={{color:'white'}}>go home</Text>
        </Pressable>
        <Text style={styles.title}>Hello World kan</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});