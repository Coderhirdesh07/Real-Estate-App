import { View, Text,Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import{useDebouncedCallback} from "use-debounce"
import { useLocalSearchParams, usePathname,router } from 'expo-router'

const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{query?:string}>();
    const [search,setSearch] = useState(params.query??'');
    const debounceSearch = useDebouncedCallback( ( text:string) => router.setParams( {query:text}),500);
    const handleSearch = (text:string) => {
        setSearch(text);
       debounceSearch(text)
    }

  return (
    <View className='flex flex-row items-center justify-between w-full px-4 rounded-lg bg-cyan-50 border-primary-200 mt-5 py-2'>
      <View className='flex-1 flex flex-row items-center justify-start z-50'>
        <Image source={} className='size-5'/>
        <TextInput
         value={search}
         onChangeText = {handleSearch}
         placeholder="Search for anything"
         className="text-sm font-thin text-black ml-2 flex-1"
        />
      </View>
      <TouchableOpacity>
        <Image source={} className="size-5"/>
      </TouchableOpacity>
    </View>
  )
}

export default Search