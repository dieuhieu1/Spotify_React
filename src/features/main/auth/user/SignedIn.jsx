import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const redirectLogIn = () => {
    navigate("/login");
  };
  return (
    <Button
      className="w-22 text-white border-zinc-200 h-11"
      onClick={redirectLogIn}
    >
      LogIn
    </Button>
  );
};

export default LogIn;
