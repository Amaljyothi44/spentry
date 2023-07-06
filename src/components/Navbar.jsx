
import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { SidebarData } from "./SlidebarData";
import "./Navbar.css";
import axios from "axios";
import App from "../App";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const client = axios.create({
  baseURL: "http://localhost:8000/"
});


export default function Navbar() {

  const [sidebar, setSidebar] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const showSidebar = () => setSidebar(!sidebar);

  const [username, setUsername] = useState();

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const response = await client.get('/api/user');
  
        const { data } = response; 
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  function submitLogout(e) {
    e.preventDefault();
    client
      .post("/api/logout/", { withCredentials: true })
      .then(function (res) {
        setCurrentUser(false);
        window.location.href = '/';
      })
      .catch(function (error) {
        console.error("Logout failed:", error);
      });
    return <App />
  }
  if (currentUser) {

  }

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF", size: '20' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="name-display">{username}</div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-close">
                <AiIcons.AiOutlineDoubleLeft />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>

                </li>

              );
            })}
            <div >
              
              <form onSubmit={e => submitLogout(e)}>
                <button className="logbtn" type="submit" >Log out</button>
              </form>
              </div>
          </ul>

        </nav>
      </IconContext.Provider>

    </>
  );
}

