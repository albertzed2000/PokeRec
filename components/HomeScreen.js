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
    TouchableOpacity,
  } from 'react-native';

const HomeScreen = ({navigation}) => {
    return(

        //go to the camera screen
      <View>
        <CameraButton title = "Go to the camera!" 
        onPress={() =>
          navigation.navigate('Camera', { name: 'Camera' })
        }
        />

        
        {/*go to the help screen */}
        <HelpButton
        title="How does this work?"
        onPress={() =>
          navigation.navigate('Help', { name: 'Helpscreen' })
        }
        />


        </View>
    )
  }

  const CameraButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.cameraBtn}>
      <Text style={styles.cameraText}>{title}</Text>
    </TouchableOpacity>
  )

  const HelpButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.helpBtn}>
      <Text style={styles.helpText}>{title}</Text>
    </TouchableOpacity>
  )

  const styles = StyleSheet.create({
    cameraBtn:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 25,
      paddingHorizontal: 12
      
    },
    cameraText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },

    helpBtn:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 25,
      paddingHorizontal: 12
      
    },
    helpText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
  })


export default HomeScreen;