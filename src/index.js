import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
//import AlternateApp from "./components/AlternateApp";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

// ReactDOM.render(<AlternateApp />, document.getElementById("root"));

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

