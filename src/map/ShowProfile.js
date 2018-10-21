import React, { Component } from 'react'
import { Alert, Text, View, StatusBar, Image} from 'react-native'
import { Button, Card, CardSection} from '../user/common';
import I18n from 'ex-react-native-i18n';
import { createStackNavigator, createDrawerNavigator, NavigationActions, DrawerItems, SafeAreaView } from 'react-navigation'; // Version can be specified in package.json
//import SendMessage from '../messages/SendMessage.js';

export default class ShowProfile extends Component {
  static navigationOptions = {
    drawerLabel: 'showprofile',
    drawerIcon: ({ tintColor }) => (
      <Image
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  }
  constructor(props) {
    super(props);
  }
    state = {
        adsoyad: null,
        email: null,
    };
    onMessagePress () {
      //Actions.sendmessage({email: this.props.email});
      //Alert.alert(this.props.propsnav)
      //Alert.alert(this.props.email)
      this.props.propsnav.navigate('sendmessage', { email: this.props.email })
    }
    render() { 
      let pic = {
        uri: 'https://webstudio.web.tr/resimler/kullaniciresmi/'+ this.props.email + '.jpeg',
      }; 
      if (this.props.email) {
      return (
        <Card>
        <View>
          <StatusBar hidden={true} />
          <Image source={pic} style={{width: 100, height: 150}}/>
          <Text>{this.props.adsoyad}</Text>
          <CardSection>
          <Button onPress={this.onMessagePress.bind(this)}>
            {I18n.t('i18n_sendmessage')}
          </Button>     
          </CardSection>                                                                                                                                                      
        </View>
        </Card>
        );
      } else {                                                                                                                          
        return (
          <Card>
          <CardSection>
            <Text></Text>
            </CardSection>
            </Card>
        );
      }
     }
  }
