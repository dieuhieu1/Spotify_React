import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import AddAlbumDialog from "../AddData/AddAlbumDialog";
import AlbumsTable from "../DataTable/AlbumsTable";

const AlbumsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500" />
              Albums List
            </CardTitle>
            <CardDescription>Manage all Albums in your app</CardDescription>
          </div>
          <AddAlbumDialog className="text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <AlbumsTable />
      </CardContent>
    </Card>
  );
};

export default AlbumsTabContent;
