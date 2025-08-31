import { View, Text, ScrollView,Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '@/lib/appwrite';

const SignIn = () => {
const handleLogin = async () => {
  const result = await login();
  if(!result) console.log('Login sucess');
  else Alert.alert('Error','Failed to login');
}
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName='h-full'>
      <Image source={} className='w-full h-4/6' resizeMode="contain"/>

      <View className='px-10'>
       <Text className='text-base text-center uppercase font-thin text-black'>Welcome to Restate</Text>
       <Text className='text-3xl font-thin text-black text-center mt-2'>Let's Get You Closer to {"\n"}</Text>
       <Text className='text-primary-200'>Your Ideal Home</Text>
       
        <TouchableOpacity onPress={handleLogin} className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'>
        <Text className='text-lg font-thin text-black text-center mt-1'>Login to Restate With Google</Text>
        </TouchableOpacity>

      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn;