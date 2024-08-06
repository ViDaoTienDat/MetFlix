import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Share } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function MenuList() {
    const router = useRouter()
    const { signOut} = useAuth()
    const menuList=[
        {
            id:1,
            name:'My Movie List',
            icon:require('./../assets/images/add-file.png'),
            path:'/usermovielist'
        },
        {
            id:2,
            name:'Logout',
            icon:require('./../assets/images/logout.png'),
            path:'logout'
        },
    ]

    const onMenuClick = (item) => {
        if(item.path == 'logout'){
            signOut()
            return;
        }
        router.push(item.path)
    }
  return (
    
    <View style={styles.container}>
      {menuList.map((item, index) => (
        <TouchableOpacity key={index} 
            onPress={() => onMenuClick(item)}
            style={styles.itemContainer}>
            <Image source={item.icon}
                style={{
                    width:30,
                    height:30,
                }}
            />
            <Text style={{
                fontFamily:'rubik',
                color:'white',
                flex:1
            }}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  
}
const styles = StyleSheet.create({
    container: {
        marginTop:20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-between'
    },
    itemContainer:{
        display: 'flex',
        borderWidth:1,
        borderRadius:15,
        padding:15,
        width:'48%',
        marginBottom:20,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderColor:'white',
        gap:10
    },
})