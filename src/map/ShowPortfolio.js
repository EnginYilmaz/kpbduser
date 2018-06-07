
import React, { Component } from 'react'
import { AsyncStorage, Text, View, StyleSheet, Switch, AppRegistry, StatusBar, Image } from 'react-native'
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  hub: {
    flex: 1,
    height: 300,
    width: 400,
  },

});
export default class ShowPortfolio extends Component {
  state = {
    email: null,
    urunler: [],
  };
  getPortfolio() {
    return fetch('http://webstudio.web.tr/portfolio_get_map.php' + '?email=' + this.props.email)
      .then((response) => response.json())
      .then((responseJson) => {
        //this.setState({basari: responseJson });
        this.setState({
          urunler: responseJson
        });
        //console.log(this.state.urunler);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    this.getPortfolio();
    /*
    let pic = {
      uri: 'http://webstudio.web.tr/resimler/kullaniciresmi/'+ this.props.email + '.jpeg',
    }; 
    */
    if (this.state.urunler) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar hidden={true} />

          {this.state.urunler.map((urun, index) => (
            <View>
              <Image key={index} style={{width: 50, height: 50}} source= {{ uri: 'http://webstudio.web.tr/resimler/portfolio/' + urun.resimler}} />
              <Text key={index}>{urun.urunadi}: {urun.urunaciklamasi}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar hidden={true} />
          <Text>Herhangi bir kek bulunamadı</Text>
        </View>
      );
    }
  }
}