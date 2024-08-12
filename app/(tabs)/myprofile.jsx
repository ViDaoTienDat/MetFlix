import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'

import { useAuth } from '@clerk/clerk-expo'
import UserIntro from '@/components/UserIntro'
import MenuList from '@/components/MenuList'

export default function myprofile() {

  return (
    <View style={{
      flex: 1,
      padding: 20,
      backgroundColor: 'black'
    }}>
      {/* User Info */}
      <UserIntro />

      {/* Menu List */}
      <MenuList />
    </View>
  )
}