import { decryptData } from "../utils/authUtils";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";

const Redirector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;

    const enuser = localStorage.getItem("user");
    const user = decryptData(enuser);

    const currentPath = location.pathname;

    // Only redirect if user is at root or /login
    const isAtRootOrLogin = currentPath === "/" || currentPath === "/login";

    if (user && isAtRootOrLogin) {
        navigate("/dashboard", { replace: true });      
    }

  }, [navigate, location]);

  return null;
};

export default Redirector;
