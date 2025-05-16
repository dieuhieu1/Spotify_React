const MainPlaylistSkeleton = () => {
  return (
    <div className="h-full animate-pulse">
      <div className="h-full bg-gradient-to-b from-[red] via-zinc-900/80 to-zinc-900">
        {/* Header Section */}
        <div className="flex p-6 gap-6 pb-8">
          <div className="w-[240px] h-[240px] bg-zinc-700 rounded shadow-xl"></div>
          <div className="flex flex-col justify-end gap-4">
            <div className="h-4 w-20 bg-zinc-700 rounded"></div>
            <div className="h-10 w-64 bg-zinc-700 rounded"></div>
            <div className="flex gap-2">
              <div className="h-4 w-16 bg-zinc-700 rounded"></div>
              <div className="h-4 w-12 bg-zinc-700 rounded"></div>
              <div className="h-4 w-20 bg-zinc-700 rounded"></div>
            </div>
          </div>
        </div>
        {/* Play Button */}
        <div className="px-6 pb-4 flex items-center gap-6">
          <div className="w-14 h-14 bg-zinc-700 rounded-full"></div>
        </div>
        {/* Table Section */}
        <div className="bg-black/20 backdrop-blur-sm">
          {/* Table Header */}
          <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2">
            <div className="h-4 w-4 bg-zinc-700 rounded"></div>
            <div className="h-4 w-16 bg-zinc-700 rounded"></div>
            <div className="h-4 w-20 bg-zinc-700 rounded"></div>
            <div className="h-4 w-4 bg-zinc-700 rounded"></div>
          </div>
          {/* Skeleton for Songs */}
          <div className="px-6 space-y-2 py-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2"
              >
                <div className="h-4 w-4 bg-zinc-700 rounded"></div>
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] bg-zinc-700 rounded"></div>
                  <div>
                    <div className="h-4 w-32 bg-zinc-700 rounded"></div>
                    <div className="h-4 w-20 bg-zinc-700 rounded mt-1"></div>
                  </div>
                </div>
                <div className="h-4 w-20 bg-zinc-700 rounded"></div>
                <div className="h-4 w-12 bg-zinc-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPlaylistSkeleton;
