import { buttonVariants } from "@/components/ui/button";
import LogIn from "@/features/auth/User/SignedIn";
import User from "@/features/auth/User/User";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useAuthStore } from "@/store/useAuthStore";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchInput from "../features/main/search/SearchInput";

function Header() {
  const { isAdmin } = useAuthStore();
  const { isLogin } = useAuth();
  return (
    <div className="flex justify-between p-4 items-center z-10 sticky z-10">
      <Logo />
      <div className="flex items-center">
        <Link
          to="/"
          className="bg-primary w-[55px] h-[55px] items-center justify-center flex rounded-[50%] hover:outline-none hover:scale-105 transition-transform cursor-pointer mr-3"
        >
          <FontAwesomeIcon icon={faHouse} size="lg" />
        </Link>
        <SearchInput />
      </div>
      <div className="flex items-center gap-5">
        {isAdmin ? (
          <Link
            to="/admin"
            // "flex items-center gap-4 px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition focus:outline-none"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4 mr-2 " />
            Admin Dashboard
          </Link>
        ) : (
          ""
        )}
        {isLogin ? <User /> : <LogIn />}
      </div>
    </div>
  );
}

export default Header;
