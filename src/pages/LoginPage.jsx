import Login from "@/features/main/auth/Login";
import SignUp from "@/features/main/auth/SignUp";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
("../assets/client-assets/img/ai-generated-8885446_1920.jpg");
function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const handleToggle = () => {
    setIsLogin((isLogin) => !isLogin);
  };
  return (
    <div className="w-full h-screen bg-slate- items-center flex justify-center bg-zinc-300">
      <div className=" flex w-[calc(100vw-300px)] h-[calc(100vh-200px)] rounded-3xl overflow-hidden ">
        <div
          className={`w-1/2 transition-transform duration-1000 ${
            isLogin ? "translate-x-0" : "translate-x-[100%]"
          }`}
        >
          {isLogin ? (
            <Login handleToggle={handleToggle} />
          ) : (
            <SignUp handleToggle={handleToggle} />
          )}
        </div>
        <div className="w-1/2 ">
          <div
            className={`bg-loginImg bg-cover  h-full bg-no-repeat bg-center text-5xl font-bold text-white relative px-4  transition-transform duration-1000  ${
              isLogin ? "translate-x-0" : "translate-x-[-100%]"
            }`}
          >
            <div className="absolute top-[5%] left-[20%] ">
              <FontAwesomeIcon icon={faQuoteLeft} />
              <p>Turn Up the Music,</p>
              <p>Turn Down the Stress.</p>
            </div>
            <FontAwesomeIcon
              icon={faQuoteRight}
              className="absolute top-[26%] right-[18%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
