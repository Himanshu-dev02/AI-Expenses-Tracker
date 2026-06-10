import React,{ useState } from "react";
import {styles} from "../assets/dummyStyles";
import Navbar from "./Navbar";
 
import Sidebar from "./Siderbar";


const Layout = ({ onLogout, user }) => {
  return (
    <div className={styles.layout.root}>
        <Navbar user={user} onLogout={onLogout}/>
        
    </div>
  );
};

export default Layout;