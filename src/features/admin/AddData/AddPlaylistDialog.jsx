import CreatableSelect from "react-select/creatable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMusicStore } from "@/store/useMusicStore";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddPlaylistDialog = () => {
  const { addPlaylist, isLoading, songs } = useMusicStore();
  const [playlistDialogOpen, setPlaylistDialogOpen] = useState(false);

  const [newPlaylist, setNewPlaylist] = useState({
    title: "",
    description: "",
    follower: "",
    listener: "",
    creator: "",
    songs: [],
  });

  const [files, setFiles] = useState({
    image: null,
  });

  const imageInputRef = useRef(null);
  const clearData = () => {
    setNewPlaylist({
      title: "",
      description: "",
      follower: "",
      listener: "",
      creator: "",
      songs: [],
    });

    setFiles({
      image: null,
    });
  };
  const handleSongsChange = (selectedOptions) => {
    const songsArray = selectedOptions.map((option) => {
      return option.label;
    });
    setNewPlaylist({ ...newPlaylist, songs: songsArray });
  };
  const handleSubmit = async () => {
    if (!files.image) {
      return toast.error("Please upload image files");
    }

    const formData = new FormData();

    formData.append("title", newPlaylist.title);
    formData.append("description", newPlaylist.description);
    formData.append("follower", newPlaylist.follower);
    formData.append("listener", newPlaylist.listener);
    formData.append("songs", newPlaylist.songs);
    formData.append("image", files.image);
    // Cách để log các cặp key-value trong formData
    for (let [key, value] of formData.entries()) {
      console.log(key, value); // In key và value của mỗi phần tử trong FormData
    }
    addPlaylist(formData);
    clearData();
    setPlaylistDialogOpen(false);
  };

  return (
    <Dialog open={playlistDialogOpen} onOpenChange={setPlaylistDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Playlist
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-auto text-white">
        <DialogHeader>
          <DialogTitle>Add New Playlist</DialogTitle>
          <DialogDescription>
            Add a new playlist to your music app
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            ref={imageInputRef}
            className="hidden text-white"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFiles((prev) => ({ ...prev, image: file }));
            }}
          />

          {/* Image upload area */}
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500">
                    Image selected:
                  </div>
                  <div className="text-xs">{files.image.name.slice(0, 20)}</div>
                  {/* Image Preview */}
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(files.image)} // Create a preview URL for the selected image
                      alt="Artist Image Preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="text-sm">Upload Artist Image</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs text-white"
                  >
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Other fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Title</label>
            <Input
              value={newPlaylist.title}
              onChange={(e) =>
                setNewPlaylist({ ...newPlaylist, title: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Description
            </label>
            <Input
              value={newPlaylist.description}
              onChange={(e) =>
                setNewPlaylist({ ...newPlaylist, description: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          {/* Follower */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Follower</label>
            <Input
              type="number"
              min="0"
              value={newPlaylist.follower}
              onChange={(e) =>
                setNewPlaylist({
                  ...newPlaylist,
                  follower: e.target.value || "0",
                })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          {/* Listener */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Listener</label>
            <Input
              type="number"
              min="0"
              value={newPlaylist.listener}
              onChange={(e) =>
                setNewPlaylist({
                  ...newPlaylist,
                  listener: e.target.value || "0",
                })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          {/* Songs Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white ">
              Songs (Optional)
            </label>
            <CreatableSelect
              isMulti
              options={songs.map((song) => ({
                label: song.name,
                value: song.id,
              }))}
              onChange={handleSongsChange}
              placeholder="Select or add songs..."
              className="bg-zinc-800 border-zinc-700"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#27272a", // Màu nền bg-zinc-800
                  borderColor: "#3F3F46", // Màu viền border-zinc-700
                  color: "white", // Màu chữ text-white
                  borderRadius: "0.375rem", // Rounded-lg
                  padding: "0.25rem", // Padding nội bộ
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#27272a", // Menu nền
                  borderColor: "#3F3F46", // Viền menu
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#3F3F46" : "#27272a", // Nền khi hover
                  color: state.isFocused ? "white" : "#A1A1AA", // Màu chữ hover
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#3F3F46", // Màu nền thẻ chọn
                  color: "white",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "white", // Màu chữ của thẻ chọn
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "#A1A1AA", // Màu nút xóa
                  ":hover": {
                    backgroundColor: "#EF4444", // Nền khi hover nút xóa
                    color: "white",
                  },
                }),
                input: (base) => ({
                  ...base,
                  color: "white", // Màu chữ khi gõ vào input
                }),
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setPlaylistDialogOpen(false);
              clearData();
            }}
            disabled={isLoading}
            className="text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="text-white"
          >
            {isLoading ? "Uploading..." : "Add Playlist"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlaylistDialog;
