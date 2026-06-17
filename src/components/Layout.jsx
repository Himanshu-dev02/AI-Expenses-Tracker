import React,{ useState } from "react";
import {styles} from "../assets/dummyStyles";
import Navbar from "./Navbar";
 
import Sidebar from "./Siderbar";


const API_BASE_URL = "http://localhost:4000/api";

const Layout = ({ onLogout, user }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className={styles.layout.root}>
       <Navbar user={user} onLogout={onLogout}/>
        <Sidebar user={user} isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
       

        <div className={styles.layout.mainContainer(sidebarCollapsed)}>
          <div className={styles.header.Container}>
          <div>
            <h1 className={styles.header.title}>Dashboard</h1>
            <p className={styles.header.subtitle}>Welcome Back </p>
          </div>
          </div>
          <div className={styles.statCards.grid}>
            <div className={styles.statCards.card}>
              <div className={styles.statCards.cardHeader}>
                <div>
                  <p className={styles.statCards.cardTitle}>Total Balance</p>
                  <p className={styles.statCards.cardValue}>$ {stats}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        
    </div>
  );
};

export default Layout;
