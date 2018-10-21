import React, { Component, } from 'react';
import { Alert, StatusBar, AsyncStorage, View, Text, Image, TouchableOpacity } from 'react-native';
import { Button, Card, CardSection, Input, Minput, Spinner } from '../user/common';
import I18n from 'ex-react-native-i18n';
import { createStackNavigator, createDrawerNavigator, NavigationActions} from 'react-navigation'; // Version can be specified in package.json

I18n.initAsync();

//Alert.alert(I18n.locale)
if ( I18n.locale== 'en') {
  my_portfolio= 'New food!';
} else if (I18n.locale == 'tr') {
  myportfolio= 'Yeni yiyecek!';
}

class MyPortfolio extends Component {
  static navigationOptions = {
    drawerLabel: my_portfolio,
    drawerIcon: ({ tintColor }) => (
      <Image
        style={{ width: 35,height: 30}}
        source={require('../../assets/new-food.png')}
      />
    ),
  }
  constructor(props) {
    super(props);

  }

  state = {
    productname:'', resimgoruntule: true, resimurl: {}, email: '', error: '', rol: false,
    loading: false,
  };
  componentWillMount () {
    I18n.initAsync();

  }
  async componentDidMount() {
    this._mounted = true;
    const emailim = await AsyncStorage.getItem('@komsudapiser:email');
    this.setState({ email: emailim})
    //console.log(emailim);
    //Alert.alert(this.state.email)
    const { status } = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);

    if (status === 'granted') {
    }
  }
  componentWillUnmount() {
    this._mounted = false
  }
  async saveOturum(key, value) {
    try {
      //await AsyncStorage.setItem(key, value);
      //console.log()
    } catch (error) {
      //console.log("Error saving data" + error);
    }
  }
  shotPhoto = async () => {
    //Actions.photoportfolio();
    this.props.navigation.navigate('photoportfolio')
  };
  
  onGuncellePress() {
    const { emailim, productname, productdescription } = this.state;

    Alert.alert(this.state.email + " " + this.state.productname + " " + this.state.productdescription);

    this.setState({ error: '', loading: true });
    myURL = 'https://webstudio.web.tr/portfolio_update_put.php';
    const data = new FormData();
    data.append('email', this.state.email);
    data.append('productname', this.state.productname);
    data.append('productdescription', this.state.productdescription);

    data.append('photo', {
      uri: this.props.navigation.getParam('photouri'),
      type: 'image/jpeg', // or photo.type
      name: this.state.email +'_'+ (Math.floor(Math.random() * 10000000)) + '.jpeg',
    });
    //Alert.alert(photoid+'');
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

  async saveKey(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      //console.log("Error saving data" + error);
    }
  }
  renderRefreshButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onGuncellePress.bind(this)}>
        {I18n.t('i18n_newfood')}
      </Button>
    );
  }
  renderLogoutButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onCikisPress.bind(this)}>
        {I18n.t('i18n_logout')}
      </Button>
    );
  }

  PhotoSection() {
      if (!this.props.navigation.getParam('photouri')) {
      return (
        <TouchableOpacity onPress={this.shotPhoto.bind(this)}>
          <Image style={{ height: 200, width: 150 }} source={{ uri: 'https://webstudio.web.tr/resimler/portfolio/' + this.state.email + '/' + (this.state.photoid) + '.jpeg' }} />
          <Text style={{ height: 50, width: 150, backgroundColor: 'green' }}>{I18n.t('i18n_shot_food_photo')}</Text>
        </TouchableOpacity>
      );

    } else {
      return (
        <TouchableOpacity onPress={this.shotPhoto.bind(this)}>
          <Image style={{ height: 200, width: 150 }} source={{ uri: this.props.navigation.getParam('photouri') }} />
          <Text style={{ height: 50, width: 150, backgroundColor: 'orange' }}>{I18n.t('i18n_shot_food_photo')}</Text>
        </TouchableOpacity>
      );
    }
  }
           
  render() {

    return (
      <View>
        <Card>
          <CardSection>
      
          </CardSection>
          <CardSection>
            {this.PhotoSection()}
          </CardSection>
          <CardSection>
          <Input
            label={I18n.t('i18n_food_type')}
            value={this.state.productname}
            onChangeText={productname => this.setState({ productname })}
          />
          </CardSection>
          <CardSection>
          <Minput
            label={I18n.t('i18n_food_details')}
            value={this.state.productdescription}
            onChangeText={productdescription => this.setState({ productdescription })}
          />
          </CardSection>
          <CardSection>
            {this.renderRefreshButton()}
          </CardSection>
          </Card>
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
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
  },
  icon: {
    width: 24,
    height: 24,
  },
}; 

export default MyPortfolio;