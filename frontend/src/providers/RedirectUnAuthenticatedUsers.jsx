/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";

const RedirectUnAuthenticatedUsers = ({ children }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true); 

    if (isMounted && !user) {
      navigate("/log-in");
    }
  }, [user, navigate, isMounted]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default RedirectUnAuthenticatedUsers;
