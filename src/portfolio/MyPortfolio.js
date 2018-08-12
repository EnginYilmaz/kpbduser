import React, { Component, } from 'react';
import { StatusBar, AsyncStorage, View, Text, Image, TouchableOpacity } from 'react-native';
import { Button, Card, CardSection, Input, Minput, Spinner } from '../user/common';
import { Actions } from 'react-native-router-flux';

class MyPortfolio extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    productname:'', resimgoruntule: true, resimurl: {}, email: '', error: '', rol: false,
    loading: false,
  };
  
  async componentDidMount() {
    this._mounted = true;
    const emailim = await AsyncStorage.getItem('@komsudapiser:email');
    console.log(emailim);
    this.setState({ error: '', loading: true });

    myURL = 'https://webstudio.web.tr/profile_update_get.php' + '?email=' + emailim;
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
        let rolum = false;  

        if (responseJson.rol == "asci") {
          rolum = true;
        }
        if (this._mounted) {
          this.setState({
            resimurl: responseJson.resimurl,
            email: responseJson.email,
            rol: rolum,
            loading: false,
          });
        }
      })
  }
  componentWillUnmount() {
    this._mounted = false
  }
  async saveOturum(key, value) {
    try {
      //await AsyncStorage.setItem(key, value);
      console.log()
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }
  shotPhoto = async () => {
    Actions.photoportfolio();
  };

  onGuncellePress() {
    //Alert.alert(''+ this.props.longitude);
    const { email} = this.state;
    this.setState({ error: '', loading: true });
    myURL = 'https://webstudio.web.tr/portfolio_update_put.php';
    const data = new FormData();
    data.append('email', this.state.email);
    data.append('productname', this.state.productname);
    data.append('productdescription', this.state.productdescription);

    data.append('photo', {
      uri: this.props.userpicture,
      type: 'image/jpeg', // or photo.type
      name: email+'_'+(Math.floor(Math.random() * 10000000)) + '.jpeg',
    });
    //Alert.alert(photoid+'');
    return fetch(myURL, {
      method: 'post',
      body: data
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (this._mounted) {
          this.setState({ error: responseJson.basari, loading: false });
        }
        if (responseJson.basari == true) {
          //Alert.alert("kayit basarili");
        } else {
          if (this._mounted) {
           this.setState({ error: responseJson.basari });
          }
          //Alert.alert(responseJson.basari);
        }
      })
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
        Kaydet
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
          <Image style={{ height: 200, width: 150 }} source={{ uri: 'https://webstudio.web.tr/resimler/portfolio/' + this.state.email + '/' + (this.state.photoid) + '.jpeg' }} />
          <Text style={{ height: 50, width: 150, backgroundColor: 'green' }}>Kek resmi çek</Text>
        </TouchableOpacity>
      );

    } else {
      return (
        <TouchableOpacity onPress={this.shotPhoto.bind(this)}>
          <Image style={{ height: 200, width: 150 }} source={{ uri: this.props.userpicture }} />
          <Text style={{ height: 50, width: 150, backgroundColor: 'green' }}>Kek resmi çek</Text>
        </TouchableOpacity>
      );
    }
  }
           
  render() {

    return (
      <View>
        <StatusBar hidden={true} />
        <Card>
          <CardSection>
            {this.PhotoSection()}
          </CardSection>
          <CardSection>
          <Input
            label="Kek türü"
            value={this.state.productname}
            onChangeText={productname => this.setState({ productname })}
          />
          </CardSection>
          <CardSection>
          <Minput
            label="Ayrıntılar"
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
  }
};

export default MyPortfolio;