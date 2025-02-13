import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className=" bg-primary inset-0 w-dvw h-screen flex justify-center items-center flex-col gap-5">
        <h1 className="text-8xl text-green-600 font-extrabold">MyMusic</h1>
        <div className="text-center my-6">
          <h1 className="font-bold text-6xl text-white mb-4">
            Không tìm thấy trang
          </h1>
          <p className="text-textPrimary">
            Chúng tôi không tìm thấy trang bạn muốn tìm.
          </p>
        </div>

        <Button
          asChild
          className="rounded-full px-11 py-7 text-center font-semibold text-xl bg-white text-black hover:bg-white hover:scale-110 transition-transform"
        >
          <Link to="/">Quay lại trang chủ</Link>
        </Button>
      </div>
    </>
  );
};

export default PageNotFound;
