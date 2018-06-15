import React, { Component } from 'react'
import { AsyncStorage, Text, View, StyleSheet, Switch, AppRegistry, StatusBar, Image, Alert} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection, Minput} from '../user/common';

export default class SendMessage extends Component {
    state = {
        adsoyad: null,
        eposta: null,
    };
    async getKey(key) {
      try {
        this.value = await AsyncStorage.getItem(key);
      } catch (error) {
        console.log("Error retrieving data" + error);
      }
    }
    async componentWillMount() {
      const emailim = await AsyncStorage.getItem('@komsudapiser:email');

      this.setState( {eposta: emailim} );
    }
    onMessagePress () {
      this.setState({ error: '', loading: true });
        myURL= 'http://webstudio.web.tr/send_message.php' + '?message=' + this.state.bodymessage  +'&senderid=' + this.state.eposta + '&receipentid=' + this.props.email;
        return fetch(myURL)
        .then((response) => response.json())
        .then((responseJson) => {
          
          this.setState({error: responseJson.basari, loading: false});
          if (responseJson.basari == true ) {
            this.setState({error: "Başarılı bir şekilde mesajınız gönderildi"})
          } else {
            this.setState({error: responseJson.basari})
          }
          
        })
    }
    render() { 
      let pic = {
        uri: 'http://webstudio.web.tr/resimler/kullaniciresmi/'+ this.props.email + '.jpeg',
      };
      //Alert.alert(this.props.email);
      return (
        <Card>
        <View>
          <StatusBar hidden={true} />
          <Image source={pic} style={{width: 100, height: 150}}/>
          <Text>{this.props.adsoyad}</Text>
          <CardSection>
          <Minput
            label="Your message"
            value={this.state.bodymessage}
            onChangeText={bodymessage => this.setState({ bodymessage })}
          />
          </CardSection>
            <CardSection>
                <Button onPress={this.onMessagePress.bind(this)}>
                 Send Message
                </Button>  
            </CardSection>
        </View>
        </Card>
        );
     }
  }