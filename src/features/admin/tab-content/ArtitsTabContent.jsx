import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MicVocal } from "lucide-react";
import AddArtistDialog from "../add-data/AddArtistDialog";
import ArtistsTable from "../data-table/ArtistsTable";

const ArtistsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MicVocal className="size-5 text-emerald-500" />
              Artists Management
            </CardTitle>
            <CardDescription>Manage all your artists</CardDescription>
          </div>
          <AddArtistDialog className="text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <ArtistsTable />
      </CardContent>
    </Card>
  );
};

export default ArtistsTabContent;
