import React, { Component } from 'react'
import { AsyncStorage, Text, View, StyleSheet, Switch, Alert, StatusBar} from 'react-native'
import MapView, {Marker, ProviderPropType} from 'react-native-maps';

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
    if (this._mounted) {
      try {
        this.value = await AsyncStorage.getItem(key);
      } catch (error) {
        //console.log("Error retrieving data" + error);
      }
    }
  }

 
  componentWillUnmount() {
    this._mounted = false;
  }
  async saveKey(key,value) {
    if (this._mounted) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        //console.log("Error saving data" + error);
      }
    }
  }
  componentDidMount = () => {
    this._mounted = true;
    return fetch('https://webstudio.web.tr/user_validate.php' + '?email=' + this.getKey('@komsudapiser:email') + '&password=' + this.getKey('@komsudapiser:password'), {
      method: "GET",
      mode: "cors",
      cache: "force-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Encoding": "zlib",
      },
      redirect: "follow",
      referrer: "no-referrer",
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (this._mounted) {
        this.setState({basari: responseJson });
      }
    })
    .catch((error) =>{
      console.error(error);
    });

   }

   onRegionChanged (region) {
    return fetch('https://webstudio.web.tr/query_maps.php' + '?latitude=' + region.latitude + '&longitude=' + region.longitude, {
      method: "GET",
      mode: "cors",
      cache: "force-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Encoding": "zlib",
      },
      redirect: "follow",
      referrer: "no-referrer",
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        if (this._mounted) {
          this.setState({markers: responseJson });
        }
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
    //Alert.alert(enlem);
    //let currentposition = { this.props.latitude + 0.001, this.props.longitude + 0.001}
    return (
        <View>
          
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: this.props.latitude,
                    longitude: this.props.longitude, 
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.015,
                }}
            onRegionChange={this.onRegionChanged.bind(this)}
            >
            {this.state.markers.map((marker, index) => (
              <Marker key={index} coordinate={marker.latlng} title={marker.title} onPress={e => this.onPressMarker(marker.index)}/>
            ))}
          </MapView>
        </View>
      );
   }
}
