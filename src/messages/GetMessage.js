import React, { Component } from 'react'
import { Image, AsyncStorage, Text, View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { Card, CardSection } from '../user/common';
import I18n from 'ex-react-native-i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  tub: {

  },
});
I18n.initAsync();

export default class GetMessage extends Component {

  state = {
    email: null,
    messages: [],
  };
  async componentDidMount() {
    this._mounted = true;

    const emailim = await AsyncStorage.getItem('@komsudapiser:email');
    //console.log(emailim);
    if(this._mounted) {
    this.setState({ error: '', loading: true });
    }
    return fetch('https://webstudio.web.tr/get_message.php' + '?email=' + emailim, {
      method: "GET",
      mode: "cors",
      cache: "no-store",
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
          
          <Text>{I18n.t('i18n_nomessage_inbox')}</Text>
        </View>
      );
    }
  }
}