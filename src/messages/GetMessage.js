
import React, { Component } from 'react'
import { AsyncStorage, Text, View, StyleSheet, Switch, AppRegistry, StatusBar, Image, Alert, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection, Minput } from '../user/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  tub: {

  },

});
export default class GetMessage extends Component {
  state = {
    email: null,
    messages: [],
  };
  async componentDidMount() {
    this._mounted = true;

    const emailim = await AsyncStorage.getItem('@komsudapiser:email');
    console.log(emailim);
    if(this._mounted) {
    this.setState({ error: '', loading: true });
    }
    return fetch('https://webstudio.web.tr/get_message.php' + '?email=' + emailim)
      .then((response) => response.json())
      .then((responseJson) => {
        if(this._mounted) {
          this.setState({
            messages: responseJson
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  componentWillUnmount() {
    this._mounted = false
  }
  render() {
    if (this.state.messages) {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <ScrollView>
          <Card>
            <View style={styles.tub}>

              {this.state.messages.map((message, index) => (
                <CardSection key={index}>
                  <Text key={index}>{message.name} </Text>
                  <Text key={index} >{message.mesaj} </Text>
                </CardSection>
              ))}
            </View>
          </Card>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View>
          <StatusBar hidden={true} />
          <Text>Herhangi bir mesaj bulunamadı</Text>
        </View>
      );
    }
  }
}