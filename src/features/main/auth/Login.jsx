import { Button } from "@/components/ui/button";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Select from "react-select";
import { countries } from "./StoreData";
import { loginAPI } from "@/services/apiLogin.";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { getToken } from "@/utils/getToken";

const Login = ({ handleToggle }) => {
  const navigate = useNavigate();
  const { setIsLogin, setToken } = useAuth();
  const [isHidden, setIsHidden] = useState(false);

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
      navigate(`/?access_token=${login.result.token}`);
      const token = getToken();
      console.log(token);
      sessionStorage.setItem("authToken", token);
      setToken(token);
      setIsLogin(true);
      // Bạn có thể xử lý dữ liệu trả về ở đây (ví dụ: lưu token và chuyển hướng)
    } catch (error) {
      setFailResponse(error.message); // Hiển thị thông báo lỗi từ service
    }
  };
  return (
    <form
      className="h-full bg-red-300 relative"
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

      <p className=" absolute text-7xl font-bold text-stone-900 top-[25%] left-[25%] cursor-pointer">
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

          <p className="absolute right-0 text-base font-medium hover:underline cursor-pointer">
            Forgot Password?
          </p>
          {failResponse && (
            <p className="text-base font-medium mt-10 text-[#3D3BF3]">
              {failResponse}
            </p>
          )}
        </div>
        <Button className="text-stone-100 rounded-full mt-10 py-8 text-2xl font-bold">
          Log In
        </Button>
        <div className="flex absolute top-[105%] right-[20%] ">
          <p className="font-semibold text-stone-900 mr-2">
            Don&apos;t have an account?
          </p>
          <p
            className="hover:underline cursor-pointer text-stone-100"
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
