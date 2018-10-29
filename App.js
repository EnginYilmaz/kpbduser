import React, { Component } from 'react';
import { Button, Image, StyleSheet, ActivityIndicator,  StatusBar, Alert, View, Text, AsyncStorage } from 'react-native';
import Plainlogin from './src/user/Plainlogin.js';
import Mapscreen from './src/map/Mapscreen.js';
//import FBRegister from './src/user/FBRegister.js';
import MyAccountForm from './src/user/MyAccountForm.js';
import Plainregister from './src/user/Plainregister.js';
import MyPortfolio from './src/portfolio/MyPortfolio.js';
import MyMessages from './src/messages/GetMessage.js';
import CameraScreen from './src/user/CameraScreen.js';
import CameraPortfolioScreen from './src/portfolio/CameraPortfolioScreen.js';
import SendMessage from './src/messages/SendMessage.js';
import I18n from 'ex-react-native-i18n';
import { DrawerActions, createStackNavigator, createDrawerNavigator, createSwitchNavigator, DrawerItems } from 'react-navigation'; // Version can be specified in package.json
import { Ionicons } from '@expo/vector-icons';
import LoginForm from './src/user/LoginForm.js';
import { Container, Content, Header, Body, Icon} from 'native-base';
import Expo from 'expo';  // <--- include this line

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
            logged: 'loggedIn',
          });
          console.log(email)
        });
        //const eposta = await AsyncStorage.getItem('@komsudapiser:email');
}


//----------
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <Text>{I18n.t('i18n_session_starting')}</Text>
          <StatusBar barStyle="default" />
        </View>
      );
      return <View></View>;
    }
    return <LoggedRootStack loggedIn={{ loggedIn: this.state.logged}} screenProps={{emailUri: this.state.emailuri}} />;
  }
};

I18n.fallbacks = true;

I18n.translations = {
  en: {
    i18n_food_on_the_maps: 'Foods on the maps',

    i18n_komsuda_piser: 'food market',
    i18n_session_starting: 'Connectiong to server...',
    i18n_session_credidentials: 'Getting session information',
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
    i18n_food_on_the_maps: 'Haritada yiyecekler',
    i18n_komsuda_piser: 'Komşuda pişer',
    i18n_session_starting: 'Sunucuya bağlanılıyor...',
    i18n_session_credidentials: 'Oturum bilgileri alınıyor',
    i18n_myaccount: 'Hesabım',
    i18n_messages: 'Mesajlarım',
    i18n_newfood: 'Yeni yiyecek!',
    i18n_foodonthemaps: 'Haritada yiyecek!',
    i18n_sendmessage: 'Mesaj gönder',
    i18n_select_cooker: 'Haritadan bir hayırsever seçin',
    i18n_shot_food_photo: 'Bir yemek fotoğrafı çekin',
    i18n_food_type: 'Yemek türü',
    i18n_food_details: 'Yemek özellikleri',
    i18n_message_body: 'Mesajınız',
    i18n_shot_your_photo: 'Fotoğrafınızı çekin',
    i18n_full_name: 'Ad soyad',
    i18n_email: 'E-posta',
    i18n_password: 'Şifre',
    i18n_password_repeat: 'Şifre tekrar',
    i18n_food_master: 'Ben bir hayırseverim\n(Beni ve konumumu haritalarda listele)',
    i18n_logout: 'Çıkış yap',
    i18n_update: 'Bilgilerinizi güncelleyin',
    i18n_no_food: 'Haritalarda yiyecek bulunamadı',
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
//---------------------------------------------------------------------------------------------
const DrawerMenuLoggedin = createDrawerNavigator({

  portfolio: {
    screen: MyPortfolio,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'green'},
      headerMode: 'auto',
      gesturesEnabled: false,
      drawerLabel: I18n.t('i18n_newfood'),
      drawerIcon: ({ tintColor }) => (
        <Image
          style={{ width: 30,height: 30}}
          source={require('./assets/new-food.png')}
        />
      ),
      headerTintColor: '#abc',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  
    })
  },
  myaccount: {
    screen: MyAccountForm,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'green'},
      gesturesEnabled: false,
      drawerLabel: I18n.t('i18n_myaccount'),
      drawerIcon: ({ tintColor }) => (
        <Image
          style={{ width: 30,height: 30}}
          source={require('./assets/home.png')}
        />
      ),
      headerTintColor: '#abc',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  
    })
  },
  messages: {
    screen: MyMessages,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'green'},
      gesturesEnabled: false,
      drawerLabel: I18n.t('i18n_messages'),
      drawerIcon: ({ tintColor }) => (
        <Image
          style={{ width: 30,height: 30}}
          source={require('./assets/box-add.png')}
        />
      ),
      headerTintColor: '#abc',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  
    })
  },
  mapscreen: {
    screen: Mapscreen,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'green'},
      gesturesEnabled: false,
      drawerLabel: I18n.t('i18n_food_on_the_maps'),
      drawerIcon: ({ tintColor }) => (
        <Image
          style={{ width: 30,height: 30}}
          source={require('./assets/food-on-the-maps.png')}
        />
      ),
      headerTintColor: '#abc',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  
    })
  },
},{ 
  initialRouteName: 'mapscreen',
  contentComponent:(props)=>(

    <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image 
          source={{ uri: props.screenProps.emailUri }} 
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
  ),
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  headerMode: 'none',
});

DrawerMenuLoggedin.navigationOptions = ({ navigation }) => {
  const { routes, index } = navigation.state;
  const navigationOptions = {};
  
  navigationOptions.headerLeft= <Icon name="menu" size={55} onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer())} />

    switch (routes[index].routeName) {
      case 'portfolio' : navigationOptions.title =  I18n.t('i18n_newfood');
                        break;
      case 'myaccount' : navigationOptions.title = I18n.t('i18n_myaccount');
                        break;
      case 'messages'  : navigationOptions.title = I18n.t('i18n_messages');
                        break;
      case 'mapscreen' : navigationOptions.title = I18n.t('i18n_food_on_the_maps');
                        break;
  }
  navigationOptions.headerTintColor= '#abc';
  navigationOptions.headerStyle= {
    backgroundColor: '#e6b'
  };
  navigationOptions.headerTitleStyle= {
    fontWeight: 'bold',
  };
  return navigationOptions;
}
//--------------------------------------------------------------
const DrawerMenuLoggedout = createDrawerNavigator({
  mapscreen: {
    screen: Mapscreen,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'green'},
      gesturesEnabled: false,
      drawerLabel: I18n.t('i18n_food_on_the_maps'),
      drawerIcon: ({ tintColor }) => (
        <Image
          style={{ width: 30,height: 30}}
          source={require('./assets/food-on-the-maps.png')}
        />
      ),
      headerTintColor: '#abc',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  
    })
  },
  login: {
    screen: LoginForm,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'green'},
      gesturesEnabled: false,
      drawerLabel: I18n.t('i18n_login'),
      drawerIcon: ({ tintColor }) => (
        <Image
          style={{ width: 30,height: 30}}
          source={require('./assets/enter.png')}
          />
      ),
      headerTintColor: '#abc',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  
    })
  },
  register: {
    screen: Plainregister,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'green'},
      gesturesEnabled: false,
      drawerLabel: I18n.t('i18n_register'),
      drawerIcon: ({ tintColor }) => (
        <Image
          style={{ width: 30,height: 30}}
          source={require('./assets/clipboard.png')}
          />
      ),
      headerTintColor: '#abc',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  
    })
  },
},{ 
  initialRouteName: 'mapscreen',
  contentComponent:(props)=>(

    <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image 
          source={{ uri: props.screenProps.emailUri }} 
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
  ),
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  headerMode: 'screen',
});
DrawerMenuLoggedout.navigationOptions = ({ navigation }) => {
  const { routes, index } = navigation.state;
  const navigationOptions = {};
  
  navigationOptions.headerLeft= <Icon name="menu" size={55} onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer())} />

    switch (routes[index].routeName) {
      case 'mapscreen' : navigationOptions.title =  I18n.t('i18n_food_on_the_maps');
                        break;
      case 'login' : navigationOptions.title = I18n.t('i18n_login');
                        break;
      case 'register'  : navigationOptions.title = I18n.t('i18n_register');
                        break;
  }
  navigationOptions.headerTintColor= '#abc';
  navigationOptions.headerStyle= {
    backgroundColor: '#e6b'
  };
  navigationOptions.headerTitleStyle= {
    fontWeight: 'bold',
  };
  return navigationOptions;
}
//---------------------------------------------------------------
const loggedRootStack = createStackNavigator({
  drawermenu: { screen: DrawerMenuLoggedin },
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
//---------------------------------------------------------------
const defaultRootStack = createStackNavigator({
  drawermenu: { screen: DrawerMenuLoggedout },
  sendmessage: {
    screen: SendMessage,
  },
})
//--------------------------------------------------------------
class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
      const oturum = await AsyncStorage.getItem('@komsudapiser:oturum');

          if (oturum == 'basarili') {
            this.props.navigation.navigate('App');

          } else {
            this.props.navigation.navigate('Auth');

          }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>{I18n.t('i18n_session_credidentials')}</Text>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
//-----------------------------------------------------------------------------
let LoggedRootStack= createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: loggedRootStack,
    Auth: defaultRootStack,
  },
  {
    initialRouteName: 'AuthLoading',
  });
//----------------------------------------------------------------
Expo.registerRootComponent(LoggedRootStack);
//---------------------------------------------------------------

export default App;
