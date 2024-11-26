import React, { useState } from "react";
import axios from "../Components/axios";
import Modal from "./Model";
import { useNavigate } from "react-router-dom";

const DeleteButton = ({ id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error('User not logged in');
        }

        try {
            const response = await axios.delete(`/deletePost/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                //console.log('Post deleted successfully');
                navigate('/');
            } else {
                console.error('Failed to delete the post:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting the post:', error);
        } finally {
            setIsModalOpen(false); 
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded transition duration-200 ease-in-out"
            >
                Delete
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                message2={"Are you sure you want to delete this post? This action cannot be undone."}
                message1={"Confirm Deletion"}
                button={"Delete"}
            />
        </>
    );
};

export default DeleteButton;
