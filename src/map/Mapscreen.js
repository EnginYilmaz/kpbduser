import I18n from 'ex-react-native-i18n';
import React, { Component } from 'react';
import {Alert,Platform, Text, Image, AsyncStorage, View, StyleSheet } from 'react-native';
import Fetchdata from './Fetchdata.js';
import ShowProfile from './ShowProfile.js';
import ShowPortfolio from './ShowPortfolio.js';
import { createStackNavigator, createDrawerNavigator, NavigationActions, DrawerItems, SafeAreaView } from 'react-navigation'; // Version can be specified in package.json
import { Constants, Location, Permissions } from 'expo';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  map: {
    height: 200,
    width: 400,
    flex: 1,
  },
  hub: {
    height: 300,
    width: 400,
    flex: 1,
  },
  tub: {
    height: 300,
    width: 400,
    flex: 1,
    flexDirection: 'row'
  },
});

I18n.initAsync();

//Alert.alert(I18n.locale)
if ( I18n.locale== 'en') {
  food_on_the_maps= 'Foods on the maps';
} else if (I18n.locale == 'tr') {
  food_on_the_maps= 'Haritadaki yiyecekler!';
}
class Mapscreen extends Component {

  static navigationOptions = {
    drawerLabel: food_on_the_maps,
    drawerIcon: ({ tintColor }) => (
      <Image
        style={{ width: 30,height: 30}}
        source={require('../../assets/food-on-the-maps.png')}
      />
    ),

    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  state = {
    lat: null,
    lng: null,
    adsoyad: null,
    email: null,
  }
  constructor(props) {
    super(props);

  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
  
    let location = await Location.getCurrentPositionAsync({});
  //  this.setState({ location });
    //Alert.alert(location.coords.latitude);
    this.setState({ 
      lat : parseFloat(location.coords.latitude),
      lng: parseFloat(location.coords.longitude)
    });
    let boylam = parseFloat(this.props.longitude);

  };
 
  async componentDidMount() {
    this._mounted = true;
  }
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }
  componentWillUnmount() {
    this._mounted = false
  }
  callbackMethod = (index) => {
    return fetch('https://webstudio.web.tr/query_map_user.php' + '?uid=' + index, {
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
            this.setState({
              adsoyad: responseJson.adsoyad,
              email: responseJson.email
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    //Alert.alert(this.props.navigation+ ' deneme');
    //const {navigate} = this.props.navigation; //recieves prop from StackNavigator
    if ( this.state.email != null) {
      return (
        <View style={styles.container}>
          <Fetchdata style={styles.map} latitude={this.state.lat} longitude={this.state.lng} callbackMethod={this.callbackMethod} />
          <ShowProfile propsnav={this.props.navigation} style={styles.hub} adsoyad={this.state.adsoyad} email={this.state.email} />
          <ShowPortfolio style={styles.tub} email={this.state.email} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Fetchdata style={styles.map} latitude={this.state.lat} longitude={this.state.lng} callbackMethod={this.callbackMethod} />
          <ShowProfile propsnav={this.props.navigation} style={styles.hub} adsoyad={this.state.adsoyad} email={this.state.email} />
          <Text>Görüntülenecek yiyecek bulunamadı</Text>
      </View>
      );      
    }
  }
}
export default Mapscreen;
