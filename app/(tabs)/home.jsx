import Home_Banner from '@/components/Home_Banner'
import MovieCards from '@/components/MovieCards'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'

import { getNowPlayingMoviesApi, getPopularMoviesApi, getTopRatedMoviesApi } from '../apis/network'





export default function home() {
  const [popularMoviesData, setpopularMoviesData] = useState([])
  const [nowplayingMoviesData, setNowplayingMoviesData] = useState([])
  const [topRatedMoviesData, setTopRatedMoviesDatagMoviesData] = useState([])


  
  const { user } = useUser()
  
  useEffect(()=> {
    const handleApi = async () => {
      const {data, status} = await getNowPlayingMoviesApi();
      if(status === 200) {
        setNowplayingMoviesData(data.results)
      } else {
        Alert.alert(`Request failed with ${data}`)
      }
    }
    handleApi()
  },[])
  useEffect(()=> {
    const handleApi = async () => {
      const {data, status} = await getPopularMoviesApi();
      if(status === 200) {
        setpopularMoviesData(data.results)
      } else {
        Alert.alert(`Request failed with ${data}`)
      }
    }
    handleApi()
  },[])
  useEffect(()=> {
    const handleApi = async () => {
      const {data, status} = await getTopRatedMoviesApi();
      if(status === 200) {
        setTopRatedMoviesDatagMoviesData(data.results)
      } else {
        Alert.alert(`Request failed with ${data}`)
      }
    }
    handleApi()
  },[])
  // const getProduct= () => {
  //   const URL = 'https://vidsrc.to/vapi/movie/new'

  //   fetch(URL)
  //     .then((res) => {
  //       if(!res.ok) {
  //         throw new Error("Something went wrong")
  //       }
  //       return res.json()
  //     })
  //     .then((data) => {
  //       console.log(data.result.items[0].embed_url_imdb);
  //       data.result.items.forEach((item)=> {
  //         console.log(item.title);
  //         setListMovie(prev => [...prev,item])
          
  //       })
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
        
  //     })
  // }
  return (
    <View style={styles.container}>
      
        {/* <Text>Xin chao {user?.primaryEmailAddress?.emailAddress}</Text>
        <FlatList
          data={listmovie}
          renderItem={({item}) => (
            <Text>{item.title}</Text>
          )}
        /> */}
        <ScrollView style={styles.scrollView}
          
        >
         
        
          <Home_Banner/>
          
          <View style={styles.subContainer}>
            <MovieCards title='Now playing' data={nowplayingMoviesData}/>
            <MovieCards title='Popular' data={popularMoviesData}/>
            <MovieCards title='Top Rated' data={topRatedMoviesData}/>
          </View>
        </ScrollView>

      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#000',
    marginTop:StatusBar.currentHeight
  },
  scrollView:{
    flex:1,

  },
  subContainer:{
    gap:10,
    paddingHorizontal:15,
    marginVertical:10
  }
})