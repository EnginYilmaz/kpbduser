import React, { Component } from 'react'
import { AsyncStorage, Text, View,StatusBar, Image} from 'react-native'
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
    async componentDidMount() {
      this._mounted = true;
      const emailim = await AsyncStorage.getItem('@komsudapiser:email');
      this.setState( {eposta: emailim} );
    }
    componentWillUnmount() {
      this._mounted = false
    }
    onMessagePress () {
      this.setState({ error: '', loading: true });
        myURL= 'https://webstudio.web.tr/send_message.php' + '?message=' + this.state.bodymessage  +'&senderid=' + this.state.eposta + '&receipentid=' + this.props.email;
        return fetch(myURL)
        .then((response) => response.json())
        .then((responseJson) => {
          if (this._mounted) {
            this.setState({error: responseJson.basari, loading: false});
          }
          if (responseJson.basari == true ) {
            if (this._mounted) {
              this.setState({error: "Başarılı bir şekilde mesajınız gönderildi"})
            }
          } else {
            if (this._mounted) {
              this.setState({error: responseJson.basari})
            }
          }  
        })
    }
    render() { 
      let pic = {
        uri: 'https://webstudio.web.tr/resimler/kullaniciresmi/'+ this.props.email + '.jpeg',
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
            <CardSection>
            <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
              </CardSection>
        </View>
        </Card>
        );
     }
  }


const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  rolTextStyle: {
    fontSize: 20,
    color: 'purple'
  }
};