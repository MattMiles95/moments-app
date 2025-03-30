/// IMPORTS ///

// API
import "./api/axiosDefaults";

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
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";

// APP ///
function App() {

  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Routes>
              <Route exact path="/" element={<h1>Homepage</h1>} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/posts/create" element={<PostCreateForm />} />
              <Route path="/posts/:id" element={<PostPage />} />
              {/* Catch page not found */}
              <Route path="*" element={<h3 className="text-center mt-5">You seem to be lost... click the logo to return home!</h3>} />
            </Routes>
          </Container>
        </div>
  );
}

export default App;
