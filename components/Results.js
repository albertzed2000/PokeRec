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
  Linking,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';


//test data
const testName2 = "Polteageist";
const testSet2 = "darkness_ablaze";

//test data
const testName1 = "Arcanine";
const testSet1 = "rebel_clash";

//convert a snakecase input to camelcase but spaced. eg rebel_clash to rebel Clash. Allows us to use output as a search query for our trading cards
const snakeToSpacedCamel = (str) => str.replace(
  /([-_][a-z])/g,
  (group) => group.toUpperCase()
                  .replace('-', ' ')
                  .replace('_', ' ')
);



class ResultScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {     //set initial state
      key: "bearer rQHuAGisy1KTdueR7yvJOQpfVOHaFwM3vEXlfu-kjXqiGSxjDjH1SWjjNy34WptNVPgAxfuNfUHkEc-uXrhf4sMAGLxsOlSed4a03LDrzqXnqzEm3Fbd8sc-T-AtvcIJ0tol_oO--hOw2-outZslIF-QP7U8A6NdTdm8x5JBvEnnsFwomIRoJY8zUGdDkqNRzGhxvhVCS2ltcJ834ZpCcNWkLxwTr4hajGSgSTuudKIGOEcUKDmEpcoVjFO6jIOks4PT4J-PLpiPU-D7OcGpH5e_1Fa0zdNZU5xP7p180CR2LIbrQeAvVVP7WhlxBfiF-9Ys0A",
      productNum: 0,
      productSKUs: [],
      productPrice: 0,
      notFound: false,
      cardName: "",
      setName: "",
      buyLink: "",
      imageLink: "",
    }

    //setup props if they exist
    if(this.props.route.params.setName){
      this.setState({setName:route.params.setName})
    }
    if(this.props.route.params.cardName){
      this.setState({cardName:route.params.cardName})
    }

    //TEST THIS VERSION IF THE ABOVE VERSION DOESN'T WORK
    // if(this.props.route.params.setName){
    //   this.setState({setName:this.props.route.params.setName})
    // }
    // if(this.props.route.params.cardName){
    //   this.setState({cardName:this.props.route.params.cardName})
    // }

  }

  async componentDidMount(){

    //entering componentDidMount, we assume we have two things: 1) the name of the card, 2) which set it comes from (in snakecase, which we must convert)


    //step 1: convert setName to snakeCase

    let setName = snakeToSpacedCamel(this.state.setName); // TODO: Replace testSet1 with actual input from props (something like this.props.name, or whatever brian names the variables) *******************************************


    //step 2: use searchCategoryProducts, enter the card + set we're looking for, and receive a list of product IDS matching the description
        //step 2+: pick the first result from the list of results we get
        //step 2++: return an error if result list is empty (no cards are found)
        
    await axios.post(`https://api.tcgplayer.com/catalog/categories/3/search`, {
      "filters": [ //filter by card name and name of set
        {"name": "ProductName",
        "values": [this.state.cardName]}, // TODO: Replace testName1 with actual input from props (something like this.props.cardname, or whatever brian decides prop name is) *****************
        {"name": "SetName",
        "values": [setName]}
      ]
    }, {headers:{"Accept": "application/json", "Authorization": this.state.key, "content-type": "text/json"}})
    .then(res => {
      if(res.data["results"].length > 0){ // if list is not empty, setState productNum to the first result
        this.setState({productNum: res.data["results"][0]});
      }
      else{
        this.setState({productNum: -1, notFound: true});
      }
    })
    .catch(err => console.log(err));
  


    //step 3: we now have the productId. use getProductSKU, entering product ID. Receive a list of SKUs
      //step 3+: if list if empty, return an error (no instances of this card is on the market)

      await axios.get('https://api.tcgplayer.com/catalog/products/productId/skus?productId=' + this.state.productNum, {headers:{"Accept": "application/json", "Authorization": this.state.key}})
      .then(res => {
        if(res.data["results"].length > 0){ //if the list of SKUs is greater than 0, we set our productSKUS list to it
          this.setState({productSKUs: res.data["results"]})
        }
        else{ // otherwise, indicate that we weren't able to find it
          this.setState({notFound: true})
        }
      })
      .catch(err => console.log(err));
    


    //step 4: we have a list of SKUs now. look at first sku (best condition) and see if it's worth more than 0. If it is, then return its price.

        await axios.get('https://api.tcgplayer.com/pricing/marketprices/productconditionId?productconditionId=' + this.state.productSKUs[0]["skuId"],
         {headers:{"Accept": "application/json", "Authorization": this.state.key}})
        .then(res => {
          if(res.data["results"].length > 0 && res.data["results"][0]["price"] > 0){ //if the list of SKUs is greater than 0, we set our productSKUS list to it
            this.setState({productPrice: res.data["results"][0]["price"]});
          }
        })
        .catch(err => console.log(err));
      


    //step 4.5: get the link at which a user can buy these pokemon cards from.

    await axios.get('https://api.tcgplayer.com/catalog/products/productIds?productIds=' + this.state.productNum,
    {headers:{"Accept": "application/json", "Authorization": this.state.key}})
   .then(res => {
     if(res.data["results"].length > 0){ //if the list of SKUs is greater than 0, we set our productSKUS list to it
       this.setState({buyLink: res.data["results"][0]["url"], imageLink: res.data["results"][0]["imageUrl"]}); //save the link to buying the card and a direct link to the image source
     }
   })
   .catch(err => console.log(err));
      
      
    //step 5: we have the price of the card now. display the price
      //step 5+: display an image of the card.
      //step 5++: display a hyperlink to purchase this card


  }
  render(){
    return(
      <View style={{
        backgroundColor:'darkcyan',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        }}>

        <Text style={styles.cardNum}>
         Card Number: {this.state.productNum}
        </Text>

        <Text style={styles.cardName}>
         Card Name: {this.state.cardName}
        </Text>

        <Text style={styles.setName}>
         Set Name: {this.state.setName}
        </Text>     

        <Text style={styles.price}>
         This card is worth up to: ${this.state.productPrice}
        </Text>

        <BuyBtn onPress={() => Linking.openURL(this.state.buyLink)} style={styles.buyBtn} title='Buy it here!'/>


      </View>
    )
  }
}

const BuyBtn = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.buyBtn}>
    <Text style={styles.buyBtn}>{title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  cardNum: {
    color: 'turquoise',
    fontWeight: 'bold',
    fontSize: 30
  }
,
  cardName: {
    color: 'aquamarine',
    fontWeight: 'bold',
    fontSize: 30
  },

  setName: {
    color: 'lightskyblue',
    fontWeight: 'bold',
    fontSize: 30
  },

  price: {
    color: 'lightblue',
    fontWeight: 'bold',
    fontSize: 25
  },

  buyBtn: {
    alignSelf: 'center',
    color: 'white',
    backgroundColor: 'skyblue',
    borderRadius: 60,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 30
  }
})


export default ResultScreen;