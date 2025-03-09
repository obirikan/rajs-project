import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Signup = () => {
    const router=useRouter()
  return (
    <SafeAreaView>
     <TouchableOpacity onPress={()=>router.push('/')}>
         <Text style={{color:'white'}}>signup</Text>
     </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({})