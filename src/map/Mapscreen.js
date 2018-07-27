import React, { Component } from 'react';
import { AsyncStorage, View, StyleSheet  } from 'react-native';
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
    flex:1,
  },
  hub: {
    height: 300,
    width: 400,
    flex: 1,
  },
  tub: {
    height: 300,
    width: 400,
    flex:1,
    flexDirection: 'row'
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
    this._mounted = true;
    let lat = await AsyncStorage.getItem('@komsudapiser:lat');   
    let lng = await AsyncStorage.getItem('@komsudapiser:lng');  
    console.log (lat);
    if (this._mounted) {
      this.setState({ 
        lat: lat,
        lng: lng 
      });
    }
  } 
  componentWillUnmount() {
    this._mounted = false
  }
  callbackMethod = (index) => {
      return fetch('https://webstudio.web.tr/query_map_user.php' + '?uid=' + index)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          if (this._mounted) {
            this.setState({adsoyad: responseJson.adsoyad, 
                           email: responseJson.email });
          }
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