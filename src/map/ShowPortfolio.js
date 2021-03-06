import React, { Component } from 'react'
import {Text, View, StyleSheet, StatusBar, Image } from 'react-native'
import I18n from 'ex-react-native-i18n';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  tub: {

  },
      
});
export default class ShowPortfolio extends Component {
  state = {
    email: null,
    urunler: [],
  };
  async componentDidMount() {
    this._mounted = true;
  }
  componentWillUnmount() {
    this._mounted = false
  }
  getPortfolio() {
    return fetch('https://webstudio.web.tr/portfolio_get_map.php' + '?email=' + this.props.email, {
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
         this.setState({
           urunler: responseJson
         });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    this.getPortfolio();

    if (this.state.urunler != null) {
      return (
        <View style={styles.container}>
          
          
          {this.state.urunler.map((urun, index) => (
            <View key={index} style={styles.tub}>
              <Image key={index} style={{width: 50, height: 50}} source= {{ uri: 'https://webstudio.web.tr/resimler/portfolio/' + urun.resimler}} />
              <Text key={index}>{urun.urunadi}</Text>
              <Text key={index} >{urun.urunaciklamasi}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <View>
          
          <Text>{I18n.t('i18n_no_food')}</Text>
        </View>
      );
    }
  }
}
