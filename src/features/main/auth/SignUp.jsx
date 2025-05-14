import { Button } from "@/components/ui/button";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Select from "react-select";
import { countries, months } from "./StoreData";
import InputForm from "./Input";
import { registerAPI } from "@/services/apiRegister";
import { validateEmail } from "@/utils/validateEmail";
import { useNavigate } from "react-router-dom";

const SignUp = ({ handleToggle }) => {
  const navigate = useNavigate();

  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  // INFO
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Date Of Birth
  const [date, setDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [year, setYear] = useState("");
  const [responeMes, setResponseMes] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const handleChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const clearState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setDate("");
    setSelectedMonth("");
    setYear("");
    setIsRegister(true);
  };
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    setResponseMes("");
    setLoading(true);
    if (!name || !date || !selectedMonth || !year) {
      setResponseMes("Vui lòng nhập đầy đủ thông tin!");
      setLoading(false);
      return;
    }
    if (!email || !validateEmail(email)) {
      setResponseMes("Email không hợp lệ");
      setLoading(false);
      return;
    }
    if (!password || password.length < 5) {
      setResponseMes("Mật khẩu phải có ít nhất 5 ký tự");
      setLoading(false);
      return;
    }
    let dob;
    if (selectedMonth.length < 2) {
      dob = year + "-0" + selectedMonth + "-" + date;
    } else {
      dob = year + "-" + selectedMonth + "-" + date;
    }

    try {
      console.log(dob);
      const data = await registerAPI(name, email, password, dob);

      if (data.code === 201) {
        clearState();
      }
      console.log("Đăng nhập thành công:", data);
      // Bạn có thể xử lý dữ liệu trả về ở đây (ví dụ: lưu token và chuyển hướng)
    } catch (error) {
      setResponseMes(error.message); // Hiển thị lỗi từ API
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full bg-[#7a1818] relative ">
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

      <p className="absolute text-5xl font-bold text-stone-900 top-[15%] left-[12%] cursor-pointer">
        Create Your Account Today
      </p>
      <p className="absolute text-2xl font-semibold text-stone-100 top-[22%] left-[35%] cursor-pointer">
        Let the Music Move You!
      </p>
      {isRegister ? (
        <div className="text-gray-800 text-center font-bold text-3xl mt-4 absolute top-[50%]">
          <p className="w-6/7">
            🎉 Registration successful! Welcome to our platform. Please log in
            to start your journey. 🚀
          </p>
          <Button
            className="text-stone-100 rounded-full mt-5 py-8 font-bold w-1/4"
            onClick={() => {
              handleToggle();
              setIsRegister((isRegister) => !isRegister);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <p className="text-lg">Log In</p>
          </Button>
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmitSignUp(e)}>
          <div className="flex flex-col w-[40%] absolute top-[30%] left-[32%]">
            <InputForm
              value={email}
              setValue={setEmail}
              textLabel="Email"
              placeholder="name@domain.com"
              type="text"
              id="email"
            />
            <InputForm
              value={name}
              setValue={setName}
              textLabel="Name"
              placeholder="name"
              type="text"
              id="name"
            />
            <label htmlFor="date">Date Of Birth</label>
            <div className="flex gap-2">
              <input
                id="date"
                placeholder="dd"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className=" w-[25%] placeholder:text-base pl-3 py-2 placeholder:text-black font-medium rounded-xl bg-white mb-3 focus:outline-none border-2 border-stone-400 focus:ring-zinc-400 focus:ring-1 "
              />
              <select
                id="month"
                name="month"
                value={selectedMonth}
                onChange={handleChange}
                className="w-[50%] bg-white border-stone-400 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-zinc-400 focus:ring-1 text-base pl-3 h-[44px] font-medium"
              >
                <option value="" disabled>
                  Tháng
                </option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <input
                placeholder="yyyy"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-[25%] placeholder:text-base pl-3 py-2 placeholder:text-black font-medium rounded-xl bg-white mb-3 focus:outline-none border-2 border-stone-400 focus:ring-zinc-400 focus:ring-1 "
              />
            </div>
            <div className="relative">
              <label htmlFor="password">Password</label>
              <input
                type={isHidden ? "password" : "text"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="placeholder:text-lg pl-5 py-2 placeholder:text-black font-medium rounded-xl bg-white mb-3 focus:outline-none border-2 border-stone-400 focus:ring-zinc-400 focus:ring-1 w-full"
              />
              <div className="absolute top-[44%] right-[5%] cursor-pointer text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon
                  icon={isHidden ? faEyeSlash : faEye}
                  onClick={() => setIsHidden((isHidden) => !isHidden)}
                />
              </div>
              {responeMes && (
                <p className="text-base font-medium ">{responeMes}</p>
              )}
            </div>
            <Button className="text-stone-100 rounded-full mt-4 py-8 text-2xl font-bold">
              Sign Up
            </Button>
            <div className="flex absolute top-[104%]  w-full left-[13%]">
              <p className="font-semibold text-stone-900 mr-2">
                Already have an account?
              </p>
              <p
                className="hover:underline cursor-pointer text-stone-100"
                onClick={() => handleToggle()}
              >
                Log In
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUp;
