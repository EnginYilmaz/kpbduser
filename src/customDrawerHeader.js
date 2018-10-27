import React, {Component} from 'react'
import {View,Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import { Container, Content, Header, Body} from 'native-base';

export default class customDrawerHeader extends Component {
  constructor(props) {
  super(props)
}
  render(){
    return(
        <Container>
        <Header style={styles.drawerHeader}>
          <Body>
            <Image 
              source={{ uri: 'https://webstudio.web.tr/resimler/kullaniciresmi/'+eposta+'.jpeg' }} 
              style={{
                borderWidth:1,
                borderColor:'orange',
                alignItems:'center',
                justifyContent:'center',
                width:200,
                height:200,
                backgroundColor:'orange',
                borderRadius:100,
              }}
            />
          </Body>
        </Header>
        <Content>
          <DrawerItems {...props} />
        </Content>
        </Container>
    )
  }
}