import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

const PlayBtn = () => {
  const handlePlay = () => {};

  return (
    <Button
      onClick={handlePlay}
      className=" absolute right-2 bottom-[18%] bg-green-500 
      rounded-[50%] w-[50px] h-[50px] hover:bg-green-400 hover:scale-105 transition-all 
      translate-y-2 group-hover:translate-y-0 
      opacity-0 group-hover:opacity-100"
    >
      <Play className="size-5 text-black" />
    </Button>
  );
};

export default PlayBtn;
