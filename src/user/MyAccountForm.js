import React, { Component, } from 'react';
import { StatusBar, AsyncStorage, View, Text, Alert, Switch, CameraRoll, Image, TouchableOpacity, Navigator } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { Actions } from 'react-native-router-flux';
import { ImagePicker } from 'expo';
import { Constants, Camera, FileSystem, Permissions } from 'expo';

class MyAccountForm extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    resimgoruntule: true, adsoyad: '', email: '', password: '', password_repeat: '', error: '', rol: false, picture: { uri: 'http://webstudio.web.tr/resimler/resimyok.png' },
    loading: false, latitude: null, longitude: null, loggedIn: false
  };

  async componentWillMount() {
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
    const emailim = await AsyncStorage.getItem('@komsudapiser:email');
    console.log(emailim);
    this.setState({ error: '', loading: true });

    myURL = 'http://webstudio.web.tr/user_update_get.php' + '?email=' + emailim;
    return fetch(myURL)
      .then((response) => response.json())
      .then((responseJson) => {
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
      })
  }
  async saveOturum(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }
  shotPhoto = async () => {
    Actions.photoportfolio();
  };

  onGuncellePress() {
    //Alert.alert(''+ this.props.longitude);
    const { adsoyad, email, password, password_repeat, rol } = this.state;
    if (this.state.password != this.state.password_repeat) {
      this.setState({ error: 'Şifreler aynı değil' });
    } else {
      this.setState({ error: '', loading: true });
      //myURL = 'http://webstudio.web.tr/user_update_put.php' + '?email=' + this.state.email + '&adsoyad=' + this.state.adsoyad + '&password=' + this.state.password + '&latitude=' + '' + this.state.latitude + '&longitude=' + this.state.longitude + '&password_repeat=' + this.state.password_repeat + '&rol=' + this.state.rol;
      myURL = 'http://webstudio.web.tr/user_update_put.php';
      const data = new FormData();
      data.append('email', this.state.email);
      data.append('adsoyad', this.state.adsoyad);
      data.append('password', password);
      data.append('password_repeat', this.state.password_repeat);
      data.append('latitude', this.state.latitude);
      data.append('longitude', this.state.longitude);
      data.append('rol', this.state.rol);
      data.append('photo', {
        uri: this.props.userpicture,
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
  onCikisPress() {
    this.saveOturum('@komsudapiser:oturum', 'basarisiz');
    this.saveKey('@komsudapiser:email', '');
    Actions.user();

  }
  async getKey(key) {
    try {
      this.value = await AsyncStorage.getItem(key);
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }
  async saveKey(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }
  renderRefreshButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onGuncellePress.bind(this)}>
        Update
      </Button>
    );
  }
  renderLogoutButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onCikisPress.bind(this)}>
        Logout
      </Button>
    );
  }

  PhotoSection() {
    if (!this.props.userpicture) {
      return (
        <TouchableOpacity onPress={this.shotPhoto.bind(this)}>
          <Image style={{ height: 200, width: 150 }} source={{ uri: 'http://webstudio.web.tr/resimler/kullaniciresmi/' + this.state.email + '.jpeg' }} />
          <Text style={{ height: 50, width: 150, backgroundColor: 'green' }}>Fotoğrafınızı çekin</Text>
        </TouchableOpacity>
      );

    } else {
      return (
        <TouchableOpacity onPress={this.shotPhoto.bind(this)}>
          <Image style={{ height: 200, width: 150 }} source={{ uri: this.props.userpicture }} />
          <Text style={{ height: 50, width: 150, backgroundColor: 'green' }}>Fotoğrafınızı çekin</Text>
        </TouchableOpacity>
      );
    }
  }    

  render() {

    return (
      <View>
      <StatusBar hidden={true} />

      <Card>
        {this.PhotoSection()}
        <CardSection>
          <Input
            label="Full name"
            value={this.state.adsoyad}
            onChangeText={adsoyad => this.setState({ adsoyad })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="E-Mail"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password repeat"
            value={this.state.password_repeat}
            onChangeText={password_repeat => this.setState({ password_repeat })}
          />
        </CardSection>

        <CardSection>
          <CardSection>
            <Text style={styles.rolTextStyle}>
              I am a Cooker
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