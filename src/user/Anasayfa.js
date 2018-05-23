import React, { Component } from 'react';
import { AsyncStorage, View,Text, Alert, Switch } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';


const Anasayfa = () => {

    return (
        <Card>
        <CardSection>
            <Text>Bu uygulama sayesinde yaptığınız pasta, hamur işleri ve ev yemeklerini satabilir veya bunları satın alabilirsiniz</Text>
        </CardSection>
        <CardSection>
            <Button onPress={Actions.plainregister({type: 'reset'})}>
                Kayıt ol
            </Button>
        </CardSection>
        <CardSection>
         <Button onPress={Actions.plainlogin({type: 'reset'})}>
            Giriş yap
         </Button>
        </CardSection>
      </Card>
    );
};

export default Anasayfa
