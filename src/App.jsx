// App.js
import React,{useState,useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './screens/login/Login';
import Sidebar from './layout/SideBar';
import Navbar from './layout/NavBar';
import { decryptData } from './utils/authUtils';
import Redirector from './config/Redirect';
import Dashboard from './screens/dashboard';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [user,setUser] = useState(null)



  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const decryptedUser = decryptData(storedUser);
        if (decryptedUser) {
          setUser(decryptedUser);
        }
      } catch (error) {
        console.error("Error decrypting user data", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    if (user?.role) {
      document.title = `Dashboard | Pesa Link`;
    } else {
      document.title = "Pesa Link";
    }
  }, [user]);


  const handleLogin = () => {
    const enuser = localStorage.getItem("user");
    const user = decryptData(enuser);
    console.log("logged in user", user)
    setUser(user);
  };

  return (
    <>
      <Redirector/>
      {
        user ? (
          
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen}>
            <Navbar/>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
       </Sidebar>
        ): (
      <Routes>
              <Route path="/" element={<Login setUser={setUser} onLogin={handleLogin} />} />
      </Routes>
            
        )
      }
    </>
   
  );
}

export default App;
