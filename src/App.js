import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Home from "./pages/Home";
import Chart from "./pages/Chart";
import NoteApp from "./pages/Notepage";
import Goal from "./pages/Goal";
import Income from "./pages/Income";

import Navbar from "./components/Navbar";
import FxButton from "./components/FxButton";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const client = axios.create({
  baseURL: "http://localhost:8000/"
});

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    client.get("api/user")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
      setErrorMessage('')
      setEmail('')
      setPassword('')
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
      setErrorMessage('')
      setEmail('')
      setPassword('')
    }
  }

  async function submitRegistration(e) {
    e.preventDefault();
    try {
      const response = await client.post(
        "/api/register/",
        {
          email: email,
          username: username,
          password: password
        }
      ).then(function (res) {
        client.post(
          "/api/login/",
          {
            email: email,
            password: password
          }
        ).then(function (res) {
          setCurrentUser(true);
        });
      });
      console.log('Success:', response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error('Error:', error);
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  }

  async function submitLogin(e) {
    e.preventDefault();
    try {
      const response = await client.post(
        "api/login/",
        {
          email: email,
          password: password
        }
      ).then(function (res) {
        setCurrentUser(true);
      });
      console.log('Success:', response.data);
    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error('Error:', error);
        setErrorMessage('Incorrect crdentials.');
      }
    }
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout/",
      { withCredentials: true }
    ).then(function (res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    return (
      <div className="App">
        <FxButton/>
        <Router>
          <Navbar />
          <div className="logouting">
            <form onSubmit={e => submitLogout(e)}>
              {/* <button className="logbtn" type="submit" variant="light">Log out</button> */}
            </form>
          </div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/Chart" element={<Chart />} />
            <Route path="/notes" element={<NoteApp />} />
            <Route path="/Goal" element={<Goal />} />
            
          </Routes>

        </Router>

      </div>

    );
  }
  return (
    <div>

      <button id="form_btn" onClick={update_form_btn} variant="light">Register</button>

      {
        registrationToggle ? (
          <div className="center">
            <form onSubmit={e => submitRegistration(e)}>


              <input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />


              <input type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />

              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

              <button variant="primary" type="submit">
                Submit
              </button>

              {errorMessage && <div className="error">{errorMessage}</div>}

            </form>
          </div>
        ) : (
          <div className="center">
            <form onSubmit={e => submitLogin(e)}>

              <input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />


              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

              <button variant="primary" type="submit">
                Submit
              </button>
            </form>
            {errorMessage && <div className="error">{errorMessage}</div>}
          </div>
        )
      }
    </div>
  );
}

export default App;