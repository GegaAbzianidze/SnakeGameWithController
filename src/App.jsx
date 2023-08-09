import React, { Component } from "react";
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

    this.modalRef = React.createRef(); // Create a ref to hold the modal element
  }

  componentDidMount() {
    // Check if the ref is available and if the dialog is not already open
    if (this.modalRef.current && !this.modalRef.current.open) {
      this.modalRef.current.showModal();
    }
  }

  render() {
    const { isMobile } = this.state;

    return (
      <div className="h-screen">
        <dialog id="my_modal_3" className="modal" ref={this.modalRef}>
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Live website is not optimized and have some bugs and delay. Please
              clone the repo and run it locally.
              <br /> but you can still try it here. :)
            </p>
          </form>
        </dialog>
        {!isMobile ? <Connection /> : <Controls />}
      </div>
    );
  }
}

export default App;
