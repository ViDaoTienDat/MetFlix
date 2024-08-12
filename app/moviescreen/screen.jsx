import { View, Text, StatusBar, Platform, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import WebView from 'react-native-webview'
import * as ScreenOrientation from 'expo-screen-orientation';
import { useLocalSearchParams } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';



export default function screen() {
  const { id } = useLocalSearchParams()
  

  const handleWebViewNavigation = (event) => {
    const url = event.url;
    // Kiểm tra xem URL có chứa chuỗi quảng cáo hay không và từ chối chuyển hướng
    if (url.includes('vidsrc.xyz')) {
      return true; // Cho phép tải trang từ vidsrc.xyz
    } else {
      return false; // Ngăn chặn các chuyển hướng không mong muốn
    }
  };
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    NavigationBar.setVisibilityAsync("hidden");
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      NavigationBar.setVisibilityAsync("visible");
    };
  },[])

  

  
  const webViewRef = useRef(null)
  return (
    <View style={{flex:1}}>
      <StatusBar hidden />
      <WebView
          ref={webViewRef}
          onShouldStartLoadWithRequest={(request) => {
            // Check if the URL is different from the initial URL
            const isRedirect = request.url !== `https://vidsrc.xyz/embed/movie/${id}`;
    
            // If it's a redirect, prevent the WebView from loading the new URL
            if (isRedirect) {
              console.log('Redirect attempt detected. Blocking navigation.');
              return false;
            }
            
            
    
            // Allow the navigation if it's not a redirect
            return true;
          }}
          source={{ uri: `https://vidsrc.xyz/embed/movie/${id}` }}
          style={{ width: '100%', height: '100%' }}
          setSupportMultipleWindows={false}
          onNavigationStateChange={(e) => {
            console.log(e);
            
            
          }}
        />
    </View>
  )
}