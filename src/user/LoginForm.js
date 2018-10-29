import React, { Component } from 'react';
import { Image, Alert, Text, AsyncStorage } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import I18n from 'ex-react-native-i18n';
//import RNRestart from 'react-native-restart';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Constants, Location, Permissions } from 'expo';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  async saveOturum(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      //console.log("Error saving data" + error);
    }
  }
  onButtonPress = () => {
    const { email, password } = this.state;
    if (this._mounted) {
      this.setState({ error: '', loading: true });
    }
    myURL = 'https://webstudio.web.tr/user_validate.php' + '?email=' + email + '&password=' + password;
    //Alert.alert(myURL);

    fetch(myURL, {
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
          this.setState({ error: responseJson.basari, loading: false });
        }
        if (responseJson.basari == true) {
          //Alert.alert("basarili");
          this.saveOturum('@komsudapiser:oturum', 'basarili');
          this.saveOturum('@komsudapiser:email', email);
          if (this._mounted) {
            //Actions.mapscreen();
            //Alert.alert("mapscreene gitmesi gerekirdi")
            this.props.navigation.navigate('mapscreen')
          }
        } else {
          if (this._mounted) {
            this.setState({ error: responseJson.basari });
          }
        }
      })
    //RNRestart.Restart();
    Expo.Util.reload() 
  }
  componentDidMount() {
    this._mounted = true;
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  onLoginFail() {
    if (this._mounted) {
      this.setState({ error: 'Oturum açma başarısız', loading: false });
    }
  }

  onLoginSuccess() {
    if (this._mounted) {
      this.setState({
        email: '',
        password: '',
        loading: false,
        error: ''
      });
    }
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        {I18n.t('i18n_login')}
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder={I18n.t('i18n_email')}
            label={I18n.t('i18n_email')}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder={I18n.t('i18n_password')}
            label={I18n.t('i18n_password')}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
        <CardSection>
          <Button onPress={() => this.props.navigation.navigate('plainregister')}>
            {I18n.t('i18n_register')}
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.props.navigation.navigate('fbregister')}>
            {I18n.t('i18n_login_fb')}
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;