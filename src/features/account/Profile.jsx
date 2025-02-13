import { useState } from "react";
import { months } from "../main/auth/StoreData";
import { useAuthStore } from "@/store/useAuthStore";
import { validateEmail } from "@/utils/validateEmail";
import BackButton from "@/UI/BackButton";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState(user.email || "");
  const [name, setName] = useState(user.name || "");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [year, setYear] = useState("");
  const [responeMes, setResponseMes] = useState("");

  const formData = {};
  console.log(user);

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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMes("");
    // setLoading(true);
    if (!name || !date || !selectedMonth || !year) {
      setResponseMes("Vui lòng nhập đầy đủ thông tin!");
      //   setLoading(false);
      return;
    }
    if (!email || !validateEmail(email)) {
      setResponseMes("Email không hợp lệ");
      //   setLoading(false);
      return;
    }
    if (!password || password.length < 5) {
      setResponseMes("Mật khẩu phải có ít nhất 5 ký tự");
      //   setLoading(false);
      return;
    }

    const dob = date + "/" + selectedMonth + "/" + year;

    try {
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
    <>
      <div className="bg-primary min-h-screen text-white p-8 flex items-center flex-col">
        <BackButton onClick={() => navigate(-1)} />
        {/* Back Button */}

        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">Chỉnh sửa hồ sơ</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
          {/* Username */}
          <div>
            <label className="block mb-1 text-white">Tên người dùng</label>
            <input
              type="text"
              name="username"
              value={name}
              onChange={handleChange}
              className="w-full bg-gray-800 p-2 rounded focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-white">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 p-2 rounded focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-white">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 p-2 rounded focus:outline-none"
            />
          </div>

          {/* Date of Birth */}

          <div>
            <label htmlFor="date" className="text-white">
              Date Of Birth
            </label>
            <div className="flex gap-4">
              <input
                id="date"
                placeholder="dd"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className=" w-[25%]  bg-gray-800 p-2 rounded focus:outline-none "
              />
              <select
                id="month"
                name="month"
                value={selectedMonth}
                onChange={handleChange}
                className="w-[50%]  bg-gray-800 p-2 rounded focus:outline-none"
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
                className="w-[25%] bg-gray-800 p-2 rounded focus:outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              className="py-2 px-6 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="py-2 px-6 bg-green-500 text-black font-bold rounded hover:bg-green-400"
            >
              Lưu hồ sơ
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
