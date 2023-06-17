// import Home from "./pages/Home";
// import Chart from "./pages/Chart";
// import Notes from "./pages/Notes";
// import Goal from "./pages/Goal";
// import Income from "./pages/Income";
// import Settings from "./pages/Settings";


// import Navbar from "./components/Navbar";
// import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

// import './App.css';
// import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;

// const client = axios.create({
//   baseURL: "http://127.0.0.1:8000"
// });

// function App() {

//   const [currentUser, setCurrentUser] = useState('');
//   const [registrationToggle, setRegistrationToggle] = useState(false);
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     checkUserAuthentication();
//   }, []);

//   const checkUserAuthentication = () => {
//     client
//       .get('/api/user')
//       .then(() => {
//         setCurrentUser(true);
//       })
//       .catch(() => {
//         setCurrentUser(false);
//       });
//   };

//   function update_form_btn() {
//     if (registrationToggle) {
//       document.getElementById("form_btn").innerHTML = "Register";
//       setRegistrationToggle(false);
//     } else {
//       document.getElementById("form_btn").innerHTML = "Log in";
//       setRegistrationToggle(true);
//     }
//   }

//   function submitRegistration(e) {
//     e.preventDefault();
//     client.post(
//       "/api/register",
//       {
//         email: email,
//         username: username,
//         password: password
//       }
//     ).then(function (res) {
//       client.post(
//         "/api/login",
//         {
//           email: email,
//           password: password
//         }
//       ).then(function (res) {
//         setCurrentUser(true);
//       });
//     });
//   }

//   function submitLogin(e) {
//     e.preventDefault();
//     client.post(
//       "/api/login",
//       {
//         email: email,
//         password: password
//       }
//     ).then(function (res) {
//       setCurrentUser(true);
      
//     });
//   }
  
  
//   function submitLogout(e) {
//     e.preventDefault();
    
//     client.post(
//       "/api/logout",
      
//       { withCredentials: true }
//     )
//     .then(function (res) {
//       setCurrentUser(false);
//     });
// }

//   if (currentUser) {
//     return (  
//         <div className="App">
//           <Router>
//             <Navbar />
//             <Routes>
//                <Route path="/" exact element={<Home />} />
//                <Route path="/income" element={<Income />} />
//                <Route path="/Chart" element={<Chart />} />
//                <Route path="/notes" element={<Notes />} />
//                <Route path="/Goal" element={<Goal/>} />
//                <Route path="/settings" element={<Settings/>} />
//              </Routes>
//           </Router>
//           <div>
//       <form onSubmit={e => submitLogout(e)}>
//         <button type="submit" variant="light">Log out</button>
//         <div></div>
//       </form>
//     </div>
//         </div>
      
//     )
//   }
//   return <div>
     
//   <button  id="form_btn" onClick={update_form_btn} >Register</button>
//   {
//     registrationToggle ? (

//       <div className="register-page">
//         <div className="register-container">
//           <h2>Register</h2>
//           <form onSubmit={e => submitRegistration(e)}>
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Username</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={e => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit">Register</button>
//           </form>
//         </div>
//       </div>

//     ) : (
//       <div className="login-container">
        
//         <form className="login-form" onSubmit={e => submitLogin(e)}>
//           <h2>Login</h2>
//           <div className="form-group">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button  type="submit">Login</button>
          
          
//         </form>
//       </div>
//     )
//   }
// </div>
// };

// export default App;

// import React from "react";
// import "./styles.css";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";


import Home from "./pages/Home";
import Chart from "./pages/Chart";
import Notes from "./pages/Notes";
import Goal from "./pages/Goal";

// export default function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" exact element={<Home/>} />
//           <Route path="/Chart" element={<Chart/>} />
//           <Route path="/Notes" element={<Notes/>} />
//           <Route path="/Goal" element={<Goal/>} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';




axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://amaljyothi444.pythonanywhere.com/"
});

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    client.get("/api/user")
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
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/api/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function (res) {
      client.post(
        "/api/login",
        {
          email: email,
          password: password
        }
      ).then(function (res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/api/login",
      {
        email: email,
        password: password
      }
    ).then(function (res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      { withCredentials: true }
    ).then(function (res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    return (  
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/Chart" element={<Chart />} />
              <Route path="/Notes" element={<Notes />} />
              <Route path="/Goal" element={<Goal />} />
            </Routes>
          </Router>
          <form onSubmit={e => submitLogout(e)}>
          <button type="submit" variant="light">Log out</button>
        </form>

        <h2>You're logged in!</h2>
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
          </div>
        )
      }
    </div>
  );
}

export default App;