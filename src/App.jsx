// App.js
import React,{useState,useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './screens/login/Login';
import Sidebar from './layout/SideBar';
import Navbar from './layout/NavBar';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [user,setUser] = useState(null)



  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {
        user ? (
          
       <Sidebar  isOpen={sidebarOpen} setIsOpen={setSidebarOpen}>

       </Sidebar>
        ): (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
            
        )
      }
    </>
   
  );
}

export default App;
