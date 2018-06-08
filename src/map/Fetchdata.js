import React, { Component } from 'react'
import { AsyncStorage, Text, View, StyleSheet, Switch, Alert, AppRegistry, StatusBar} from 'react-native'
import MapView, {Marker, ProviderPropType} from 'react-native-maps';
import { Actions } from 'react-native-router-flux';

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
});

export default class Fetchdata extends Component {
  constructor (props) {
    super(props);
  };
  state = {
    basari: false,
    markers: [],
  };
 
  async getKey(key) {
    try {
      this.value = await AsyncStorage.getItem(key);
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async saveKey(key,value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }
  componentDidMount = () => {

    return fetch('http://webstudio.web.tr/user_validate.php' + '?email=' + this.getKey('@komsudapiser:email') + '&password=' + this.getKey('@komsudapiser:password'))
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({basari: responseJson });
    })
    .catch((error) =>{
      console.error(error);
    });
    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
         });
         this.onRegionChangeInit (position.coords);

    },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
   }
   onRegionChange (region) {
    return fetch('http://webstudio.web.tr/query_maps.php' + '?latitude=' + region.latitude + '&longitude=' + region.longitude)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
       this.setState({markers: responseJson });
      }

    })
    .catch((error) =>{
      console.error(error);
    });
  }
  onRegionChangeInit (region) {
    return fetch('http://webstudio.web.tr/query_maps.php' + '?latitude=' + region.latitude + '&longitude=' + region.longitude)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
       this.setState({markers: responseJson });
      }

    })
    .catch((error) =>{
      console.error(error);
    });
  }
  onPressMarker(index) {
    this.props.callbackMethod(index);
  }
  
  render() {
    let enlem = parseFloat(this.props.latitude);
    let boylam = parseFloat(this.props.longitude);  
    return (
        <View>
          <StatusBar hidden={true} />
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: enlem,
                    longitude: boylam, 
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.015,
                }}
            onRegionChange={this.onRegionChange.bind(this)}
            >
            {this.state.markers.map((marker, index) => (
              <MapView.Marker key={marker.index} coordinate={marker.latlng} title={marker.title} onPress={e => this.onPressMarker(marker.index)}/>
            ))}

          </MapView>
        </View>
      );
   }
}