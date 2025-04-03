// React
import React from "react";

// Context
import { CurrentUserProvider } from "./context/CurrentUserContext";
import { ProfileDataProvider } from "./context/ProfileDataContext";

// CSS
import "./index.css";

// Local Components
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// React DOM
import ReactDOM from "react-dom/client";

// React Router
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <CurrentUserProvider>
      <ProfileDataProvider>
        <App />
      </ProfileDataProvider>
    </CurrentUserProvider>
  </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
