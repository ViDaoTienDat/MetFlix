import { View, Text, FlatList, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '@/configs/FirebaseConfig'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo'
import { findMovieById } from '../apis/network'
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useRouter } from 'expo-router'

export default function index() {
    const router = useRouter()
    const {user} =useUser()
    const [movieIdList, setMovieIdList] = useState([])
    const [movieList, setMovieList] = useState([])
    useEffect(()=> {
      user && GetUserMovieList()
    },[])
    useEffect(() => {
      const fetchMovies = async () => {
        for (const movieId of movieIdList) {
          await handleApi(movieId);
        }
      };
  
      if (movieIdList.length > 0) {
        fetchMovies();
      }
    }, [movieIdList]);
    const GetUserMovieList= async () => {
        try{
          const q = query(collection(db,'UserMovieList'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress))
          const querySnapshot = await getDocs(q)
          console.log(querySnapshot.docs[0].data().movieId);
          setMovieIdList(querySnapshot.docs[0].data().movieId)
        } catch(e){
          return
        }
    }
    
    const handleApi = async (movieId) => {
      const {data, status} = await findMovieById(movieId);
      if(status === 200) {
        setMovieList((prev) => [...prev, data]);
      } else {
        Alert.alert(`Request failed with ${data}`)
      }
    }
    const handleOnClick = (movieData) => {
      router.push({pathname:'/moviescreen',params: movieData})
    }
  return (
    
    
    <View style={{
      flex:1,
      backgroundColor:"black",
      padding:10,
      marginTop:StatusBar.currentHeight
    }}>
      <Text style={{fontFamily:'rubik-bold',fontSize:20,color:'white'}}>My Movie List</Text>
      <FlatList data={movieList} keyExtractor={(item) => item.id.toString()} renderItem={({item, index}) => (
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
          <Text style={{flex:1,fontFamily:'rubik-bold',fontSize:16,color:'white'}}>{item.original_title}</Text>
          <AntDesign name="playcircleo" size={30} color="white" />
        </TouchableOpacity>
      )}/>
    </View>
  )
}