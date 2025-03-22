/// IMPORTS ///

// React
import { Route, Routes } from "react-router-dom";

// CSS
import styles from "./App.module.css";

// Bootstrap Components
import Container from "react-bootstrap/Container";

// My Components
import NavBar from "./components/NavBar";

// APP ///
function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route path="/signin" element={<h1>Sign in</h1>} />
          <Route path="/signup" element={<h1>Sign up</h1>} />
          {/* Catch page not found */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;