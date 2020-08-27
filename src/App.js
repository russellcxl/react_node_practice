import React, { useState, useEffect } from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Register from './components/auth/Register';
import Login from "./components/auth/Login";
import { Container } from 'react-bootstrap';
import axios from "axios";
import dotenv from "dotenv";
import Home from './components/Home';
import PrivateRoute from "./components/auth/PrivateRoute";
dotenv.config();


let URL = process.env.REACT_APP_URL;

function App() {

  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState({});

  console.log(isAuth); //state keeps getting reset everytime i click handleLogin, which is linked to a form-submit button

  async function handleRegister(details) {
    try {
      let res = await axios.post(`${URL}/auth/register`, details);
      console.log(res.data);

      //store token in localstorage
      localStorage.setItem("token", res.data.token);
      setAuth(true);
    }
    catch (e) {
      console.log(e.data.message);
    }
  }

  async function handleLogin(details) {
    try {
      let res = await axios.post(`${URL}/auth/login`, details);
      localStorage.setItem("token", res.data.token);
      setAuth(true);
    }
    catch (e) {
      alert(e);
      setAuth(false);
    }
  }

  function handleLogout(e) {
    console.log("LOGGING OUT");
    e.preventDefault();
    setAuth(false);
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <div className="App">
      {/* navbar */}
      <NavigationBar handleLogout={handleLogout}/>

      {/* main body */}
      <Container className="flex-center">
        <Router>
          <Switch>
            <Route path="/register" render={() => <Register handleRegister={handleRegister} />} />

            <Route path="/home" render={() => <Home />} />

            {/* <Route
              path="/users/login"
              render={() => <Login handleLogin={handleLogin} />}
            ></Route> */}

            {/* <PrivateRoute path="/home" isAuth={isAuth}>
              <Home />
            </PrivateRoute> */}

            <Route
              path="/login"
              exact
              render={() =>
                !isAuth ? <Login handleLogin={handleLogin} /> : <Home />
              }
            />

          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
