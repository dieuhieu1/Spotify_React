import React from "react";

const categories = [
  {
    title: "Nhạc",
    color: "bg-pink-500",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Podcasts",
    color: "bg-green-600",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Sự kiện trực tiếp",
    color: "bg-purple-500",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Nhạc trong năm 2024",
    color: "bg-green-700",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Podcast hay nhất năm 2024",
    color: "bg-pink-600",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Dành Cho Bạn",
    color: "bg-blue-600",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Mới phát hành",
    color: "bg-yellow-600",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Nhạc Việt",
    color: "bg-blue-400",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Pop",
    color: "bg-blue-300",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "K-Pop",
    color: "bg-red-500",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Hip-Hop",
    color: "bg-orange-600",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Bảng xếp hạng Podcast",
    color: "bg-blue-500",
    image: "https://via.placeholder.com/150",
  },
];

const SearchResult = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">Duyệt tìm tất cả</h2>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`relative rounded-lg ${category.color} p-4 cursor-pointer hover:scale-105 transition-transform`}
          >
            {/* Title */}
            <h3 className="font-bold text-xl">{category.title}</h3>

            {/* Image */}
            <img
              src={category.image}
              alt={category.title}
              className="absolute bottom-2 right-2 w-20 h-20 rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
