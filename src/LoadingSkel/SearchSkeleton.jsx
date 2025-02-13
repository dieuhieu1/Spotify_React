const SearchSkeleton = () => {
  return (
    <div className="bg-primary text-white h-[calc(100vh-200px)] p-6 font-sans overflow-auto animate-pulse">
      {/* Tabs Skeleton */}
      <div className="flex gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-gray-700 h-8 w-24 rounded-full"></div>
        ))}
      </div>

      {/* Kết quả hàng đầu Skeleton */}
      <div className="flex flex-row gap-[20%]">
        <div className="h-6 w-32 bg-gray-700 rounded"></div>
        <div className="h-6 w-32 bg-gray-700 rounded"></div>
      </div>

      <div className="flex mt-6">
        {/* Nghệ sĩ Skeleton */}
        <div className="flex items-start flex-col justify-center bg-gray-800 rounded-lg p-8 gap-4 w-[30%]">
          <div className="w-24 h-24 bg-gray-700 rounded-full"></div>
          <div className="h-6 w-32 bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
        </div>

        {/* Danh sách bài hát Skeleton */}
        <div className="ml-3 w-[70%] space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 px-4 bg-gray-800 rounded-lg"
            >
              <div>
                <div className="h-4 w-32 bg-gray-700 rounded"></div>
                <div className="h-3 w-20 bg-gray-700 rounded mt-2"></div>
              </div>
              <div className="h-4 w-12 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Danh sách album Skeleton */}
      <div className="mt-8">
        <div className="h-6 w-64 bg-gray-700 rounded mb-4"></div>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-gray-800 p-2 rounded-lg">
              <div className="w-full h-32 bg-gray-700 rounded-lg mb-2"></div>
              <div className="h-4 w-24 bg-gray-700 rounded mb-1"></div>
              <div className="h-3 w-16 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSkeleton;
