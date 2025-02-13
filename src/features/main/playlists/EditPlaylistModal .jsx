import React, { useState, useRef } from "react";

const EditPlaylistModal = ({
  onClose,
  title,
  setTitle,
  files,
  setFiles,
  setDescription,
}) => {
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [localImage, setLocalImage] = useState(files?.image || null); // State cục bộ cho ảnh
  const [localTitle, setLocalTitle] = useState(title); // State cục bộ cho tiêu đề

  const fileInputRef = useRef(null); // Tạo ref cho input file
  const modalRef = useRef();
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // Gọi hàm đóng modal
    }
  };

  // Hàm mở file picker khi click vào ảnh
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Hàm xử lý khi file được tải lên
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFiles({ image: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLocalImage(reader.result); // Hiển thị ảnh preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setFiles((prev) => ({ ...prev, image: localImage })); // Cập nhật ảnh về component cha
    setDescription(playlistDescription); // Cập nhật ảnh về component cha
    setTitle(localTitle); // Cập nhật tiêu đề về component cha
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => handleOutsideClick(e)}
    >
      <div
        ref={modalRef}
        className="bg-zinc-900 p-6 rounded-lg shadow-lg w-96 text-white"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sửa thông tin chi tiết
        </h2>

        {/* Nội dung */}
        <div className="flex gap-4 mb-6">
          {/* Hình đại diện */}
          <div
            className="w-[112px] h-[112px] bg-zinc-700 flex items-center justify-center rounded-md cursor-pointer"
            onClick={handleImageClick}
          >
            {localImage ? (
              <img
                src={localImage}
                alt="Preview"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <span className="text-5xl text-gray-400">🎵</span>
            )}
          </div>

          {/* Input file ẩn */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* Thông tin playlist */}
          <div className="flex flex-col gap-2 flex-1">
            <input
              type="text"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              className="bg-zinc-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <textarea
              placeholder="Thêm phần mô tả không bắt buộc"
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              className="bg-zinc-800 p-2 rounded-md h-16 resize-none focus:outline-none focus:ring-2 focus:ring-gray-600"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-white text-black font-bold py-2 px-4 rounded-full hover:bg-gray-200 transition"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPlaylistModal;
