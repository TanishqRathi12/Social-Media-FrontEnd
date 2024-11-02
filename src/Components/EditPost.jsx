import React from "react";
import { Link } from "react-router-dom";

const EditButton = ({id}) => {
    return (
        <Link to="/EditPost" state={{id}}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
            Edit Post
        </button>
        </Link>
    );
}

export default EditButton;