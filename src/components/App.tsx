import * as React from "react";
import { hot } from "react-hot-loader";
import StopWatch from "./StopWatch";

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <>
        <h1>Секундомер</h1>
        <StopWatch />
      </>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
