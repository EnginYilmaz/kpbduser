import React from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection} from './common';


const Mainpage = () => {

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

export default Mainpage
