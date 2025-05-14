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

import { Trash2 } from "lucide-react";
import { useState } from "react";

const DeleteDialog = ({ id, deleteAPI, title, type, isLoading }) => {
  const [songDialogOpen, setSongDialogOpen] = useState(false);

  const handleDelete = async () => {
    deleteAPI(id);
    setSongDialogOpen(false);
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
          onClick={() => setSongDialogOpen(true)}
        >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-auto text-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Are you sure to delete this {type}?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setSongDialogOpen(false)}
            disabled={isLoading}
            className="text-white hover:opacity-80 hover:bg-zinc-600 transition duration-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="text-white bg-green-500 transition duration-200"
          >
            {isLoading ? "Deleting..." : title}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
