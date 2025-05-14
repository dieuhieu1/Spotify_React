import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import Spinner from "@/UI/Spinner";
import { createContext, useContext, useEffect, useState } from "react";

const updateApiToken = (token) => {
  console.log(token);
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Tạo Context
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [token, setToken] = useState("");
  const { checkAdminStatus } = useAuthStore();

  useEffect(() => {
    checkAdminStatus();
    updateApiToken(token);
  }, [checkAdminStatus, token]);

  useEffect(() => {
    const initAuth = () => {
      try {
        let savedToken = sessionStorage.getItem("authToken");
        if (savedToken) {
          setToken(savedToken);
          setIsLogin(true);
          checkAdminStatus();
        } else {
          updateApiToken(null);
        }
      } catch (error) {
        console.log("Error in auth ", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [checkAdminStatus]);
  if (loading) {
    return (
      <div className="h-screen w-full items-center flex justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        token,
        setToken,
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  return useContext(AuthContext);
};
export { AuthProvider, useAuth };
