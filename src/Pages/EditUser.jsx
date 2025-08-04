import { useState } from 'react';
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

            await axiosPlus.put(`/updateUser/${userId}`, formData, {
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
        <div className="min-h-screen bg-slate-900 p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto text-center pt-16 sm:pt-20 max-w-lg">

                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Edit Profile</h1>
                    <p className="text-slate-400 text-lg">Update your profile information</p>
                </div>


                <form 
                    onSubmit={handleSubmit} 
                    className="bg-slate-800/90 backdrop-blur-sm p-6 sm:p-8 shadow-2xl rounded-2xl border border-slate-700/50"
                >

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400">
                            <p className="font-medium">{error}</p>
                        </div>
                    )}


                    <div className="mb-8">
                        <label 
                            htmlFor="name" 
                            className="flex items-center justify-start text-white font-semibold text-lg mb-4"
                        >
                            <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Username
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={username}
                            onChange={handleNameChange}
                            className={`w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                                isSubmitting ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                            placeholder="Enter your username"
                            disabled={isSubmitting}
                        />
                    </div>


                    <div className="mb-8">
                        <label 
                            htmlFor="image" 
                            className="flex items-center justify-start text-white font-semibold text-lg mb-4"
                        >
                            <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Profile Picture
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                id="image"
                                className="hidden"
                                onChange={handleImageChange}
                                accept="image/*"
                                disabled={isSubmitting}
                            />
                            <label
                                htmlFor="image"
                                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-slate-700/30 transition-all duration-300 group ${
                                    isSubmitting ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                            >
                                <svg className="w-10 h-10 text-slate-500 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="text-slate-400 group-hover:text-purple-300 transition-colors mt-2">
                                    {image ? image.name : "Click to upload profile picture"}
                                </p>
                            </label>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label 
                            htmlFor="bio" 
                            className="flex items-center justify-start text-white font-semibold text-lg mb-4"
                        >
                            <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            value={Bio}
                            onChange={handleBioChange}
                            className={`w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none ${
                                isSubmitting ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                            rows="4"
                            placeholder="Tell us about yourself..."
                            disabled={isSubmitting}
                        />
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
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Save Changes
                            </div>
                        )}
                    </button>
                </form>
            </div>  
        </div>
    );
};

export default EditUser;