import { Alert, FlatList, ImageBackground, Linking, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUpcomingMoviesApi } from '@/app/apis/network'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router'
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '@/configs/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'

const Home_Banner = () => {
    const router = useRouter()
    const {user} = useUser()
    const [upcomingApiData, setupcomingApiData] = useState([])
  useEffect(() => {
    const handleUpcomingApi = async () => {
        const {data, status} = await getUpcomingMoviesApi()
        if(status === 200) {
            setupcomingApiData(data.results)
        } else {
            Alert.alert(`Request failed with ${data}`)
        }
    }

    handleUpcomingApi()
  },[])
  const addMovieList = async (id) => { 
    console.log('addMovieList');
    const q = query(collection(db, 'UserMovieList'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      
      const currentData = querySnapshot.docs[0].data();
      if(currentData.movieId.includes(id)){
        ToastAndroid.show('This movie is already in Movie List ',ToastAndroid.BOTTOM)
      }else {
        await updateDoc(querySnapshot.docs[0].ref, {
            movieId: [...currentData.movieId, id]
          });
        ToastAndroid.show('Added Successfully!!!',ToastAndroid.BOTTOM)
      }
    }else {
      await setDoc(doc(db, "UserMovieList", Date.now().toString()), {
        userEmail: user?.primaryEmailAddress?.emailAddress,
        movieId:[id],
      });
      ToastAndroid.show('Added Successfully!!!',ToastAndroid.BOTTOM)
    }
    
    
    }
  const renderMovieBanner = ({item, index}) => (
    <ImageBackground 
        
        key={index}
        style={styles.movieBanner}
        source={{uri:'https://image.tmdb.org/t/p/w500'+item.poster_path}}>
        <LinearGradient
            style={styles.linearContainer}
            colors={['rgba(0,0,0,0.05)','rgba(0,0,0,7)']}
        >
            <TouchableOpacity onPress={()=> addMovieList(item.id)} style={[styles.playButton,{backgroundColor:'#333333',gap:5}]}>
                <AntDesign name="plus" size={21} color="white" />
                <Text style={styles.titles}>My List</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {
                  router.navigate({pathname:'/moviescreen/screen',params:{id:item.id}})
                }}
                style={styles.playButton}>
                
                <AntDesign name="caretright" size={21} color="black" />
                <Text style={[styles.titles,{
                    color: 'black',
                    fontSize:responsiveFontSize(2.3)
                }]}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {
              router.push({pathname:'/moviescreen',params: item})
            }} style={[styles.playButton,{backgroundColor:'#333333',gap:5, width:responsiveWidth(24)}]}>
                <AntDesign name="question" size={21} color="white" />
                <Text style={styles.titles}>Info</Text>
            </TouchableOpacity>
        </LinearGradient>
    </ImageBackground>
  )

  return (
    <View style={styles.container}>
      <FlatList pagingEnabled showsHorizontalScrollIndicator={false} horizontal data={upcomingApiData} renderItem={renderMovieBanner}/>
    </View>
  )
}

export default Home_Banner

const styles = StyleSheet.create({
    container: {

        width:'100%',
        height: responsiveHeight(70),
        
    },
    movieBanner: {
        resizeMode:'cover',
        width:responsiveWidth(100),
        height:'100%',
        justifyContent:'flex-end',
        opacity:1
    },
    linearContainer:{
        flex:0.2,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        
    },
    titles: {
        color:'#fff',
        fontSize:responsiveFontSize(2.3),
        fontFamily:'rubik',
    },
    playButton: {
        opacity:0.8,
        backgroundColor:'#fff',
        width:responsiveWidth(28),
        height:responsiveHeight(5.5),
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:10,
    }
})