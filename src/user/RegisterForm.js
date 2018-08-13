import React, { Component } from 'react';
import { AsyncStorage, Text, Switch } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { Actions } from 'react-native-router-flux';
import { Permissions, Notifications } from 'expo';
import I18n from 'ex-react-native-i18n';


class RegisterForm extends Component {
  async componentDidMount() {
    this._mounted = true;
  }
  state = { adsoyad: '', email: '', password: '', password_repeat: '', error: '', rol: false, loading: false, token:''};

  constructor (props){
    super(props);
  }
  
  //2notification
  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    this.setState({ token: token});
    //Alert.alert(token);
  }
  componentWillUnmount() {
    this._mounted = false
  }
  onButtonPress() {
    //Alert.alert(''+ this.props.longitude);
    this.registerForPushNotificationsAsync();

    const { adsoyad, email, password, password_repeat, rol, token } = this.state;
    if (this.state.password != this.state.password_repeat ) {
      this.setState({error: 'Şifreler aynı değil'});
    } else {
      this.setState({ error: '', loading: true });
      myURL= 'https://webstudio.web.tr/user_register.php' + '?email=' + email + '&adsoyad='+adsoyad +'&password=' + password + '&latitude='+ ''+ this.props.latitude + '&longitude=' +this.props.longitude +'&password_repeat=' + password_repeat+ '&rol=' + rol + '&token=' + token;
      //this.setState({error: myURL});
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
        if(this._mounted) {
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
        }
      })
    }
  }
  async getKey(key) {
    try {
      this.value = await AsyncStorage.getItem(key);
    } catch (error) {
      //console.log("Error retrieving data" + error);
    }
  }

  async saveKey(key,value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      //console.log("Error saving data" + error);
    }
  }
  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    if(this._mounted) {
      this.setState({
        email: '',
        password: '',
        loading: false,
        error: ''
      });
    }
    //Alert.alert("başarılı bir şekilde login oldu");
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        {I18n.t('i18n_register')}
      </Button>
    );
  }

 

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder={I18n.t('i18n_full_name')}
            label={I18n.t('i18n_full_name')}
            value={this.state.adsoyad}
            onChangeText={adsoyad => this.setState({ adsoyad })}
          />
        </CardSection>
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
        <CardSection>
          <Input
            secureTextEntry
            placeholder={I18n.t('i18n_password')}
            label={I18n.t('i18n_password_repeat')}
            value={this.state.password_repeat}
            onChangeText={password_repeat => this.setState({ password_repeat })}
          />
        </CardSection>

        <CardSection>
        <CardSection>
        <Text style={styles.rolTextStyle}>
          {I18n.t('i18n_cake_master')}
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