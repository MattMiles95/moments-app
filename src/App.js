/// IMPORTS ///

// API
import "./api/axiosDefaults";
import axios from "axios";

// React
import { Route, Routes } from "react-router-dom";

// CSS
import styles from "./App.module.css";

// Bootstrap Components
import Container from "react-bootstrap/Container";

// My Components
import NavBar from "./components/NavBar";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { createContext, useEffect, useState } from "react";

/// EXPORTS ///
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// APP ///
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data } = await axios.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Routes>
              <Route path="/" element={<h1>Homepage</h1>} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              {/* Catch page not found */}
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
