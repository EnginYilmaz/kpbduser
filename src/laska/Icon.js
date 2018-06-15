import React from 'react';

const IconSets = {
  Entypo: require('react-native-vector-icons/Entypo'),
  EvilIcons: require('react-native-vector-icons/EvilIcons'),
  Feather: require('react-native-vector-icons/Feather'),
  FontAwesome: require('react-native-vector-icons/FontAwesome'),
  Foundation: require('react-native-vector-icons/Foundation'),
  Ionicons: require('react-native-vector-icons/Ionicons'),
  MaterialIcons: require('react-native-vector-icons/MaterialIcons'),
  MaterialCommunityIcons: require('react-native-vector-icons/MaterialCommunityIcons'),
  Octicons: require('react-native-vector-icons/Octicons'),
  Zocial: require('react-native-vector-icons/Zocial'),
  SimpleLineIcons: require('react-native-vector-icons/SimpleLineIcons'),
}

export default class Icon extends React.Component {
  render() {
    const IconClass = IconSets[this.props.iconPackageName].default;
    const clonedProps = { ...this.props };
    delete clonedProps.iconPackageName;

    return <IconClass {...clonedProps} />
  }
}