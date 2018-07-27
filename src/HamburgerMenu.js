import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';


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
    myaccount : {
        backgroundColor: '#faf5a0',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        color: '#727272',
        fontSize: 35,
        width: 298,
        padding: 2,
    },
    portfolio : {
        backgroundColor: '#efa0fa',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        color: '#727272',
        fontSize: 35,
        width: 298,
        padding: 2,
    },
    mymessages : {
        backgroundColor: '#faa0aa',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        color: '#727272',
        fontSize: 35,
        width: 298,
        padding: 2,
    },
    map : {
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
                <Button style={styles.myaccount} onPress={Actions.myaccount}>Hesabım</Button>
                <Button style={styles.mymessages} onPress={Actions.messages}>Mesajlarım</Button>
                <Button style={styles.portfolio} onPress={Actions.portfolio}>Yeni kek!</Button>
                <Button style={styles.map} onPress={Actions.mapscreen}>Haritada kek</Button>
            </View>
        );
    }
}

export default HamburgerMenu;