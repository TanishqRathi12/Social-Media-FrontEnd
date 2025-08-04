import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import axiosPlus from "../Components/axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [imaged, setImaged] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", imaged);
    data.append("upload_preset", "MyCloud");
    data.append("cloud_name", "divlsorxk");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/divlsorxk/image/upload",
        data
      );
      console.log("Image Upload Success:", response.data.url);
      return response.data.url;
    } catch (err) {
      console.error("Image Upload Failed:", err.message);
      throw new Error("Image upload failed");
    }
  };

  const handleImageChange = (e) => {
    setImaged(e.target.files[0]);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imaged) {
      setUploadStatus("Please select an image to upload.");
      return;
    }

    setIsSubmitting(true);

    let image = null;
    try {
      image = await uploadImage();
    } catch (err) {
      setUploadStatus("Failed to upload image.");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUploadStatus("No authentication token found.");
        setIsSubmitting(false);
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);
      formData.append("userId", userId);

      const response = await axiosPlus.post(`/createPost`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setUploadStatus("Post created successfully!");
        setImaged(null);
        setCaption("");
        setTimeout(() => {
          setIsSubmitting(false);
          navigate("/Profile");
        }, 1000);
      } else {
        setUploadStatus(`Failed to create post: ${response.data.message}`);
        setIsSubmitting(false);
      }
    } catch (err) {
      setUploadStatus(`Error creating post: ${err.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto text-center pt-16 sm:pt-20 max-w-lg">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Create Post
          </h1>
          <p className="text-slate-400 text-lg">
            Share your thoughts with the KnackX community
          </p>
        </div>


        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/90 backdrop-blur-sm p-6 sm:p-8 shadow-2xl rounded-2xl border border-slate-700/50"
        >

          <div className="mb-8">
            <label
              htmlFor="image"
              className="flex items-center justify-start text-white font-semibold text-lg mb-4"
            >
              <svg
                className="w-5 h-5 mr-2 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-slate-700/30 transition-all duration-300 group"
              >
                <svg
                  className="w-10 h-10 text-slate-500 group-hover:text-purple-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-slate-400 group-hover:text-purple-300 transition-colors mt-2">
                  {imaged ? imaged.name : "Click to upload image"}
                </p>
              </label>
            </div>
          </div>

          <div className="mb-8">
            <label
              htmlFor="caption"
              className="flex items-center justify-start text-white font-semibold text-lg mb-4"
            >
              <svg
                className="w-5 h-5 mr-2 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
              Caption
            </label>
            <textarea
              id="caption"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
              value={caption}
              onChange={handleCaptionChange}
              rows="4"
              placeholder="What's on your mind?"
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
              isSubmitting ? "cursor-not-allowed opacity-50 transform-none" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Create Post
              </div>
            )}
          </button>

          {uploadStatus && (
            <div
              className={`mt-6 p-4 rounded-xl ${
                uploadStatus.includes("successfully")
                  ? "bg-green-500/20 border border-green-500/30 text-green-400"
                  : "bg-red-500/20 border border-red-500/30 text-red-400"
              }`}
            >
              <p className="font-medium">{uploadStatus}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
