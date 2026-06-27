 import React, { Children, useEffect, useState } from "react";
 import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
 import Layout from "./components/Layout";
 import Dashboard from "./pages/Dashboard";
 import Login from "./components/Login";
 import Signup from "./components/signup";
import axios from "axios";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
 

 const API_URL = "http://localhost:4000";

 // to get transaction from localstorage
 const getTransactionsFromStorage =() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
 };

  // to protect the routes 
  const ProtectedRoute = ({ user, children }) => {
    const localToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");
    const hasToken = localToken || sessionToken;
  
    if (!user || !hasToken) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

  // to scroll to top when page gets reload or new page is visited
  const ScrollToTop = () => {
    const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto"});
     }, [location.pathname] );
     return null;
  };
  


 const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [ transaction, setTransactions] = useState ([]);
  const [isLoading, setIsLoading] = useState (true);
  const navigate = useNavigate();


   // to save the token
   const persistAuth = (userObj, tokenStr, remember = false) => {
    try {
      if (remember) {
        if (userObj) localStorage.setItem("user", JSON.stringify(userObj));
        if (tokenStr) localStorage.setItem("token", tokenStr);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      } else {
        if (userObj) sessionStorage.setItem("user", JSON.stringify(userObj));
        if (tokenStr) sessionStorage.setItem("token", tokenStr);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setUser(userObj || null);
      setToken(tokenStr || null);
    } catch (err) {
      console.error("persistAuth error:", err);
    }
  };

  const clearAuth = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    } catch (error) {
      console.error("Error clearing auth data:", error);
      
    }
    setUser(null);
    setToken(null);
  };

   // to update user data both in state and storage 
   const updateUserData = ( updateUser) => {
     setUser(updateUser);

     const localToken = localStorage.getItem("token");
     const sessionToken = sessionStorage.getItem("token");
     
     if (localToken){
      localStorage.setItem("user" , JSON.stringify(updateUser));
     } else if (sessionToken) {
      sessionStorage.setItem("user", JSON.stringify(updateUser));
     }
   };

   // try to load user with token when mounted 
   useEffect(() => {
    (async () => {
      try {
        const localUserRaw = localStorage.getItem("user");
        const sessionUserRaw = sessionStorage.getItem("user");
        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");

        const storedUser = localUserRaw ? JSON.parse(localUserRaw) : sessionUserRaw ?
        JSON.parse(sessionUserRaw) : null;
        const storedtoken = localToken || sessionToken || null;
        const tokenFromLocal = !!localToken;
        if(storedUser){
          setUser(storedUser);
          setToken(storedtoken);
          setIsLoading(false);
          return ;
        }

        if (storedtoken){
          try {
            const res = await axios.get (`${API_URL}/api/user/me`, {
              headers: {Authorization: `Bearer ${storedtoken}`}
            });

            const profile = res.data;
            persistAuth(profile, storedtoken, tokenFromLocal);
          }
           catch (fetchErr) {
            console.warn("Could not fetch profile with the stored token:",
              fetchErr
            );
            clearAuth();
          }
        }
        
      } catch (error) {
       console.error( "error bootstrapping auth:", error);
      } finally {
        setIsLoading (false);

        try {
          setTransactions(getTransactionsFromStorage());
          
        } catch (txtErr) {
          console.error("Error loading transactions:",txtErr);
          
        }
      }
    })();
   },[]);


   useEffect(() => {
    try {
      localStorage.setItem("transactions", JSON.stringify(transaction));
      
    } catch (err) {
      console.error("error saving transactions:",err);
      
    }
   }, [transaction]);

   const handleLogin = (userData, remember = false, tokenFromApi = null) => {
     persistAuth(userData, tokenFromApi, remember);
     navigate("/");
   };

   const handleSignup =(userData, remember = false, tokenFromApi = null) => {
    persistAuth(userData, tokenFromApi, remember);
    navigate("/");
  };

    const handleLogout = () => {
      clearAuth();
      navigate("/login");
    };

    
  // transaction helpers
  const addTransaction = (newTransaction) =>
    setTransactions((p) => [newTransaction, ...p]);
  const editTransaction = (id, updatedTransaction) =>
    setTransactions((p) =>
      p.map((t) => (t.id === id ? { ...updatedTransaction, id } : t)),
    );
  const deleteTransaction = (id) =>
    setTransactions((p) => p.filter((t) => t.id !== id));
  const refreshTransactions = () =>
    setTransactions(getTransactionsFromStorage());


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }


   return (
      <>
      <Routes>
 
       <Route path="/login" element={<Login onLogin={handleLogin}/> }/>
      <Route path="/Signup" element={<Signup onSignup={handleSignup}/>}/>
        <Route element={<ProtectedRoute user={user} >
          <Layout user={user} onLogout={handleLogout}/>
          </ProtectedRoute>}>
        <Route
         path="/" 
         element={
         <Dashboard/> }
          transactions={transaction}
        addTransaction={ addTransaction}
         editTransaction={editTransaction}
         deleteTransaction={deleteTransaction}
         refreshTransactions={refreshTransactions} 
         />
       
         
         <Route path="/income" element={
          <Income  transactions={transaction}
          addTransaction={ addTransaction}
           editTransaction={editTransaction}
           deleteTransaction={deleteTransaction}
           refreshTransactions={refreshTransactions}  />
         } 
         />

          <Route
           path="/expense" element={
          <Expense  
          transactions={transaction}
          addTransaction={ addTransaction}
           editTransaction={editTransaction}
           deleteTransaction={deleteTransaction}
           refreshTransactions={refreshTransactions}  />
         } 
         />
        </Route>
      </Routes>
      </>
   )
 }
 
 export default App;