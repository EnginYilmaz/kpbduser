import React, { Component } from 'react';
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from 'react-native-router-flux';
import Plainlogin from './src/user/Plainlogin.js';
import Mapscreen from './src/map/Mapscreen.js';
import Mainpage from './src/user/Mainpage.js';
import FBRegister from './src/user/FBRegister.js';
import FBLogin from './src/user/FBLogin.js';
import MyAccountForm from './src/user/MyAccountForm.js';
import Plainregister from './src/user/Plainregister.js';
import MyPortfolio from './src/portfolio/MyPortfolio.js';
import MyMessages from './src/messages/GetMessage.js';

import { AppRegistry, View, Text, AsyncStorage, StatusBar, Alert } from 'react-native';
import CameraScreen from './src/user/CameraScreen.js';
import CameraPortfolioScreen from './src/portfolio/CameraPortfolioScreen.js';
import SendMessage from './src/messages/SendMessage.js';

import HamburgerMenu from './src/HamburgerMenu.js';

import MenuIcon from './images/menu_burger.png';

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
      return <View><Text>Loading...</Text></View>;
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