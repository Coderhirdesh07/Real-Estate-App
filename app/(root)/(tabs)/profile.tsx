import { View, Text, ScrollView, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const handleLogout = async () => {}
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerClassName='pb-32 px-7'
      >
      <View className='flex flext-row items-center justify-between mt-5'>
        <Text className='text-xl font-thin'>Profile</Text>
        <Image source={} className='size-5'/>
      </View>
      <View className='flex-row justify-center flex mt-5'>
        <View className='flex flex-col items-center relative mt-5'>
          <Image source={} className='size-44 relative rounded-full'/>
          <TouchableOpacity className='absolute bottom-11 right-2'>
            <Image source={} className='size-9'/>
          </TouchableOpacity>
          <Text className='text-2xl'>Adrian | Hird</Text>
        </View>
      </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile