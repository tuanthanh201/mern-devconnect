import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";

import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import store from "./store/store";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Navbar />
      <Route path="/" exact>
        <Landing />
      </Route>
      <section className="container">
        <Alert />
        <Switch>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/profiles" exact>
            <Profiles />
          </Route>
          {isAuthenticated && (
            <Route path="/dashboard" exact>
              <Dashboard />
            </Route>
          )}
          {isAuthenticated && (
            <Route path="/create-profile" exact>
              <CreateProfile />
            </Route>
          )}
          {isAuthenticated && (
            <Route path="/edit-profile" exact>
              <EditProfile />
            </Route>
          )}
          {isAuthenticated && (
            <Route path="/add-experience" exact>
              <AddExperience />
            </Route>
          )}
          {isAuthenticated && (
            <Route path="/add-education" exact>
              <AddEducation />
            </Route>
          )}
          {isAuthenticated && (
            <Route path="/profile/:profileId" exact>
              <Profile />
            </Route>
          )}
          {isAuthenticated && (
            <Route path="/posts" exact>
              <Posts />
            </Route>
          )}
          {isAuthenticated && (
            <Route path="/post/:postId" exact>
              <Post />
            </Route>
          )}
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </section>
    </>
  );
};

export default App;
