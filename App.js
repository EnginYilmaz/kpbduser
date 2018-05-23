import React from 'react';
import {Scene, Router, Actions } from 'react-native-router-flux';
import Plainlogin from './src/user/Plainlogin.js';
import Mapscreen from './src/map/Mapscreen.js';
import Anasayfa from './src/user/Anasayfa.js';
import FBRegister from './src/user/FBRegister.js';
import FBLogin from './src/user/FBLogin.js';
import HesabimForm from './src/user/HesabimForm.js';
import Plainregister from './src/user/Plainregister.js'
import {AppRegistry, StatusBar, Alert} from 'react-native';
import CameraScreen from './src/user/CameraScreen.js';

const RouterComponent = () => {
        return (
            <Router>
                <Scene key="root"> 
                    <Scene key = "hesabim" component = {HesabimForm} title="Komşuda pişer"/>                                      
                    <Scene key = "user" component = {Plainlogin} title="Komşuda pişer" initial />
                    <Scene key = "plainregister" component = {Plainregister} title="Komşuda pişer"/>
                    <Scene key = "mapscreen" component = {Mapscreen} title="Komşuda pişer" onRight={() => Actions.hesabim ()} rightTitle="Hesabım"/>
                    <Scene key = "fbregister" component = {FBRegister} title="Komşuda pişer"/>   
                    <Scene key = "fotograf" component = {CameraScreen} title="Komşuda pişer"/>  
                </Scene>
            </Router>
        );
};

export default RouterComponent; 