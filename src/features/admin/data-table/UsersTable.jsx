import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { useMusicStore } from "@/store/useMusicStore";
import { Calendar, Trash2 } from "lucide-react";
import TableSkel from "../../../LoadingSkel/TableSkel";
import { useEffect } from "react";
import useUserStore from "@/store/useUserStore";

const UsersTable = () => {
  const { users = [], isLoading, deleteUser, fetchUsers } = useUserStore();
  useEffect(() => {
    fetchUsers(1, 10);
  }, [fetchUsers]);
  if (isLoading) {
    return <TableSkel />;
  }
  console.log(users);
  // Uncomment and add error handling if needed
  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center py-8">
  //       <div className="text-red-400">{error}</div>
  //     </div>
  //   );
  // }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead>User Name</TableHead>
          <TableHead>Date Of Birth</TableHead>
          <TableHead>Created Playlists</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => {
          const userName = user?.name || "Unknown User"; // Default to "Unknown Title"
          const userEmail = user?.email || "Unknown Email"; // Default to "Unknown Artist"
          const dob = user?.dob || "Unknown Date Of Birth"; // Default to "Unknown Date"
          const createdPlaylists = user?.createdPlaylists || [];
          const roles = user?.roles || [];
          return (
            <TableRow key={user.id} className="hover:bg-zinc-800/50">
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <p>{userName}</p>
                  <p>{userEmail}</p>
                </div>
              </TableCell>

              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  {dob}
                </span>
              </TableCell>

              <TableCell className="font-medium">
                {createdPlaylists.length > 0 ? (
                  <div>
                    {createdPlaylists.slice(0, 2).map((playlist) => (
                      <span key={playlist.id} className="inline-block mr-2">
                        {playlist.name},
                      </span>
                    ))}
                    {createdPlaylists.length > 2 && (
                      <span className="text-gray-400">...</span>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">No Created Playlists</span>
                )}
              </TableCell>

              <TableCell className="font-medium">
                {roles.length > 0 ? (
                  <div>
                    {roles.slice(0, 2).map((role) => (
                      <span
                        key={role.description}
                        className="inline-block mr-2"
                      >
                        {role.name},
                      </span>
                    ))}
                    {roles.length > 2 && (
                      <span className="text-gray-400">...</span>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">No Role</span>
                )}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => deleteUser(user.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
