import React, { Component } from 'react';
import { AsyncStorage, Text, View, StyleSheet, Switch, Alert, AppRegistry  } from 'react-native';
import MapView from 'react-native-maps';
import Fetchdata from './Fetchdata.js';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  map: {
    height: 400,
    width: 400,
  },
  hub: {
    height: 300,
    width: 400,
  },
});  

class Mapscreen extends Component {
  state = {
    lat: null,
    lng: null
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
    //Alert.alert(lat);
  } 

  render() {
    //Alert.alert(this.state.lat);
    return (
      <View style ={styles.container}>
        <Fetchdata latitude={this.state.lat} longitude={this.state.lng}/>
      </View>
    );
  }
}

export default Mapscreen;