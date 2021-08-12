import React from "react";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";
import SeasonDisplay from "./SeasonDisplay";
class App extends React.Component {
  // latitude - широта -> lat
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    setTimeout(() => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => this.setState({ lat: position.coords.latitude }),
        (err) => this.setState({ errorMessage: err.message })
      );
    }, 2000);
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please accept location request" />;
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
