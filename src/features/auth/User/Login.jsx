import { Button } from "@/components/ui/button";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Select from "react-select";
import { countries } from "../../../store/StoreData";
import { loginAPI } from "@/services/apiLogin.";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

const Login = ({ handleToggle }) => {
  const navigate = useNavigate();
  const { setIsLogin, setToken } = useAuth();
  const [isHidden, setIsHidden] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failResponse, setFailResponse] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setFailResponse("");
    if (!email || !password) {
      setFailResponse("Vui lòng nhập đủ các trường!");
      return;
    }

    try {
      const login = await loginAPI(email, password);
      if (!login) {
        return;
      }
      const { result } = login;
      // Get Token from URL
      const token = result.accessToken;

      // Save to Session Storage
      sessionStorage.setItem("authToken", token);

      // Save Token to the Auth Provider
      setToken(token);
      setIsLogin(true);

      // Navigate to Home Page
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Đăng nhập thất bại!";
      setFailResponse(message);
    }
  };
  return (
    <form
      className="h-full bg-[#242424] relative"
      onSubmit={(e) => handleLogin(e)}
    >
      <div className=" flex justify-between items-center h-[10%] px-10 pt-14">
        <p
          className="font-bold text-4xl text-stone-50 cursor-pointer"
          onClick={() => navigate("/")}
        >
          MyMusic
        </p>
        <Select
          options={countries}
          defaultValue={countries[1]}
          className="react-select-container rounded-full"
          classNamePrefix="react-select"
          isSearchable={false}
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: "10rem",
              padding: "0.5rem",
              fontWeight: "700",
              cursor: "pointer",
            }),
            menu: (base) => ({
              ...base,
              borderRadius: "10px",
            }),
            option: (base, state) => ({
              ...base,
              marginBottom: "5px",
              fontWeight: "600",
              backgroundColor: state.isSelected ? "#f87171" : "",
              padding: "5px",
              "&:hover": {
                backgroundColor: "#f87171",
                color: "white",
              },
            }),
          }}
        />
      </div>

      <p className=" absolute text-7xl font-bold text-stone-50 top-[25%] left-[25%] cursor-pointer">
        Hello, Mate!
      </p>
      <p className=" absolute text-2xl font-semibold text-stone-100 top-[37%] left-[20%] cursor-pointer">
        Welcom to MyMusic. Let the rhythm guide you
      </p>
      <div className="flex flex-col w-[50%] absolute top-[45%] left-[25%]">
        <input
          type="text"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="placeholder:text-base pl-5 py-4 placeholder:text-black font-medium rounded-xl bg-white mb-3 focus:outline-none border-2 border-stone-400 focus:ring-zinc-400 focus:ring-1"
        />
        <div className="relative">
          <input
            type={isHidden ? "password" : "text"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="placeholder:text-base pl-5 py-4 placeholder:text-black font-medium rounded-xl bg-white mb-3 focus:outline-none border-2 border-stone-400 focus:ring-zinc-400 focus:ring-1 w-full"
          />
          <div className="absolute top-[25%] right-[5%] cursor-pointer text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon
              icon={isHidden ? faEyeSlash : faEye}
              onClick={() => setIsHidden((isHidden) => !isHidden)}
            />
          </div>

          <p
            className="absolute right-0 text-stone-50 font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
          {failResponse && (
            <p className="text-base font-medium mt-10 text-[#3D3BF3]">
              {failResponse}
            </p>
          )}
        </div>
        <Button className="text-stone-800 bg-[#45b541] hover:bg-[#56cc55] rounded-full mt-10 py-8 text-2xl font-bold">
          Log In
        </Button>
        <div className="flex absolute top-[105%] right-[20%] ">
          <p className="font-semibold text-stone-400 mr-2">
            Don&apos;t have an account?
          </p>
          <p
            className="hover:underline cursor-pointer text-stone-50"
            onClick={() => handleToggle()}
          >
            Sign Up
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
