import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../Components/axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditPost = () => {
  const [caption, setCaption] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const {id} = location.state;



  const navigate = useNavigate();

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption) {
      setUploadStatus("Please enter a caption.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUploadStatus("No authentication token found.");
        setIsSubmitting(false);
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const response = await axios.patch(
        `/updatePost/${id}`,
        { caption, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUploadStatus("Caption updated successfully!");
        setCaption("");
        setTimeout(() => {
          setIsSubmitting(false);
          navigate("/Profile");
          
        }, 1000);
      } else {
        setUploadStatus(`Failed to update caption: ${response.data.message}`);
        setIsSubmitting(false);
      }
    } catch (err) {
      setUploadStatus(`Error updating caption: ${err.message}`);
      console.error("Error updating caption:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto text-center pt-32 sm:pt-28 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Caption</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg"
      >
        <div className="mb-6">
          <label
            htmlFor="caption"
            className="block text-left mb-2 font-bold text-gray-700"
          >
            Caption
          </label>
          <textarea
            id="caption"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={caption}
            onChange={handleCaptionChange}
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ${
            isSubmitting ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {uploadStatus && <p className="mt-4 text-red-500">{uploadStatus}</p>}
      </form>
    </div>
  );
};

export default EditPost;
