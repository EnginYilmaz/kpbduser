import React, { Component } from 'react';
import { Button, AppRegistry, Image, StyleSheet,  Alert, View, Text, AsyncStorage } from 'react-native';
import Plainlogin from './src/user/Plainlogin.js';
import Mapscreen from './src/map/Mapscreen.js';
import FBRegister from './src/user/FBRegister.js';
import MyAccountForm from './src/user/MyAccountForm.js';
import Plainregister from './src/user/Plainregister.js';
import MyPortfolio from './src/portfolio/MyPortfolio.js';
import MyMessages from './src/messages/GetMessage.js';
import CameraScreen from './src/user/CameraScreen.js';
import CameraPortfolioScreen from './src/portfolio/CameraPortfolioScreen.js';
import SendMessage from './src/messages/SendMessage.js';
import I18n from 'ex-react-native-i18n';
import { createStackNavigator, createDrawerNavigator, NavigationActions, DrawerItems, SafeAreaView } from 'react-navigation'; // Version can be specified in package.json
import { Ionicons } from '@expo/vector-icons';
import LoginForm from './src/user/LoginForm.js';
import { Container, Content, Header, Body, Icon} from 'native-base';

class App extends React.Component {   
  constructor(props, context) {
    super(props, context);

  }
  state = {
    logged: false,
    loading: true,
    emailuri: '',
  };

  componentWillMount() {
    I18n.initAsync();
  }

  async componentDidMount() {
    //Alert.alert("deneme");
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
          });
        }
      });

      AsyncStorage.getItem('@komsudapiser:email')
        .then((email) => {
          this.setState({
            emailuri: 'https://webstudio.web.tr/resimler/kullaniciresmi/' + email + '.jpeg',
          });
          console.log(this.state.emailuri)
        });
        //const eposta = await AsyncStorage.getItem('@komsudapiser:email');
        //console.log(eposta)
}


//----------
  render() {
    if (this.state.loading) {
      return <View><Text>{I18n.t('i18n_session_starting')}</Text></View>;
    }
    return <RootStack emailurl={this.state.emailuri}/>;
  }
};



I18n.fallbacks = true;

I18n.translations = {
  en: {
    i18n_komsuda_piser: 'food market',
    i18n_session_starting: '\n\n\nSession starting...',
    i18n_myaccount: 'My account',
    i18n_messages: 'My messages',
    i18n_newfood: 'New food!',
    i18n_foodonthemaps: 'food on the maps!',
    i18n_sendmessage: 'Send Message',
    i18n_select_cooker: 'Select a cooker on the map',
    i18n_shot_food_photo: 'Shot food photo',
    i18n_food_type: 'food style',
    i18n_food_details: 'food details',
    i18n_message_body: 'Your message',
    i18n_shot_your_photo: 'Shot your photo',
    i18n_full_name: 'Full name',
    i18n_email: 'E-mail',
    i18n_password: 'Password',
    i18n_password_repeat: 'Password repeat',
    i18n_food_master: 'I am a food master\n(let me shown on the maps)',
    i18n_logout: 'Logout',
    i18n_update: 'Update my informations',
    i18n_no_food: 'There is no food on the maps',
    i18n_email_placeholder: 'user@mail.com',
    i18n_login: 'Login',
    i18n_register: 'Register',
    i18n_login_fb: 'Login with Facebook',
    i18n_fill_login_information: 'Please fill your informations',
    i18n_user_login_information: 'Please enter your credentials',
    i18n_nomessage_inbox: 'There is no message in your inbox',
    i18n_click_to_shot_photo: 'Click to shot photo of your self',
    i18n_click_to_shot_food: 'Click to shot photo of food',
  },
  tr: {
    i18n_komsuda_piser: 'Komşuda pişer',
    i18n_session_starting: '\n\n\nOturum açılıyor...',
    i18n_myaccount: 'Hesabım',
    i18n_messages: 'Mesajlarım',
    i18n_newfood: 'Yeni yiyecek!',
    i18n_foodonthemaps: 'Haritada yiyecek!',
    i18n_sendmessage: 'Mesaj gönder',
    i18n_select_cooker: 'Haritadan bir pastacı seçin',
    i18n_shot_food_photo: 'Bir pasta fotoğrafı çekin',
    i18n_food_type: 'Pasta türü',
    i18n_food_details: 'Pasta özellikleri',
    i18n_message_body: 'Mesajınız',
    i18n_shot_your_photo: 'Fotoğrafınızı çekin',
    i18n_full_name: 'Ad soyad',
    i18n_email: 'E-posta',
    i18n_password: 'Şifre',
    i18n_password_repeat: 'Şifre tekrar',
    i18n_food_master: 'Ben bir pastacıyım\n(Beni ve konumumu haritalarda listele)',
    i18n_logout: 'Çıkış yap',
    i18n_update: 'Bilgilerimiz güncelle',
    i18n_no_food: 'Haritalarda pasta bulunamadı',
    i18n_email_placeholder: 'kullanıcı@mail.com',
    i18n_login: 'Giriş',
    i18n_register: 'Kaydol',
    i18n_login_fb: 'Facebook ile kaydol',
    i18n_fill_login_information: 'Lütfen kullanıcı bilgilerinizi giriniz',
    i18n_user_login_information: 'Lütfen kullanıcı bilgilerinizi giriniz',
    i18n_nomessage_inbox: 'Gelen kutunuzda mesaj bulunamadı',
    i18n_click_to_shot_photo: 'Profil resminizi çekmek için tıklayınız',
    i18n_click_to_shot_food: 'Yaptığınız yemeğin resminizi çekmek için tıklayınız',


  }
}
//---------------------------------------------------------------------------------------------

const customDrawerHeader=(props)=> (

  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image 
          source={{ uri: 'https://webstudio.web.tr/resimler/kullaniciresmi/' + 'icon' + '.png' }} 
          style={{
            borderWidth:1,
            borderColor:'orange',
            alignItems:'center',
            justifyContent:'center',
            width:200,
            height:200,
            backgroundColor:'orange',
            borderRadius:100,
          }}
        />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
    </Container>
);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'orange'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }

})

const DrawerMenu = createDrawerNavigator({

  portfolio: { 
    screen: MyPortfolio,
  },
  myaccount: {
    screen: MyAccountForm,
  },
  mapscreen: {
    screen: Mapscreen,
  },
  messages: {
    screen: MyMessages,
  },
  login: {
    screen: LoginForm,
  },
  register: {
    screen: Plainregister,
  },
},{
  initialRouteName: 'mapscreen',
 contentComponent: customDrawerHeader,
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  headerMode: 'screen',
});

const RootStack = createStackNavigator({
  drawermenu: {
    screen: DrawerMenu,
  },
  sendmessage: {
    screen: SendMessage,
  },
  photograph: {
    screen: CameraScreen,
  },
  photoportfolio: {
    screen: CameraPortfolioScreen,
  },
})

AppRegistry.registerComponent('kpbduser', () => RootStack);

export default App;
