import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import I18n from 'ex-react-native-i18n';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });
      myURL= 'https://webstudio.web.tr/user_validate.php' + '?email=' + email  +'&password=' + password ;
      return fetch(myURL, {
        method: "GET",
        mode: "cors",
        cache: "force-cache",
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
         this.setState({error: responseJson.basari, loading: false});
        }
        if (responseJson.basari == true ) {
          Actions.mapscreen();
        } else {
          if (this._mounted) {
            this.setState({error: responseJson.basari})
          }
        }
      })
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
  componentDidMount() {
    this._mounted = true;
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Giriş yap
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder={I18n.t('i18n_email_placeholder')}
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
          <Button onPress={Actions.plainregister}>
            Kayıt ol
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
