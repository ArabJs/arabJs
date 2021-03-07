import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const rtlStyle = create({ plugins: [...jssPreset().plugins, rtl()] });

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <StylesProvider jss={rtlStyle}>
      <App />
    </StylesProvider>
  </React.StrictMode>,
  rootElement
);
