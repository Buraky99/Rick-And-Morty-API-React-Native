import { StatusBar } from 'react-native';
import React, { useState, useRef } from 'react';
import type {Node} from 'react';
import MainScreen from "./Components/MainScreen";
import {NavigationContainer} from '@react-navigation/native'

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Dimensions,
  Image,
  Colors
} from 'react-native';
import Screens from './Components/Screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
    <NavigationContainer>

      <Screens></Screens>

    </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({

});
export default App;