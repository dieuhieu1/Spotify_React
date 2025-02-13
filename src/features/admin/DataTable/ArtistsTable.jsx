import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/store/useMusicStore";
import { Trash2, UserRoundCheck } from "lucide-react";
import { useEffect } from "react";
import TableSkel from "../../../LoadingSkel/TableSkel";

const ArtistsTable = () => {
  const { artists, deleteArtists, fetchArtists, isLoading } = useMusicStore();
  useEffect(() => {
    fetchArtists(1, 10);
  }, [fetchArtists]);

  if (isLoading) {
    return <TableSkel />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Artist Info</TableHead>
          <TableHead>Artist&apos;s songs</TableHead>
          <TableHead>Follower</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {artists?.map((artist) => {
          const artistName = artist?.name || "Unknown Artist"; // Default to "Unknown Title"
          const follower = artist?.follower || "Unknown Date"; // Default to "Unknown Date"
          const imageURL = artist?.imageURL || ""; // Fallback to an empty string if imageURL is not provided
          const songs = artist?.songs || [];
          return (
            <TableRow key={artist.id} className="hover:bg-zinc-800/50">
              <TableCell>
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt={artistName}
                    className="size-10 rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-zinc-800 rounded" /> // Placeholder if no image
                )}
              </TableCell>
              <TableCell>{artistName}</TableCell>
              <TableCell className="font-medium">
                {songs.length > 0 ? (
                  <div>
                    {songs.slice(0, 2).map((song) => (
                      <span key={song.id} className="inline-block mr-2">
                        {song.name},
                      </span>
                    ))}
                    {songs.length > 2 && (
                      <span className="text-gray-400">...</span>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">No songs</span>
                )}
              </TableCell>

              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <UserRoundCheck className="h-4 w-4" />
                  {follower}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => deleteArtists(artist.id)}
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

export default ArtistsTable;
