import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons';
import { findMovieByName } from '../apis/network';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useRouter } from 'expo-router';



export default function find() {
  const router = useRouter()
  const handleOnClick = (movieData) => {
    router.push({pathname:'/moviescreen',params: movieData})
  }
  const [movieTitleInput, setMovieTitleInput] = useState('')
  const [listMovieFound, setListMovieFound] = useState([])
  const handleApi = async (movieName) => {
    const {data, status} = await findMovieByName(movieName);
    if(status === 200) {
      setListMovieFound(data.results)
    } else {
      Alert.alert(`Request failed with ${data}`)
    }
   
    
  }
  return (
    <View style={styles.container}>
      {/* Search Box */}
      <View style={{
        borderRadius:5,
        padding:10,
        backgroundColor:'#262626',
        width:'100%',
        height:50,
        gap:10,
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10
      }}>
        <TextInput placeholder='Search movies, shows....' 
         cursorColor={'white'}
         onChangeText={(v) => {setMovieTitleInput(v)}}
         placeholderTextColor={'#929292'}
         style={{flex:1,color:'white',fontFamily:'rubik'}}/>
         <TouchableOpacity onPress={() => handleApi(movieTitleInput)}>
          <AntDesign name="search1" size={24} color={'white'}/>
         </TouchableOpacity>
      </View>
      
      <FlatList data={listMovieFound} renderItem={({item, index})=>(
        <TouchableOpacity onPress={()=> handleOnClick(item)} style={{
          width:'100%',
          height:'auto',
          marginVertical:5,
          backgroundColor:'black',
          flexDirection:'row',
          alignItems:'center',
          gap:5
        }}>
          <Image style={{borderRadius:5,resizeMode:'contain',width:responsiveWidth(40),height:responsiveHeight(12)}}
            source={item.backdrop_path == null ? require('./../../assets/images/noImage.jpg') : { uri:`https://image.tmdb.org/t/p/w500${item.backdrop_path}` }} />
          <Text style={{flex:1,fontFamily:'rubik-bold',fontSize:16,color:'white'}}>{item.title}</Text>
          <AntDesign name="playcircleo" size={30} color="white" />
        </TouchableOpacity>
      )}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding:5,
    backgroundColor:"black",
    marginTop: StatusBar.currentHeight
  }
})