import React, { Component } from 'react';
import { Scene, Router, Drawer} from 'react-native-router-flux';
import Plainlogin from './src/user/Plainlogin.js';
import Mapscreen from './src/map/Mapscreen.js';
import FBRegister from './src/user/FBRegister.js';
import MyAccountForm from './src/user/MyAccountForm.js';
import Plainregister from './src/user/Plainregister.js';
import MyPortfolio from './src/portfolio/MyPortfolio.js';
import MyMessages from './src/messages/GetMessage.js';
import { Alert, View, Text, AsyncStorage} from 'react-native';
import CameraScreen from './src/user/CameraScreen.js';
import CameraPortfolioScreen from './src/portfolio/CameraPortfolioScreen.js';
import SendMessage from './src/messages/SendMessage.js';
import HamburgerMenu from './src/HamburgerMenu.js';
import EmptyPlate from './src/EmptyPlate.js';
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
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let tmp_lat = position.coords.latitude;
        let tmp_lng = position.coords.longitude;
        this.saveKey('@komsudapiser:lat',(tmp_lat.toString()));
        this.saveKey('@komsudapiser:lng', (tmp_lng.toString()));
        Alert.alert(tmp_lat.toString());
        
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
        });
        
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
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
      return <View><Text>{I18n.t('i18n_session_starting')}</Text></View>;
    }

    if (this.state.logged == true) {
      //Alert.alert('');
      return (
        <Router>
          <Drawer
            contentComponent={HamburgerMenu}
            drawerImage={MenuIcon}
            drawerWidth={300}
          >
            <Scene key="myaccount" component={MyAccountForm} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="portfolio" component={MyPortfolio} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="messages" component={MyMessages} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="user" component={Plainlogin} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="plainregister" component={Plainregister} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="mapscreen" component={Mapscreen} title={I18n.t('i18n_komsuda_piser')} initial />
            <Scene key="fbregister" component={FBRegister} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="photograph" component={CameraScreen} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="photoportfolio" component={CameraPortfolioScreen} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="sendmessage" component={SendMessage} title={I18n.t('i18n_komsuda_piser')} />
          </Drawer>
        </Router>
      );
    } else if (this.state.logged == false) {
      return (
        <Router>
          <Drawer
            contentComponent={EmptyPlate}
            drawerImage={MenuIcon}
            drawerWidth={300}
          >
            <Scene key="myaccount" component={MyAccountForm} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="portfolio" component={MyPortfolio} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="messages" component={MyMessages} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="user" component={Plainlogin} title={I18n.t('i18n_komsuda_piser')} initial />
            <Scene key="plainregister" component={Plainregister} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="mapscreen" component={Mapscreen} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="fbregister" component={FBRegister} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="photograph" component={CameraScreen} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="photoportfolio" component={CameraPortfolioScreen} title={I18n.t('i18n_komsuda_piser')} />
            <Scene key="sendmessage" component={SendMessage} title={I18n.t('i18n_komsuda_piser')} />
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
    i18n_komsuda_piser: 'Cake market',
    i18n_session_starting: '\n\n\nSession starting...',
    i18n_myaccount: 'My account',
    i18n_messages: 'My messages',
    i18n_newcake: 'New cake!',
    i18n_cakeonthemaps: 'Cake on the maps!',
    i18n_sendmessage: 'Send Message',
    i18n_select_cooker: 'Select a cooker on the map',
    i18n_shot_cake_photo: 'Shot cake photo',
    i18n_cake_type: 'Cake style',
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
    i18n_email_placeholder: 'user@mail.com',
    i18n_password: 'password',
    i18n_password_repeat: 'password repeat',
    i18n_login: 'Login',
    i18n_register: 'Register',
    i18n_login_fb: 'Login with Facebook',
    i18n_fill_login_information: 'Please fill your informations',
    i18n_user_login_information: 'Please enter your credentials',
    i18n_nomessage_inbox: 'There is no message in your inbox',
  },
  'tr': {
    i18n_komsuda_piser: 'Komşuda pişer',
    i18n_session_starting: '\n\n\nOturum açılıyor...',
    i18n_myaccount: 'Hesabım',
    i18n_messages: 'Mesajlarım',
    i18n_newcake: 'Yeni kek!',
    i18n_cakeonthemaps: 'Haritada kek!',
    i18n_sendmessage: 'Mesaj gönder',
    i18n_select_cooker: 'Haritadan bir pastacı seçin',
    i18n_shot_cake_photo: 'Bir pasta fotoğrafı çekin',
    i18n_cake_type: 'Pasta türü',
    i18n_cake_details: 'Pasta özellikleri',
    i18n_message_body: 'Mesajınız',
    i18n_shot_your_photo: 'Fotoğrafınızı çekin',
    i18n_full_name: 'Ad soyad',
    i18n_email: 'E-posta',
    i18n_password: 'Şifre',
    i18n_password_repeat: 'Şifre tekrar',
    i18n_cake_master: 'Ben bir pastacıyım\n(Beni ve konumumu haritalarda listele)',
    i18n_logout: 'Çıkış yap',
    i18n_update: 'Bilgilerimiz güncelle',
    i18n_no_cake: 'Haritalarda pasta bulunamadı',
    i18n_email_placeholder: 'kullanıcı@mail.com',
    i18n_password: 'Şifre',
    i18n_password_repeat: 'Şifre tekrar',
    i18n_login: 'Giriş',
    i18n_register: 'Kaydol',
    i18n_login_fb: 'Facebook ile kaydol',
    i18n_fill_login_information: 'Lütfen kullanıcı bilgilerinizi giriniz',
    i18n_user_login_information: 'Lütfen kullanıcı bilgilerinizi giriniz',
    i18n_nomessage_inbox: 'Gelen kutunuzda mesaj bulunamadı',
  }
}