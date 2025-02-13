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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMusicStore } from "@/store/useMusicStore";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddArtistsDialog = () => {
  const { albums, addArtist, isLoading, songs } = useMusicStore();
  const [artistDialogOpen, setArtistDialogOpen] = useState(false);

  const [newArtist, setNewArtist] = useState({
    name: "",
    follower: "",
    songs: [],
    albums: [],
  });

  const [files, setFiles] = useState({
    image: null,
  });

  const imageInputRef = useRef(null);
  const clearData = () => {
    setNewArtist({
      name: "",
      follower: "",
      songs: [],
      albums: [],
    });

    setFiles({
      image: null,
    });
  };
  const handleSongsChange = (selectedOptions) => {
    const songsArray = selectedOptions.map((option) => option.label);
    setNewArtist({ ...newArtist, songs: songsArray });
  };
  const handleSubmit = async () => {
    if (!files.image) {
      return toast.error("Please upload image files");
    }

    const formData = new FormData();

    formData.append("name", newArtist.name);
    formData.append("follower", newArtist.follower);
    formData.append("songs", newArtist.songs);

    if (newArtist.albums && newArtist.albums !== "undefined") {
      formData.append("albumId", newArtist.albums);
    }

    formData.append("image", files.image);
    // Cách để log các cặp key-value trong formData
    for (let [key, value] of formData.entries()) {
      console.log(key, value); // In key và value của mỗi phần tử trong FormData
    }
    addArtist(formData);
    clearData();
    setArtistDialogOpen(false);
  };

  return (
    <Dialog open={artistDialogOpen} onOpenChange={setArtistDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Artist
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-auto text-white">
        <DialogHeader>
          <DialogTitle>Add New Artist</DialogTitle>
          <DialogDescription>
            Add a new artist to your music app
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
            <label className="text-sm font-medium text-white">Name</label>
            <Input
              value={newArtist.name}
              onChange={(e) =>
                setNewArtist({ ...newArtist, name: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Follower</label>
            <Input
              type="number"
              min="0"
              value={newArtist.follower}
              onChange={(e) =>
                setNewArtist({ ...newArtist, follower: e.target.value || "0" })
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

          {/* Albums Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Album (Optional)
            </label>
            <Select
              value={newArtist.albums}
              onValueChange={(value) =>
                setNewArtist({ ...newArtist, albums: value })
              }
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Select album" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                <SelectItem value="none">No Album (Single)</SelectItem>
                {albums.map((album) => (
                  <SelectItem key={album._id} value={album._id}>
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setArtistDialogOpen(false);
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
            {isLoading ? "Uploading..." : "Add Artist"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddArtistsDialog;
