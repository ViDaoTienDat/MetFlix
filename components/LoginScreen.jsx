import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser'
import { Link, SplashScreen } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    // void SplashScreen.hideAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser()
  const [appIsReady, setAppIsReady] = useState(false);

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  const onLayoutRootView = useCallback(async () => {
   
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    
  }, []);

 
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            gap:50
          }}
          onLayout={onLayoutRootView}
        > 
    
    
          <Image source={{uri:'https://assets.nflxext.com/ffe/siteui/vlv3/21a8ba09-4a61-44f8-8e2e-70e949c00c6f/947971e0-22ba-4a8a-bb94-df39d58979b7/VN-vi-20240722-POP_SIGNUP_TWO_WEEKS-perspective_WEB_353a97eb-ab41-4665-8ce3-6125e3aa89d5_large.jpg'}}
            style={{
              resizeMode: 'cover',
              position:'absolute',
              width: "100%",
              height: "100%",
              zIndex: -9999,
            }}
          />
          
          <LinearGradient
            // Background Linear Gradient
            start={{x:0,y:1}}
            end={{x:1,y:0}}
            colors={['rgba(0,0,110,0.5)', 'transparent']}
            style={styles.background}
          />
          <Image source={require('./../assets/images/logoMetFlix.png')}
            style={{
              width:300,
              height:100,
            }}
          />
          <View style={{
            padding:20,
          }}>
            <Text style={{
              fontSize:30,
              fontFamily:'rubik-bold',
              color: "white",
              textAlign: 'center',
            }}>Chương trình truyền hình,phim không giới hạn và nhiều nội dung khác</Text>
            <Text style={{
              fontSize:20,
              fontFamily:'rubik',
              color: "white",
              textAlign: 'center',
            }}>Xem ở mọi nơi. Hủy bất cứ lúc nào</Text>
          </View>
          <View style={{
            padding:10,
            width:'100%',
            marginBottom:12,
          }}>
            <TouchableOpacity 
             onPress={onPress}
            style={{
              backgroundColor:'red',
              padding:6,
              borderRadius:10
            }}>
              <Text style={{
                textAlign: 'center',
                color:'#fff',
                fontFamily:'rubik-bold',
                fontSize:24,
              }}>Bắt đầu</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    const styles = StyleSheet.create({
      background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
      },
    })