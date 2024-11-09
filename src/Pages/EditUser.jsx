import React, { useState } from 'react';
import axios from "axios";
import axiosPlus from "../Components/axios";
import {jwtDecode} from 'jwt-decode';  
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
    const [username, setUsername] = useState('');
    const [image, setImage] = useState(null);
    const [Bio, setBio] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const navigate = useNavigate();

    const uploadImage = async () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'MyCloud');
        data.append('cloud_name', 'divlsorxk');
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/divlsorxk/image/upload', data);
            console.log(response.data.url);
            return response.data.url;
        } catch (err) {
            console.log(err.message);
            throw new Error('Image upload failed');
        }
    };

    const handleNameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true); 

        let ProfilePicture = null;
        if (image) {
            try {
                ProfilePicture = await uploadImage();
            } catch (err) {
                setError('Failed to upload image');
                setIsSubmitting(false); 
                return;
            }
        }

        const formData = new FormData();
        formData.append('username', username);
        if (ProfilePicture) {
            formData.append('ProfilePicture', ProfilePicture);
        }
        formData.append('Bio', Bio);

        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const userId = decoded.id;

            const response = await axiosPlus.put(`/updateUser/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsername('');
            setImage(null);
            setBio('');
            setError('');
            setTimeout(() => {
                setIsSubmitting(false); 
                navigate('/profile');
            }, 1000);
        } catch (err) {
            console.log(err.message);
            setError('Failed to update user. Please try again.');
            setIsSubmitting(false); 
        }
    };

    return (
        <div className="container mx-auto text-center pt-32 sm:pt-28 max-w-lg">
            <h1 className="text-2xl font-bold mb-6">Edit User</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-6">
                    <label htmlFor="name" className="block text-left mb-2 font-bold text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={username}
                        onChange={handleNameChange}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="image" className="block text-left mb-2 font-bold text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="bio" className="block text-left mb-2 font-bold text-gray-700">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        value={Bio}
                        onChange={handleBioChange}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                        rows="4"
                        disabled={isSubmitting}
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default EditUser;
