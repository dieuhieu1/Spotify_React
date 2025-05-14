import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

const VerificationInput = ({
  verificationCode,
  setVerificationCode,
  email,
}) => {
  const [error, setError] = useState(null);
  const { verifyCode } = useAuthStore();
  const handleChange = (e) => {
    const value = e.target.value;
    // Chỉ cho phép nhập tối đa 6 ký tự và chỉ có số
    if (/^\d{0,6}$/.test(value)) {
      setVerificationCode(value);
      setError(null); // Reset lỗi khi người dùng nhập
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra nếu mã nhập không đúng
    if (setVerificationCode.length !== 6) {
      setError("Hãy nhập mã gồm 6 chữ số");
    } else {
      // Xử lý khi mã đúng
      verifyCode({ email, verificationCode });
      console.log("Mã xác nhận:", code);
    }
  };

  return (
    <div className="flex justify-center items-center border border-white pb-4 rounded-lg">
      <div className="text-white text-center space-y-4">
        {/* Input with validation */}
        <input
          type="text"
          id="verification-code"
          value={verificationCode}
          onChange={handleChange}
          maxLength="6"
          aria-label="Hãy nhập mã gồm 6 chữ số mà chúng tôi đã gửi cho bạn để xác nhận email"
          inputMode="numeric"
          spellCheck="false"
          autoComplete="off"
          autoFocus
          aria-invalid={error ? "true" : "false"}
          className="pt-5 bg-transparent border-b-2 border-white outline-none text-xl text-center w-[50%]"
        />

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-sm" id="error">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationInput;
