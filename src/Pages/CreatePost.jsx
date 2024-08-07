import React, { useState } from 'react';

const CreatePost = () => {
    const [image, setImage] = useState(null);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
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
                    <label htmlFor="content" className="block text-left mb-2 font-bold text-gray-700">Content</label>
                    <textarea 
                        id="content" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value={content} 
                        onChange={handleContentChange} 
                        rows="4"
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
