import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MicVocal } from "lucide-react";
import PlaylistTable from "../data-table/PlaylistsTable";
import AddPlaylistDialog from "../add-data/AddPlaylistDialog";

const PlaylistsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MicVocal className="size-5 text-emerald-500" />
              Playlists Management
            </CardTitle>
            <CardDescription>Manage and Review all playlists</CardDescription>
          </div>
          <AddPlaylistDialog className="text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <PlaylistTable />
      </CardContent>
    </Card>
  );
};

export default PlaylistsTabContent;
