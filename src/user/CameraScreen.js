import React from 'react';
import { Camera } from 'expo';
import { Text, View, TouchableOpacity } from 'react-native';
import I18n from 'ex-react-native-i18n';

export default class App extends React.Component {
async press() {
    console.log('Button Pressed');
    if (this.camera) {
        console.log('Taking photo');
        let photo = await this.camera.takePictureAsync();
        console.log(photo);
        this.props.navigation.navigate('myaccount', {photouri: photo.uri} );

    }
}

render() {
    return (
        <Camera
            style={{ flex: 1 }}
            ref={ (ref) => {this.camera = ref} }
            type={Camera.Constants.Type.front}
            options= {{quality: 0}}
        >
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity
                style={{ flex: 0, backgroundColor: 'orange', height: 75 }}
                onPress={this.press.bind(this)} >
                <Text>{I18n.t('i18n_click_to_shot_photo')}</Text>
            </TouchableOpacity>
        </Camera>
    );
}
}