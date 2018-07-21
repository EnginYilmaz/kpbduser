import React, { Component } from 'react';
import { Text,AsyncStorage } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  async saveOturum(key,value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }
  onButtonPress() {
    const { email, password } = this.state;
    if (this._mounted) {
      this.setState({ error: '', loading: true });
    }
    myURL= 'https://webstudio.web.tr/user_validate.php' + '?email=' + email  +'&password=' + password ;
    return fetch(myURL)
    .then((response) => response.json())
    .then((responseJson) => {
      if (this._mounted) {
        this.setState({error: responseJson.basari, loading: false});
      }
      if (responseJson.basari == true ) {
        this.saveOturum('@komsudapiser:oturum','basarili');
        this.saveOturum('@komsudapiser:email', email);
        Actions.mapscreen();
      } else {
        if (this._mounted) {
          this.setState({error: responseJson.basari});
        }
      }
    })
  }
  componentDidMount () {
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
        Giriş
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="E Posta"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Şifre"
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
            Kaydol
           </Button>
        </CardSection>
        <CardSection>
          <Button onPress={Actions.fbregister}>
            Facebook ile kaydol
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
