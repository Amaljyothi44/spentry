import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";


export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Income",
    path: "/income",
    icon: <GiIcons.GiReceiveMoney />,
    cName: "nav-text"
  },
  {
    title: "Goal",
    path: "/Goal",
    icon: <GiIcons.GiAchievement/>,
    cName: "nav-text"
  },
  {
    title: "Chart",
    path: "./Chart",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text"
  },
  {
    title: "Notes",
    path: "/notes",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text"
  },
  
];
