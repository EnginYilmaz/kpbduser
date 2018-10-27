import React, { Component, } from 'react';
import { Platform, StatusBar, AsyncStorage, View, Text, Alert, Switch, CameraRoll, Image, TouchableOpacity, Navigator } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import I18n from 'ex-react-native-i18n';
//import RNRestart from 'react-native-restart'; 
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import { Constants, Location, Permissions } from 'expo';

I18n.initAsync();

//Alert.alert(I18n.locale)
if ( I18n.locale== 'en') {
  my_account= 'My account';
} else if (I18n.locale == 'tr') {
  myportfolio= 'Hesabım';
}

class MyAccountForm extends Component {
  static navigationOptions = {
    drawerLabel: my_account,
    drawerIcon: ({ tintColor }) => (
      <Image
        style={{ width: 35,height: 30}}
        source={require('../../assets/home.png')}
      />
    ),
  }
  constructor(props) {
    super(props);
  }

  state = {
    resimgoruntule: true, adsoyad: '', email: '', password: '', password_repeat: '', error: '', rol: false, picture: { uri: 'https://webstudio.web.tr/resimler/resimyok.png' },
    loading: false, latitude: null, longitude: null, loggedIn: false
  };
  componentWillMount () {
    I18n.initAsync();
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    //Alert.alert(location+'')
    this.setState({ latitude: location.latitude, longitude: location.longitude });
  };

  async componentDidMount() {
    this._mounted = true;
    if (this._mounted) {
      /*
      navigator.geolocation.getCurrentPosition(
        (position) => {

          this.saveKey('@komsudapiser:lat', (position.coords.latitude));
          this.saveKey('@komsudapiser:lng', (position.coords.longitude));
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
      */
      const emailim = await AsyncStorage.getItem('@komsudapiser:email');
      //console.log(emailim);
      this.setState({ error: '', loading: true });

      myURL = 'https://webstudio.web.tr/user_update_get.php' + '?email=' + emailim;
      //Alert.alert("emailim=" + emailim);
      return fetch(myURL, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Encoding": "zlib",
        },
        redirect: "follow",
        referrer: "no-referrer",
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (this._mounted) {

            let rolum = false;

            if (responseJson.rol == "asci") {
              rolum = true;
            }
            this.setState({
              adsoyad: responseJson.adsoyad,
              email: responseJson.email,
              password: responseJson.password,
              password_repeat: responseJson.password_repeat,
              rol: rolum,
              loading: false
            })
          }

        })
    }
  }

  componentWillUnmount() {
    this._mounted = false
  }

  async saveOturum(key, value) {
    if (this._mounted) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        //console.log("Error saving data" + error);
      }
    }
  }

  shotPhoto = async () => {
    if (this._mounted) {
      //Actions.photograph();
      //Alert.alert("selam")
      this.props.navigation.navigate('photograph')
    }
  };

  onGuncellePress() {
    if (this._mounted) {
      //Alert.alert(''+ this.props.longitude);
      const { adsoyad, email, password, password_repeat, rol } = this.state;
      if (this.state.password != this.state.password_repeat) {
        this.setState({ error: 'Şifreler aynı değil' });
      } else {
        this.setState({ error: '', loading: true });
        //myURL = 'https://webstudio.web.tr/user_update_put.php' + '?email=' + this.state.email + '&adsoyad=' + this.state.adsoyad + '&password=' + this.state.password + '&latitude=' + '' + this.state.latitude + '&longitude=' + this.state.longitude + '&password_repeat=' + this.state.password_repeat + '&rol=' + this.state.rol;
        myURL = 'https://webstudio.web.tr/user_update_put.php';
        const data = new FormData();
        data.append('email', this.state.email);
        data.append('adsoyad', this.state.adsoyad);
        data.append('password', password);
        data.append('password_repeat', this.state.password_repeat);
        data.append('latitude', this.state.latitude);
        data.append('longitude', this.state.longitude);
        data.append('rol', this.state.rol);
        data.append('photo', {
          uri: this.props.navigation.getParam('photouri'),
          type: 'image/jpeg', // or photo.type
          name: email + '.jpeg',
        });
        return fetch(myURL, {
          method: 'post',
          body: data
        })
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ error: responseJson.basari, loading: false });
            if (responseJson.basari == true) {
              Alert.alert("kayit basarili");
            } else {
              this.setState({ error: responseJson.basari });
            }
          })
      }
    }
  }
  onCikisPress() {
    if (this._mounted) {
      this.saveOturum('@komsudapiser:oturum', 'basarisiz');
      this.saveKey('@komsudapiser:email', '');
      //RNRestart.Restart();
      //Actions.user();
      //this.props.navigation.navigate('user')
      Expo.Util.reload()
    }
  }
  async getKey(key) {
    if (this._mounted) {
      try {
        this.value = await AsyncStorage.getItem(key);
      } catch (error) {
        //console.log("Error retrieving data" + error);
      }
    }
  }
  async saveKey(key, value) {
    if (this._mounted) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        //console.log("Error saving data" + error);
      }
    }
  }
  renderRefreshButton() {
    if (this._mounted) {
      if (this.state.loading) {
        return <Spinner size="small" />;
      }

      return (
        <Button onPress={this.onGuncellePress.bind(this)}>
          {I18n.t('i18n_update')}
        </Button>
      );
    }
  }
  renderLogoutButton() {
    if (this._mounted) {
      if (this.state.loading) {
        return <Spinner size="small" />;
      }
      return (
        <Button onPress={this.onCikisPress.bind(this)}>
          {I18n.t('i18n_logout')}
        </Button>
      );
    }
  }

  PhotoSection() {
    if (this._mounted) {
      //Alert.alert(this.props.navigation.getParam('userpicture'))
      if (! this.props.navigation.getParam('photouri')) {
        return (
          <TouchableOpacity onPress={this.shotPhoto.bind(this)}>
            <Image style={{ height: 200, width: 150 }} source={{ uri: 'https://webstudio.web.tr/resimler/kullaniciresmi/' + this.state.email + '.jpeg' }} />
            <Text style={{ height: 50, width: 150, backgroundColor: 'green' }}>{I18n.t('i18n_shot_your_photo')}</Text>
          </TouchableOpacity>
        );

      } else {
        console.log(this.props.navigation.getParam('userpicture'))
        return (
          <TouchableOpacity onPress={this.shotPhoto.bind(this)}>
            <Image style={{ height: 200, width: 150 }} source={{ uri: this.props.navigation.getParam('photouri') }} />
            <Text style={{ height: 50, width: 150, backgroundColor: 'orange' }}>{I18n.t('i18n_shot_your_photo')}</Text>
          </TouchableOpacity>
        );
      }
    }
  }

  render() {
    //Alert.alert(this.props.navigation.getParam('userpicture', 'Peter'))
    return (
      <View>
        <Card>
          {this.PhotoSection()}
          <CardSection>
            <Input
              label={I18n.t('i18n_full_name')}
              value={this.state.adsoyad}
              onChangeText={adsoyad => this.setState({ adsoyad })}
            />
          </CardSection>
          <CardSection>
            <Input
              label={I18n.t('i18n_email')}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label={I18n.t('i18n_password')}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              label={I18n.t('i18n_password_repeat')}
              value={this.state.password_repeat}
              onChangeText={password_repeat => this.setState({ password_repeat })}
            />
          </CardSection>

          <CardSection>
            <CardSection>
              <Text style={styles.rolTextStyle}>
                {I18n.t('i18n_food_master')}
              </Text>
            </CardSection>
            <Switch
              onValueChange={rol => this.setState({ rol })}
              value={this.state.rol} />
          </CardSection>

          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>

          <CardSection>
            {this.renderLogoutButton()}
          </CardSection>

          <CardSection>
            {this.renderRefreshButton()}
          </CardSection>

        </Card >
      </View>
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

export default MyAccountForm;