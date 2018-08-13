import React, { Component } from 'react';
import { Scene, Router, Drawer} from 'react-native-router-flux';
import Plainlogin from './src/user/Plainlogin.js';
import Mapscreen from './src/map/Mapscreen.js';
import FBRegister from './src/user/FBRegister.js';
import MyAccountForm from './src/user/MyAccountForm.js';
import Plainregister from './src/user/Plainregister.js';
import MyPortfolio from './src/portfolio/MyPortfolio.js';
import MyMessages from './src/messages/GetMessage.js';
import { View, Text, AsyncStorage} from 'react-native';
import CameraScreen from './src/user/CameraScreen.js';
import CameraPortfolioScreen from './src/portfolio/CameraPortfolioScreen.js';
import SendMessage from './src/messages/SendMessage.js';
import HamburgerMenu from './src/HamburgerMenu.js';
import MenuIcon from './images/menu_burger.png';
import I18n from 'ex-react-native-i18n';

export default class RouterComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      logged: false,
      loading: true,
    };
  };
  componentWillMount() {
    AsyncStorage.getItem('@komsudapiser:oturum')
      .then((oturum) => {
        if (oturum == 'basarili') {
          this.setState({
            logged: true,
            loading: false,
          });
        } else {
          this.setState({
            logged: false,
            loading: false,
          })
        }
      }
      );
  };
  render() {
    if (this.state.loading) {
      return <View><Text>Oturum açılıyor...</Text></View>;
    }

    if (this.state.logged == true) {
      return (
        <Router>
          <Drawer
            contentComponent={HamburgerMenu}
            drawerImage={MenuIcon}
            drawerWidth={300}
          >
            <Scene key="myaccount" component={MyAccountForm} title="Komşuda pişer" />
            <Scene key="portfolio" component={MyPortfolio} title="Komşuda pişer" />
            <Scene key="messages" component={MyMessages} title="Komşuda pişer" />
            <Scene key="user" component={Plainlogin} title="Komşuda pişer" />
            <Scene key="plainregister" component={Plainregister} title="Komşuda pişer" />
            <Scene key="mapscreen" component={Mapscreen} title="Komşuda pişer" initial />
            <Scene key="fbregister" component={FBRegister} title="Komşuda pişer" />
            <Scene key="photograph" component={CameraScreen} title="Komşuda pişer" />
            <Scene key="photoportfolio" component={CameraPortfolioScreen} title="Komşuda pişer" />
            <Scene key="sendmessage" component={SendMessage} title="Komşuda pişer" />
          </Drawer>
        </Router>
      );
    } else if (this.state.logged == false) {
      return (
        <Router>
          <Drawer
            contentComponent={HamburgerMenu}
            drawerImage={MenuIcon}
            drawerWidth={300}
          >
            <Scene key="myaccount" component={MyAccountForm} title="Komşuda pişer" />
            <Scene key="portfolio" component={MyPortfolio} title="Komşuda pişer" />
            <Scene key="messages" component={MyMessages} title="Komşuda pişer" />
            <Scene key="user" component={Plainlogin} title="Komşuda pişer" initial />
            <Scene key="plainregister" component={Plainregister} title="Komşuda pişer" />
            <Scene key="mapscreen" component={Mapscreen} title="Komşuda pişer" />
            <Scene key="fbregister" component={FBRegister} title="Komşuda pişer" />
            <Scene key="photograph" component={CameraScreen} title="Komşuda pişer" />
            <Scene key="photoportfolio" component={CameraPortfolioScreen} title="Komşuda pişer" />
            <Scene key="sendmessage" component={SendMessage} title="Komşuda pişer" />
          </Drawer>
        </Router>
      );
    }

  }
};

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

I18n.translations = {
  'en': {
    i18n_myaccount: 'My account',
    i18n_messages: 'My messages',
    i18n_newcake: 'New cake!',
    i18n_cakeonthemaps: 'Cake on the maps!',
    i18n_sendmessage: 'Send Message',
    i18n_select_cooker: 'Select a cooker on the map',
    i18n_shot_cake_photo: 'Shot cake photo',
    i18n_cake_style: 'Cake style',
    i18n_cake_details: 'Cake details',
    i18n_message_body: 'Your message',
    i18n_shot_your_photo: 'Shot your photo',
    i18n_full_name: 'Full name',
    i18n_email: 'E-mail',
    i18n_password: 'Password',
    i18n_password_repeat: 'Password repeat',
    i18n_cake_master: 'I am a cake master\n(let me shown on the maps)',
    i18n_logout: 'Logout',
    i18n_update: 'Update my informations',
    i18n_no_cake: 'There is no cake on the maps',
  }
}