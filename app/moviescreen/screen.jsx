import { View, Text, StatusBar, Platform, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
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
  }, [])

  

  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error:', nativeEvent);
  };

  return (
    <ImageBackground source={require('./../../assets/images/404.png')} style={{ flex: 1 }}>
      <StatusBar hidden />
      <WebView
          source={{ uri: `https://vidsrc.xyz/embed/movie/${id}` }}
          style={{ width: '100%', height: '100%' }}
          
        />
      {/* <WebView
          source={{
            uri: 'https://github.com/react-native-webview/react-native-webview',
          }}
          onMessage={(event) => {}}
          injectedJavaScript={runFirst}
        /> */}
    </ImageBackground>
  )
}