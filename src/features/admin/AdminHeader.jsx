import Logo from "@/UI/Logo";
import { Link } from "react-router-dom";
import User from "../auth/User/User";

const AdminHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/">
          <Logo />
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Music App Manager</h1>
          <p className="text-zinc-400 mt-1">
            Manage music easier with this one!
          </p>
        </div>
      </div>
      <User />
    </div>
  );
};

export default AdminHeader;
