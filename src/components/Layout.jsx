import React,{ useState } from "react";
import {styles} from "../assets/dummyStyles";
import Navbar from "./Navbar";
 
import Sidebar from "./Siderbar";


const Layout = ({ onLogout, user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div className={styles.layout.root}>
        <Sidebar user={user} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <Navbar user={user} onLogout={onLogout}/>
        
    </div>
  );
};

export default Layout;