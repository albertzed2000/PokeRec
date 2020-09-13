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

//import camera functions
import { RNCamera, FaceDetector } from 'react-native-camera';

import CameraScreen from "./components/CameraScreen";
import HomeScreen from "./components/HomeScreen";
import ResultScreen from "./components/Results";
import HelpScreen from "./components/HelpScreen";


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

//import other relevant react components
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


//create a stack navigator
const Stack = createStackNavigator();


//


//our main app, which consists of a stack of navigatable screens
const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pokemon Recognition' }}/>
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Results" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/*
const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>

      </NavigationContainer>
    </>
  );
};
*/
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
