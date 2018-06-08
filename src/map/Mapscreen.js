import React, { Component } from 'react';
import { AsyncStorage, Text, View, StyleSheet, Switch, Alert, AppRegistry  } from 'react-native';
import MapView from 'react-native-maps';
import Fetchdata from './Fetchdata.js';
import ShowProfile from './ShowProfile.js';
import ShowPortfolio from './ShowPortfolio.js';


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  map: {
    height: 300,
    width: 400,
  },
  hub: {
    height: 300,
    width: 400,
  },
  tub: {
    height: 300,
    width: 400,
  },
});  

class Mapscreen extends Component {
  state = {
    lat: null,
    lng: null,
    adsoyad: null,
    email: null,
  }
  constructor (props) {
    super(props);
   }
  async componentDidMount() {
    let lat = await AsyncStorage.getItem('@komsudapiser:lat');   
    let lng = await AsyncStorage.getItem('@komsudapiser:lng');  
    console.log (lat);
    this.setState({ 
      lat: lat,
      lng: lng 
    })  
  } 
  callbackMethod = (index) => {
      return fetch('http://webstudio.web.tr/query_map_user.php' + '?uid=' + index)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
         this.setState({adsoyad: responseJson.adsoyad, 
                         email: responseJson.email });
        }
      })
      .catch((error) =>{
        console.error(error);
      });  
  };

  render() {
    return (
      <View style ={styles.container}>
        <Fetchdata style={styles.map} latitude={this.state.lat} longitude={this.state.lng} callbackMethod={this.callbackMethod} />
        <ShowProfile style={styles.hub} adsoyad={this.state.adsoyad} email={this.state.email} />
        <ShowPortfolio style={styles.tub} email={this.state.email} />
      </View>
    );
  }
}

export default Mapscreen;