import 'react-native-gesture-handler';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 //import react
import React, {Component} from 'react';

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
    TextInput,
    Image,
    TouchableHighlight,
  } from 'react-native';

//import other stuff
import ImagePicker from 'react-native-image-picker';
import Amplify, {API} from 'aws-amplify';
import ImageEditor from "@react-native-community/image-editor";
import RNFS from 'react-native-fs';


// Amplify configuration for API-Gateway
Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'pokedex',   //your api name
        endpoint:'https://lkui5eu18d.execute-api.us-east-1.amazonaws.com/test2', //Your Endpoint URL
      },
    ],
  },
 });


  class Registration extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: 'storeImage.png',
        userId: '',
        image: '',
        capturedImage: '',
        objectName: '',
        objectSet: '',
      };
    }

   // It selects image from filesystem or capture from camera
    captureImageButtonHandler = () => {
      this.setState({
        objectName: '',
        objectSet: '',
      });
    
      ImagePicker.showImagePicker(
        {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
        response => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            // You can also display the image using data:
            const source = {uri: 'data:image/jpeg;base64,' + response.data};
            this.setState({
              capturedImage: response.uri,
              base64String: source.uri,
            });
          }
        },
      );
    };
    
   // this method triggers when you click submit. If the image is valid then It will send the image to API Gateway. 
    submitButtonHandler = () => {
      if (
        this.state.capturedImage == '' ||
        this.state.capturedImage == undefined ||
        this.state.capturedImage == null
      ) {
        alert('Please capture an image with the camera or select one from device');
      } else {

        cropName = {
          offset: {x: 42, y: 0},
          size: {width: 137, height: 32},
        };

        cropSet = {
          offset: {x: 0, y: 272},
          size: {width: 64, height: 64},
        }

        ImageEditor.cropImage(this.state.capturedImage, cropSet).then(url1 => {
          console.log("Cropped image uri", url1);
          RNFS.readFile(url1, 'base64').then(base64Data =>{
            console.log(base64Data)
            const apiName = 'pokedex';
          const path1 = '/uploadImage';
          const init1 = {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/x-amz-json-1.1',
            },
            body: JSON.stringify({
              Image: base64Data,
              name: 'storeImage1.png',
            }),
        };

        API.post(apiName, path1, init1).then(response => {
          console.log(response)
          if (JSON.stringify(response.CustomLabels.length) > 0) {
            this.setState({
              objectSet: response.CustomLabels[0].Name,
            });
          } else {
            alert('Please Try Again.');
          }
        })
        .catch(error => console.log(error));
          
          })
          
        })

        ImageEditor.cropImage(this.state.capturedImage, cropName).then(url2 => {
          console.log("Cropped image uri", url2);
          RNFS.readFile(url2, 'base64').then(base64Data => {
            console.log(base64Data);
            // get card name
          const apiName = 'pokedex'
          const path2 = '/getCardName';
          const init2 = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-amz-json-1.1',
          },
          body: JSON.stringify({
            Image: base64Data,
            name: 'storeImage2.png',
          }),
          }
          API.post(apiName, path2, init2).then(response => {
            console.log(response)
            if (JSON.stringify(response.TextDetections.length) > 0) {
              let cardName = response.TextDetections[0]["DetectedText"]
              /** let cardName = ""
              for (let i = 0; i < response.TextDetections.length; i++) {
                cardName = cardName + response.TextDetections[i]["DetectedText"] + " "
              }
              cardName = cardName.slice(0, cardName.length - 1)
              */

              console.log(cardName)
              this.setState({
                objectName: cardName,
              });
            } else {
              alert('Please Try Again.');
            }
          })
          .catch(error => console.log(error)); 
        });
      }
        );

      this.props.navigation.navigate('Results', { setName: this.state.objectSet, cardName: this.state.objectName});
    
        
      }
    };
    
    render() {
      if (this.state.image !== '') {
      }
      return (
        <View style={styles.MainContainer}>
          <ScrollView>
            <Text
              style={{
                fontSize: 20,
                color: '#000',
                textAlign: 'center',
                marginBottom: 15,
                marginTop: 10,
              }}>
              Capture Image
            </Text>
            {this.state.capturedImage !== '' && (
              <View style={styles.imageholder}>
                <Image
                  source={{uri: this.state.capturedImage}}
                  style={styles.previewImage}
                />
              </View>
            )}
            {this.state.objectName ? (
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.TextInputStyleClass}
                value={this.state.objectName}
              />
            ) : null}
            <TouchableHighlight
              style={[styles.buttonContainer, styles.captureButton]}
              onPress={this.captureImageButtonHandler}>
              <Text style={styles.buttonText}>Capture Image</Text>
            </TouchableHighlight>
    
            <TouchableHighlight
              style={[styles.buttonContainer, styles.submitButton]}
              onPress={this.submitButtonHandler}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableHighlight>
          </ScrollView>
        </View>
      );
    }
   }
    
   const styles = StyleSheet.create({
    TextInputStyleClass: {
      textAlign: 'center',
      marginBottom: 7,
      height: 40,
      borderWidth: 1,
      marginLeft: 90,
      width: '50%',
      justifyContent: 'center',
      borderColor: '#D0D0D0',
      borderRadius: 5,
    },
    inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      borderBottomWidth: 1,
      width: 300,
      height: 45,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonContainer: {
      height: 45,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      width: '80%',
      borderRadius: 30,
      marginTop: 20,
      marginLeft: 5,
    },
    captureButton: {
      backgroundColor: '#337ab7',
      width: 350,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    submitButton: {
      backgroundColor: '#C0C0C0',
      width: 350,
      marginTop: 5,
    },
    imageholder: {
      borderWidth: 1,
      borderColor: 'grey',
      backgroundColor: '#eee',
      width: '50%',
      height: 150,
      marginTop: 10,
      marginLeft: 90,
      flexDirection: 'row',
      alignItems: 'center',
    },
    previewImage: {
      width: '100%',
      height: '100%',
    },
   });
    
   export default Registration;