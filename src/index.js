import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { VideoListProvider } from "./context/video-context";
import { DataProvider } from "./context/userdata-context";
import { AuthProvider } from "./context/auth-context";
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <VideoListProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </VideoListProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
