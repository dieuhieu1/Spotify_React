import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import AddUserDialog from "./AddUserDialog";
import UsersTable from "./UsersTable";

const UsersTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500" />
              Users List
            </CardTitle>
            <CardDescription>Manage your users</CardDescription>
          </div>
          <AddUserDialog className="text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <UsersTable />
      </CardContent>
    </Card>
  );
};

export default UsersTabContent;
