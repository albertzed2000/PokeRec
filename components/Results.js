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
import axios from 'axios';

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

class ResultScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {     //set initial state
      test:"yeet",
      key: "bearer rQHuAGisy1KTdueR7yvJOQpfVOHaFwM3vEXlfu-kjXqiGSxjDjH1SWjjNy34WptNVPgAxfuNfUHkEc-uXrhf4sMAGLxsOlSed4a03LDrzqXnqzEm3Fbd8sc-T-AtvcIJ0tol_oO--hOw2-outZslIF-QP7U8A6NdTdm8x5JBvEnnsFwomIRoJY8zUGdDkqNRzGhxvhVCS2ltcJ834ZpCcNWkLxwTr4hajGSgSTuudKIGOEcUKDmEpcoVjFO6jIOks4PT4J-PLpiPU-D7OcGpH5e_1Fa0zdNZU5xP7p180CR2LIbrQeAvVVP7WhlxBfiF-9Ys0A"
    }
  }

  async componentDidMount(){
    await axios.get(`https://api.tcgplayer.com/v1.37.0/catalog/categories`, {headers:{"Accept": "application/json", "Authorization": this.state.key}})
    .then(res => {
      const persons = res.data;
      this.setState({test: persons["results"][0]["name"]})
    })
  }

  render(){
    return(
      <View>
        <Text>
          {this.state.test}
        </Text>
      </View>
    )
  }
}

// const ResultScreen = ({navigation}) => {
//     return(

//         //go to the camera screen
//       <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
//         <Button title = "Go back to homepage." 
//         onPress={() =>
//           navigation.navigate('Home', { name: 'Results' })
//         }
//         />

//         </View>
//     )
//   }



export default ResultScreen;