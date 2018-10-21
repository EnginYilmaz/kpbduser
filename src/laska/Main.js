import React from "react";
import { Text } from "react-native";

export default class Main extends React.PureComponent {
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
      <Fragment>
        <Row
          style={{
            alignItems: `center`,
            backgroundColor: `rgba(255, 255, 255, 1)`,
            flex: 1,
            justifyContent: `center`
          }}
        >
          <Text style={{ fontSize: 30 }}>{`Hello, world!`}</Text>
        </Row>
      </Fragment>
    );
  }
}
