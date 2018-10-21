import React, { Component } from 'react';
import { AsyncStorage, Text, Switch } from 'react-native';
import { Button, Card, CardSection, Spinner,Fbinput } from './common';
import I18n from 'ex-react-native-i18n';


class FBRegisterForm extends Component {
  state = { name: '', id: '', token: '', error: '', rol: false, loading: false };

  constructor (props){
    super(props);
  }
  async saveOturum(key,value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      //console.log("Error saving data" + error);
    }
  }
  async componentDidMount (){
    this._mounted = true;
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('363422077500530', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
        if (this._mounted) {
          this.setState(await response.json());
          this.setState({token: token});
        }
        if (this.state.token != null ) {
          this.saveOturum('@komsudapiser:oturum','basarili');
          this.saveOturum('@komsudapiser:email', this.state.id);
          //Actions.mapscreen();
          this.props.navigation.navigate('mapscreen')
        } else {
          if (this._mounted) {
            this.setState({error: responseJson.basari});
          }
        }  
      }
  }
  componentWillUnmount() {
    this._mounted = false
  }
  onButtonPress() {
    //Alert.alert('button pressed');
    const { name, id, token, rol } = this.state;
      this.setState({ error: '', loading: true });
      myURL= 'https://webstudio.web.tr/fbuser_register.php' + '?id=' + id + '&name='+name +'&token=' + token + '&latitude='+ ''+ this.props.latitude + '&longitude=' +this.props.longitude + '&rol=' + rol;
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
        this.setState({error: responseJson.basari, loading: false});
        this.saveKey('@komsudapiser:id', id);
        this.saveKey('@komsudapiser:password', token); 
        if (responseJson.basari == true || responseJson.basari == 'zaten kayitli' || responseJson.token != null ) {
          //Actions.mapscreen();
          this.props.navigation.navigate('mapscreen')

        } else {
          this.setState({error: responseJson.basari});
        }
      })
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
    this.setState({
      id: '',
      password: '',
      loading: false,
      error: ''
    });
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
          <Fbinput
            placeholder={I18n.t('i18n_full_name')}
            label={I18n.t('i18n_full_name')}
            value={this.state.name}
            onChangeText={name => this.setState({ name })}

          />
        </CardSection>
        <CardSection>
          <Fbinput
            placeholder="kullanici@gmail.com"
            label="FB No"
            value={this.state.id}
            onChangeText={id => this.setState({ id })}

          />
        </CardSection>

        <CardSection>
          <Fbinput
            secureTextEntry
            placeholder="Jeton"
            label="Jeton"
            value={this.state.token}
            onChangeText={token => this.setState({ token })}
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

export default FBRegisterForm;