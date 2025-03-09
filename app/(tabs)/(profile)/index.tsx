import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Profile = () => {
    const router=useRouter()
  return (
    <SafeAreaView>
     <TouchableOpacity onPress={()=>router.push('/(home)')}>
         <Text style={{color:'white'}}>Profile</Text>
     </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})