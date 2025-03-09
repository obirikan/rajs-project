import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Login = () => {
    const router=useRouter()
  return (
    <SafeAreaView>
     <TouchableOpacity onPress={()=>router.push('/signup')}>
         <Text style={{color:'white'}}>login</Text>
     </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({})