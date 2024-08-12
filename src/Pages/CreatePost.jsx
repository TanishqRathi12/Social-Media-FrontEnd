import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import axiosPlus from '../Components/axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [imaged, setImaged] = useState(null);
    const [author, setAuthor] = useState('');
    const [caption, setCaption] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const navigate = useNavigate();

    const uploadImage = async () => {
        const data = new FormData();
        data.append('file', imaged);
        data.append('upload_preset', 'MyCloud');
        data.append('cloud_name', 'divlsorxk');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/divlsorxk/image/upload', data);
            console.log('Image Upload Success:', response.data.url);
            return response.data.url;
        } catch (err) {
            console.error('Image Upload Failed:', err.message);
            throw new Error('Image upload failed');
        }
    };

    const handleImageChange = (e) => {
        setImaged(e.target.files[0]);
    };

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imaged) {
            setUploadStatus('Please select an image to upload.');
            return;
        }

        setIsSubmitting(true);

        let image = null;
        try {
            image = await uploadImage();
        } catch (err) {
            setUploadStatus('Failed to upload image.');
            setIsSubmitting(false); 
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setUploadStatus('No authentication token found.');
                setIsSubmitting(false);
                return;
            }

            const decoded = jwtDecode(token);
            const userId = decoded.id;

            const formData = new FormData();
            formData.append('image', image);
            formData.append('author', author);
            formData.append('caption', caption);
            formData.append('userId', userId);

            const response = await axiosPlus.post(`/createPost`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) { 
                setUploadStatus('Post created successfully!');
                console.log(response.data);
                setImaged(null);
                setAuthor('');
                setCaption('');
                setTimeout(() => {
                    setIsSubmitting(false); 
                    navigate('/Home');
                }, 10000);
            } else {
                setUploadStatus(`Failed to create post: ${response.data.message}`);
                setIsSubmitting(false); 
            }
        } catch (err) {
            setUploadStatus(`Error creating post: ${err.message}`);
            console.error('Error creating post:', err);
            setIsSubmitting(false); 
        }
    };

    return (
        <div className="container mx-auto text-center pt-32 sm:pt-28 max-w-lg">
            <h1 className="text-2xl font-bold mb-6">Create Post</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
                <div className="mb-6">
                    <label htmlFor="image" className="block text-left mb-2 font-bold text-gray-700">Image</label>
                    <input 
                        type="file" 
                        id="image" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        onChange={handleImageChange} 
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="author" className="block text-left mb-2 font-bold text-gray-700">Author</label>
                    <input 
                        type="text" 
                        id="author" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value={author} 
                        onChange={handleAuthorChange} 
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="caption" className="block text-left mb-2 font-bold text-gray-700">Caption</label>
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
                    className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                {uploadStatus && <p className="mt-4 text-red-500">{uploadStatus}</p>}
            </form>
        </div>
    );
};

export default CreatePost;
