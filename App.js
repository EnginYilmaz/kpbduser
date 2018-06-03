import React from 'react';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';
import Plainlogin from './src/user/Plainlogin.js';
import Mapscreen from './src/map/Mapscreen.js';
import Mainpage from './src/user/Mainpage.js';
import FBRegister from './src/user/FBRegister.js';
import FBLogin from './src/user/FBLogin.js';
import MyAccountForm from './src/user/MyAccountForm.js';
import Plainregister from './src/user/Plainregister.js';
import MyPortfolio from './src/portfolio/MyPortfolio.js';
import { AppRegistry, StatusBar, Alert } from 'react-native';
import CameraScreen from './src/user/CameraScreen.js';
import HamburgerMenu from './src/HamburgerMenu.js';

import MenuIcon from './images/menu_burger.png';

const RouterComponent = () => {
    return (

        <Router>
                <Drawer
                    contentComponent={HamburgerMenu}
                    drawerImage={MenuIcon}
                    drawerWidth={300}
                >
                    <Scene key="myaccount" component={MyAccountForm} title="Komşuda pişer" />
                    <Scene key="portfolio" component={MyPortfolio} title="Komşuda pişer" />
                    <Scene key="user" component={Plainlogin} title="Komşuda pişer" initial />
                    <Scene key="plainregister" component={Plainregister} title="Komşuda pişer" />
                    <Scene key="mapscreen" component={Mapscreen} title="Komşuda pişer" />
                    <Scene key="fbregister" component={FBRegister} title="Komşuda pişer" />
                    <Scene key="photograph" component={CameraScreen} title="Komşuda pişer" />
                </Drawer>
        </Router>
    );
};

export default RouterComponent; 