import React, { useState } from 'react';

const EditUser = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [bio, setBio] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.value);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to update the user here
    };

    return (
        <div className="container mx-auto text-center pt-32 sm:pt-28 max-w-lg">
            <h1 className="text-2xl font-bold mb-6">Edit User</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
                <div className="mb-6">
                    <label htmlFor="name" className="block text-left mb-2 font-bold text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="image" className="block text-left mb-2 font-bold text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        value={image}
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="bio" className="block text-left mb-2 font-bold text-gray-700">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={handleBioChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditUser;
