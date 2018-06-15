import React from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import Main from "./Main.js";

export default class StartComponent extends React.PureComponent {
  render() {
    return (
      <Router>
        <Stack>
          <Scene key="main" component={Main} title="Main" />
        </Stack>
      </Router>
    );
  }
}
