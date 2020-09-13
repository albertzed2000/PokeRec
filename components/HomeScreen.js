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

        //go to the camera screen
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
        title="Go to the camera!"
        onPress={() =>
          navigation.navigate('Camera', { name: 'Camera' })
        }
        />

        
        {/*go to the help screen */}
        <Button
        title="How does this work?"
        onPress={() =>
          navigation.navigate('Help', { name: 'Helpscreen' })
        }
        />

        </View>
    )
  }



export default HomeScreen;