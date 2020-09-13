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
      <Text style={styles.titleText}>Pokemon Card Recognizer</Text>
      <View style={{flex:2}}>
        <Image
        source={{uri: 'https://reactjs.org/logo-og.png'}}
        style={styles.backgroundImg}
        />
        
        <View style={{flex: 3,  flexDirection: 'column-reverse', alignItems: 'center', backgroundColor: "black"}}>

          {/*go to the help screen */}
          <View style= {{alignSelf:'flex-start'}}>
            <HelpButton
            title="?"
            onPress={() =>
              navigation.navigate('Help', { name: 'Helpscreen' })
            }
            />
          </View>
          {/* go to the camera screen */}
          <View>
            <CameraButton title = "Go to the camera!" 
            onPress={() =>
              navigation.navigate('Camera', { name: 'Camera' })
            }
            />
            <Button title = "Test results" 
            onPress={() =>
              navigation.navigate('Results', { name: 'Results' })
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
      paddingVertical: 25,
      paddingHorizontal: 35,
      backgroundColor: "steelblue",
      
    },
    cameraText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },

    helpBtn:{
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
      width: 425,
      height: 350,
      resizeMode: 'cover',
    }
  })


export default HomeScreen;