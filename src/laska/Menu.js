import React from "react";
import { Text, View } from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from ".//Icon";

export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // eslint-disable-next-line no-unused-vars
    const { props, state } = this;
    // eslint-disable-next-line no-unused-vars
    const setState = this.setState.bind(this);
    // eslint-disable-next-line no-unused-vars
    const Navigation = Actions;

    return (
      <View style={{ flex: 1, height: `100%` }}>
        <View style={{ flex: 1 }}>
          <Text>{`Text string`}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{`Text string`}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: `row` }}>
          <Text>{`Text string`}</Text>
          <Icon iconPackageName={`FontAwesome`} name={`search`} />
          <Icon iconPackageName={`FontAwesome`} name={`search`} />
        </View>
      </View>
    );
  }
}
