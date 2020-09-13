import 'react-native-gesture-handler';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 //import react
import React from 'react';

//import necessary tools to allow for navigation in react native
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import basic react native components
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Text,
    StatusBar,
  } from 'react-native';

const HomeScreen = ({navigation}) => {
    return(
      <View>
        <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Camera', { name: 'Camera' })
        }
      />
          <Text>
            yeet          
          </Text>
        </View>
    )
  }



export default HomeScreen;