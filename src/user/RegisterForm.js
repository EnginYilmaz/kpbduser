import React, { Component } from 'react';
import { AsyncStorage, View,Text, Alert, Switch } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { Actions } from 'react-native-router-flux';

class RegisterForm extends Component {
  state = { adsoyad: '', email: '', password: '', password_repeat: '', error: '', rol: false, loading: false };

  constructor (props){
    super(props);
  }
  
  onButtonPress() {
    //Alert.alert(''+ this.props.longitude);
    const { adsoyad, email, password, password_repeat, rol } = this.state;
    if (this.state.password != this.state.password_repeat ) {
      this.setState({error: 'Şifreler aynı değil'});
    } else {
      this.setState({ error: '', loading: true });
      myURL= 'http://webstudio.web.tr/user_register.php' + '?email=' + email + '&adsoyad='+adsoyad +'&password=' + password + '&latitude='+ ''+ this.props.latitude + '&longitude=' +this.props.longitude +'&password_repeat=' + password_repeat+ '&rol=' + rol;
      //this.setState({error: myURL});
      return fetch(myURL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({error: responseJson.basari, loading: false});
        this.saveKey('@komsudapiser:email', email);
        this.saveKey('@komsudapiser:password', password);
        //this.saveKey('@komsudapiser:lat', latitude);
        //this.saveKey('@komsudapiser:lng', longitude);
        if (responseJson.basari == true ) {
          Actions.mapscreen();
        } else {
          this.setState({error: responseJson.basari});
        }
      })
    }
  }
  async getKey(key) {
    try {
      this.value = await AsyncStorage.getItem(key);
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async saveKey(key,value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }
  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    Alert.alert("başarılı bir şekilde login oldu");
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Kaydol
      </Button>
    );
  }

 

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="Ad Soyad"
            label="Tam isim"
            value={this.state.adsoyad}
            onChangeText={adsoyad => this.setState({ adsoyad })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="kullanici@gmail.com"
            label="Eposta"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder="Şifre"
            label="Şifre"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder="Şifre"
            label="Şifre tekrar"
            value={this.state.password_repeat}
            onChangeText={password_repeat => this.setState({ password_repeat })}
          />
        </CardSection>

        <CardSection>
        <CardSection>
        <Text style={styles.rolTextStyle}>
          Aşçı veya Pastacıyım
        </Text>
        </CardSection>
         <Switch
            onValueChange = {rol => this.setState({ rol })}
            value = {this.state.rol}/>            
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
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
  },
  rolTextStyle: {
    fontSize:20,
    color: 'purple'
  }
};

export default RegisterForm;