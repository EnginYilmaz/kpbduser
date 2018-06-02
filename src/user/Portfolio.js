import React, { Component } from 'react';
import { AsyncStorage, Text, View, StyleSheet, Switch, Alert, AppRegistry  } from 'react-native';

class Portfolio extends Component {
  render() {

      return (
        <View>
          <StatusBar hidden={true} />
            <Text>Portfolio page</Text>
        </View>
      );
  }
}

export default Portfolio;