import React, { Component } from 'react'
import { AsyncStorage, Text, View, StyleSheet, Switch, Alert, AppRegistry, StatusBar, Image} from 'react-native'
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    hub: {
      height: 300,
      width: 400,
    },
  });

export default class Showdata extends Component {
    state = {
        adsoyad: null,
        email: null,
    };
    render() { 
      let pic = {
        uri: 'http://webstudio.web.tr/resimler/kullaniciresmi/'+this.props.email + '.jpeg',
      }; 
      return (

        <View styles={styles.hub}>
            <StatusBar hidden={true} />
            <Image source={pic} style={{width: 100, height: 150}}/>
            <Text>{this.props.adsoyad}</Text>
        </View>
        );
     }
  }