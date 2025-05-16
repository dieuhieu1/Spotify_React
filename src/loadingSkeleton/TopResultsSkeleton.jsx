const TopResultsSkeleton = () => {
  return (
    <div className="bg-primary p-4">
      {/* Header */}
      <div className="flex flex-row gap-[18%] mb-4">
        <div className="w-[30%] h-8 bg-gray-700 rounded animate-pulse"></div>
        <div className="w-[30%] h-8 bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Top result */}
      <div className="flex gap-6 mb-6">
        <div className="w-[30%] p-8 bg-gray-800 rounded-lg animate-pulse h-48"></div>
        <div className="ml-3 w-[70%]">
          {/* Danh sách bài hát skeleton */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-4 px-6 bg-gray-800 rounded mb-4 animate-pulse"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded"></div>
                <div>
                  <div className="w-40 h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="w-28 h-3 bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="w-8 h-4 bg-gray-700 rounded"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Playlists grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(6,_1fr)] gap-4 mb-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-[250px] bg-gray-800 rounded-md animate-pulse"
          />
        ))}
      </div>

      {/* Artists grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(6,_1fr)] gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-[200px] bg-gray-800 rounded-md animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default TopResultsSkeleton;
