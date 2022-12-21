import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import AppScreen from "./src/Screens/App"

const App: () => Node = () => {
  return (
    <SafeAreaView style={{flex:1}}>
        <AppScreen/>
    </SafeAreaView>
  );
};

export default App;

