// API
import "./api/axiosDefaults";

// Bootstrap Components
import Container from "react-bootstrap/Container";

// Context
import { useCurrentUser } from "./context/CurrentUserContext";

// CSS
import styles from "./App.module.css";

// Local Components
import NavBar from "./components/NavBar";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostEditForm from "./pages/posts/PostEditForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ProfilePage from "./pages/profiles/ProfilePage";

// React Router
import { Route, Routes } from "react-router-dom";

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
          <Route path="/posts/:id/edit" element={<PostEditForm />} />
          <Route path="/profiles/:id" element={<ProfilePage />} />
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
