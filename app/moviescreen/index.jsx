import { View, Text, StyleSheet, StatusBar, ScrollView, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useRef, useState } from 'react'
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';



export default function index() {
  const { id, title, release_date, genre_ids, poster_path, overview, backdrop_path, vote_count } = useLocalSearchParams()
  const [isVideoVisible, setisVideoVisible] = useState(false)
  const { user } = useUser()
  console.log('ID', id);
  const router = useRouter()

  const onSubmit = async () => {
    console.log('onSubmit');
    const q = query(collection(db, 'UserMovieList'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      console.log(`${user?.primaryEmailAddress?.emailAddress} NOT EMPTY`);
      const currentData = querySnapshot.docs[0].data();
      if (currentData.movieId.includes(id)) {
        ToastAndroid.show('This movie is already in Movie List ', ToastAndroid.BOTTOM)
      } else {
        await updateDoc(querySnapshot.docs[0].ref, {
          movieId: [...currentData.movieId, id]
        });
        ToastAndroid.show('Added Successfully!!!', ToastAndroid.BOTTOM)
      }
    } else {
      await setDoc(doc(db, "UserMovieList", Date.now().toString()), {
        userEmail: user?.primaryEmailAddress?.emailAddress,
        movieId: [id],
      });
      ToastAndroid.show('Added Successfully!!!', ToastAndroid.BOTTOM)
    }


  }
  return (
    <View style={styles.mainContainer}>

      <ScrollView style={styles.scrollContainer}>

        <Image
          style={styles.firstContainer}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${backdrop_path}`
          }}
        />


        {/* Second Container */}

        <View style={styles.secondContainer}>
          {/* First Box */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Image source={require('../../assets/images/metflix.png')} style={{ width: 30, height: 30 }} />
            <Text style={{ color: 'white', fontFamily: 'rubik-light', letterSpacing: 5 }}>MOVIE</Text>
          </View>
          {/* Second Box */}
          <Text style={{ color: 'white', fontFamily: 'rubik-bold', fontSize: 20 }}>{title}</Text>
          {/* Third Box */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ color: 'white', fontFamily: 'rubik' }}>{release_date.split('-')[0]}</Text>
            <View style={{ width: 2.5, height: 20, backgroundColor: 'white' }}></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <MaterialIcons name="favorite" size={24} color="red" />
              <Text style={{ color: 'white', fontFamily: 'rubik' }}>{vote_count}</Text>
              <MaterialIcons name="hd" size={24} color="white" />
            </View>
          </View>
          <View style={{ marginTop: 10, gap: 10 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                router.navigate({ pathname: '/moviescreen/screen', params: { id } })
              }}
              style={styles.playButton}>

              <AntDesign name="caretright" size={21} color="black" />
              <Text style={[styles.titles, {
                color: 'black',
                fontSize: responsiveFontSize(2.3)
              }]}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              style={[styles.playButton, {
                backgroundColor: '#2B292B'
              }]}>

              <AntDesign name="plus" size={21} color="white" />
              <Text style={[styles.titles, {
                color: 'white',
                fontSize: responsiveFontSize(2.3)
              }]}>My List</Text>
            </TouchableOpacity>
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'rubik',
              marginVertical: 10, lineHeight: 25,
              textAlign: 'justify'
            }}>{overview}</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#080508',
    marginTop: StatusBar.currentHeight
  },
  scrollContainer: {
    flex: 1,
  },
  firstContainer: {
    height: responsiveHeight(35)
  },
  secondContainer: {
    padding: 10,
    gap: 8
  },
  titles: {
    color: '#fff',
    fontSize: responsiveFontSize(2.3),
    fontFamily: 'rubik',
  },
  playButton: {
    backgroundColor: '#fff',
    width: '100%',
    opacity: 0.9,
    height: responsiveHeight(5.5),
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  }
})