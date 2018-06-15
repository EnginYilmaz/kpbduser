import React, { Component } from 'react'
import { AsyncStorage, Text, View, StyleSheet, Switch, AppRegistry, StatusBar, Image} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection} from '../user/common';

export default class ShowProfile extends Component {
    state = {
        adsoyad: null,
        email: null,
    };
    onMessagePress () {
      Actions.sendmessage({email: this.props.email});
    }
    render() { 
      let pic = {
        uri: 'http://webstudio.web.tr/resimler/kullaniciresmi/'+ this.props.email + '.jpeg',
      }; 
      return (
        <Card>
        <View>
          <StatusBar hidden={true} />
          <Image source={pic} style={{width: 100, height: 150}}/>
          <Text>{this.props.adsoyad}</Text>
          <CardSection>
          <Button onPress={this.onMessagePress.bind(this)}>
            Message
          </Button>     
          </CardSection>     
        </View>
        </Card>
        );
     }
  }