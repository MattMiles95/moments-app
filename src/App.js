/// IMPORTS ///

// API
import "./api/axiosDefaults";

// React
import { Route, Routes } from "react-router-dom";

// CSS
import styles from "./App.module.css";

// Bootstrap Components
import Container from "react-bootstrap/Container";

// Context
import { useCurrentUser } from "./context/CurrentUserContext";

// Local Components
import NavBar from "./components/NavBar";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";

// APP ///
function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PostsPage message="No results found. Try searching for something!" />
            }
          />
          <Route
            exact
            path="/feed"
            element={
              <PostsPage
                message="No results found. Try searching for something, or give someone a follow!"
                filter={`owner__followed__owner__profile=${profile_id}`}
              />
            }
          />
          <Route
            exact
            path="/liked"
            element={
              <PostsPage 
                message="No results found. Try searching for something, or give some posts a like!"
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            }
          />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/posts/create" element={<PostCreateForm />} />
          <Route path="/posts/:id" element={<PostPage />} />
          {/* Catch page not found */}
          <Route
            path="*"
            element={
              <h3 className="text-center mt-5">
                You seem to be lost... click the logo to return home!
              </h3>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
