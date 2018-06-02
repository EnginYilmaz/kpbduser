import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, Alert } from 'react-native';
import Button from 'react-native-button';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'red',
    },
    carpi : {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        color: '#727272',
        fontSize: 35,
        width: 298,
        padding: 2,
    },
    hesabim : {
        backgroundColor: '#faf5a0',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        color: '#727272',
        fontSize: 35,
        width: 298,
        padding: 2,
    },
    urunlerim : {
        backgroundColor: '#efa0fa',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        color: '#727272',
        fontSize: 35,
        width: 298,
        padding: 2,
    },
    mesajlarim : {
        backgroundColor: '#faa0aa',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        color: '#727272',
        fontSize: 35,
        width: 298,
        padding: 2,
    },
    harita : {
        backgroundColor: '#aafaa0',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        color: '#727272',
        fontSize: 35,
        width: 298,
        padding: 2,
    },
});

class HamburgerMenu extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        sceneStyle: ViewPropTypes.style,
        title: PropTypes.string,
    }

    static contextTypes = {
        drawer: PropTypes.object,
    }

    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.hesabim} onpress={Actions.hesabim}>Hesabım</Button>
                <Button style={styles.urunlerim} onpress={Actions.urunlerim}>Ürünlerim</Button>
                <Button style={styles.mesajlarim} onpress={Actions.mesajlarim}>Mesajlarım</Button>
                <Button style={styles.harita} onPress={Actions.mapscreen}>Harita</Button>
            </View>
        );
    }
}

export default HamburgerMenu;