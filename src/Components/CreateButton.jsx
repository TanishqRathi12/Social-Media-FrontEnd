import React from 'react';
import { Link } from 'react-router-dom';
import { HiPlus } from "react-icons/hi"; // Optional icon for better UX

const CreateButton = () => {
return (
    <Link to="/CreatePost">
        <button
            className="
                flex items-center gap-2
                bg-gradient-to-r from-blue-800 to-blue-700
                hover:from-blue-900 hover:to-blue-800
                text-white font-semibold
                py-2 px-5 rounded-lg shadow-md
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-900
                text-base
            "
        >
            <HiPlus size={20} />
            Create Post
        </button>
    </Link>
);
};

export default CreateButton;
