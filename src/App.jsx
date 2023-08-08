import { Component } from "react";
import "./App.css";
import Controls from "./Pages/Mobile/Controls";
import Connection from "./Pages/Desktop/Connection";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: /iphone|ipad|ipod|android/.test(
        navigator.userAgent.toLowerCase()
      ),
      controlDirection: null,
    };
  }

  render() {
    const { isMobile } = this.state;

    if (!isMobile) {
      return (
        <div className="h-screen">
          <Connection />
        </div>
      );
    } else {
      return (
        <div className="h-screen">
          <Controls />
        </div>
      );
    }
  }
}
export default App;
