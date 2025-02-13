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

const SongsTable = () => {
  const { songs = [], isLoading, deleteSong } = useMusicStore();
  console.log(songs);

  if (isLoading) {
    return <TableSkel />;
  }

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
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Song Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs?.map((song) => {
          const songName = song?.name || "Unknown Title"; // Default to "Unknown Title"
          const artistName = song?.artists?.[0]?.name || "Unknown Artist"; // Default to "Unknown Artist"
          const releaseDate = song?.createdAt || "Unknown Date"; // Default to "Unknown Date"
          const imageURL = song?.imageURL || ""; // Fallback to an empty string if imageURL is not provided

          return (
            <TableRow key={song.id} className="hover:bg-zinc-800/50">
              <TableCell>
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt={songName}
                    className="size-10 rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-zinc-800 rounded" /> // Placeholder if no image
                )}
              </TableCell>
              <TableCell className="font-medium">{songName}</TableCell>
              <TableCell className="font-medium">{artistName}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  {releaseDate}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => deleteSong(song.id)}
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

export default SongsTable;
