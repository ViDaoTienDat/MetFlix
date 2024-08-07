import Home_Banner from '@/components/Home_Banner'
import MovieCards from '@/components/MovieCards'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, SplashScreen, useNavigation } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'

import { getNowPlayingMoviesApi, getPopularMoviesApi, getTopRatedMoviesApi } from '../apis/network'




SplashScreen.preventAutoHideAsync();
export default function home() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [popularMoviesData, setpopularMoviesData] = useState([])
  const [nowplayingMoviesData, setNowplayingMoviesData] = useState([])
  const [topRatedMoviesData, setTopRatedMoviesData] = useState([])


  
  const { user } = useUser()
  
  
  useEffect(() => {
    const handleApis = async () => {
      try {
        // Fetch now playing movies
        const nowPlayingResponse = await getNowPlayingMoviesApi();
        if (nowPlayingResponse.status === 200) {
          setNowplayingMoviesData(nowPlayingResponse.data.results);
        } else {
          Alert.alert(`Now Playing Movies request failed with ${nowPlayingResponse.data}`);
        }

        // Fetch popular movies
        const popularResponse = await getPopularMoviesApi();
        if (popularResponse.status === 200) {
          setpopularMoviesData(popularResponse.data.results);
        } else {
          Alert.alert(`Popular Movies request failed with ${popularResponse.data}`);
        }

        // Fetch top rated movies
        const topRatedResponse = await getTopRatedMoviesApi();
        if (topRatedResponse.status === 200) {
          setTopRatedMoviesData(topRatedResponse.data.results);
        } else {
          Alert.alert(`Top Rated Movies request failed with ${topRatedResponse.data}`);
        }
       
      } catch (error) {
        Alert.alert(`API request failed with error: ${error.message}`);
      } finally{
        setAppIsReady(true)
      }
    };

    handleApis();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
 
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
        <ScrollView style={styles.scrollView}>
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