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
    Image,
  } from 'react-native';

const HomeScreen = ({navigation}) => {
    return(
    <View style={{flex:1, alignItems: 'center', backgroundColor: "black"}}>
      {/* 'Pokemon' word logo */}
      <Image
        source={require('./images/logo.png')}
        style={styles.backgroundImg}
      />
      <Image
        source={require('./images/logo-2.jpg')}
        style={styles.backgroundImg2}
      />

      <View style={{flex:2, alignItems: 'center'}}>
        {/* <Text style={styles.titleText}>Card Recognizer</Text> */}
        {/* go to the camera screen */}
        <View>
            <CameraButton title = "Go to the camera!" 
            onPress={() =>
              navigation.navigate('Camera', { name: 'Camera' })
            }
            />
          {/* go to the results screen */}
            <ResultsButton title = "Test results" 
            onPress={() =>
              navigation.navigate('Results', { name: 'Results' })
            }
            />
        </View>
        
        <View style={{flex: 3,  flexDirection: 'column-reverse', backgroundColor: "black", alignSelf: 'flex-start'}}>

          {/*go to the help screen */}
          <View style= {{alignSelf:'flex-start'}}>
            <HelpButton
            title="?"
            onPress={() =>
              navigation.navigate('Help', { name: 'Helpscreen' })
            }
            />
          </View>
          
          
        </View>
      </View>
    </View>
  )
}

  const CameraButton = ({onPress, title}) => (
    <TouchableOpacity activeOpacity={0.3} onPress={onPress} style={styles.cameraBtn}>
      <Text style={styles.cameraText}>{title}</Text>
    </TouchableOpacity>
  )

  const HelpButton = ({onPress, title}) => (
    <TouchableOpacity activeOpacity={0.3} onPress={onPress} style={styles.helpBtn}>
      <Text style={styles.helpText}>{title}</Text>
    </TouchableOpacity>
  )

  const ResultsButton = ({onPress, title}) => (
    <TouchableOpacity activeOpacity={0.3} onPress={onPress} style={styles.resultsBtn}>
      <Text style={styles.resultsText}>{title}</Text>
    </TouchableOpacity>
  )

  const styles = StyleSheet.create({
    titleText: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      textShadowColor: 'green',
      textShadowRadius: 100,
      paddingBottom: 25,
      paddingVertical: 25,
    },
    cameraBtn:{
      elevation: 10,
      width: 300,
      borderRadius: 75,
      paddingVertical: 20,
      paddingHorizontal: 35,
      backgroundColor: "red",
      
    },
    cameraText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },

    resultsBtn:{
      elevation: 10,
      width: 300,
      borderRadius: 75,
      paddingVertical: 20,
      paddingHorizontal: 35,
      backgroundColor: "white",
      
    },
    resultsText: {
      fontSize: 18,
      color: "black",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },

    helpBtn:{
      alignSelf:"flex-start", 
      elevation: 10,
      backgroundColor: "skyblue",
      borderRadius: 50,
      paddingVertical: 15,
      paddingHorizontal: 30
    },

    helpText: {
      fontSize: 20,
      color: "#fff",
      fontWeight: "bold",
      textTransform: "uppercase"
    },

    backgroundImg: {
      width: 455,
      height: 200,
      resizeMode: 'cover',
      backgroundColor: 'black',
      
    },
    backgroundImg2: {
      // width: 425,
      // height: 200,
      resizeMode: 'center',
      backgroundColor: 'black',
      
    }
  })


export default HomeScreen;