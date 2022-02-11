import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
  autoClose: 2000,
  pauseOnHover: true
}

ReactDOM.render(
  <RecoilRoot>
    <Router>
      <App />
      <ToastContainer {...toastOptions} />
    </Router>
  </RecoilRoot>,
  document.getElementById("root")
);
