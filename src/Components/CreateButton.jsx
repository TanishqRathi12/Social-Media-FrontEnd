import React from 'react';
import { Link } from 'react-router-dom';

const CreateButton = () => {
    return (
        <>
        <Link to="/CreatePost">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Post
        </button>
        </Link>
        </>
    );
};

export default CreateButton;