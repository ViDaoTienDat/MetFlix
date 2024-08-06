import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Link, useRouter } from 'expo-router'


const MovieCards = ({title, data}) => {
  const router = useRouter()
  const handleOnClick = (movieData) => {
    router.push({pathname:'/moviescreen',params: movieData})
  }

  const renderMovieCards = ({item, index}) => {
    return <TouchableOpacity onPress={()=> handleOnClick(item)}>
      <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={styles.movieImg}  />
      
    </TouchableOpacity> 
    
  }
  return (
    <View style={styles.container}>
      <Text style={{color:'white',fontFamily:'rubik-bold',fontSize:17,letterSpacing:1}}>{title}</Text>
      {/* <Link href="/moviescreen"  style={{color:'white',fontFamily:'rubik-bold',fontSize:17,letterSpacing:1}}>About</Link> */}
      <FlatList horizontal data={data} renderItem={renderMovieCards}
        ItemSeparatorComponent={()=> (
            <View style={{width:10}}></View>
        )}
        showsHorizontalScrollIndicator={false} 
      />
    </View>
  )
}

export default MovieCards

const styles = StyleSheet.create({
    container : {
        gap:15,
        height:responsiveHeight(35),
        
    },
    movieImg : {
        width:responsiveWidth(30),
        height:200,
        borderRadius:10,
        resizeMode:'cover',
       
    }
})