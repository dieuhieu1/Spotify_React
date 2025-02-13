import { axiosInstance } from "@/lib/axios";
import { getUserInfo } from "@/services/apiUserInfo";
import { useAuthStore } from "@/store/useAuthStore";
import Spinner from "@/UI/Spinner";
import { getToken } from "@/utils/getToken";
import { createContext, useContext, useEffect, useState } from "react";

const updateApiToken = (token) => {
  console.log(token);
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authoriztion"];
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
    const initAuth = () => {
      try {
        if (!token) {
          setToken(sessionStorage.getItem("authToken"));
        }
        updateApiToken(token);
        if (token) {
          setIsLogin(true);
          checkAdminStatus();
        }
      } catch (error) {
        updateApiToken(null);
        console.log("Error in auth ", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [checkAdminStatus, token]);
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
