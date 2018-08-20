import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import I18n from 'ex-react-native-i18n';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'red',
    },
    user : {
        backgroundColor: '#faf5a0',
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

class EmptyPlate extends React.Component {
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
                <Button style={styles.user} onPress={Actions.user}>{I18n.t('i18n_login')}</Button>
                <Button style={styles.map} onPress={Actions.mapscreen}>{I18n.t('i18n_cakeonthemaps')}</Button>
            </View>
        );
    }
}

export default EmptyPlate;