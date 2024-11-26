import React, { useEffect } from 'react';
import ReactDom from "react-dom"

const Modal = ({ isOpen, onClose, onConfirm, message1,message2 }) => {
    useEffect(()=>{
        // console.log("working")
        if(isOpen){
            document.body.style.overflow = "hidden";
        }
        else{
            document.body.style.overflow = "auto";
        }
        return ()=>{
            document.body.style.overflow = "auto";
        };
    })
    if (!isOpen) return null;

    return ReactDom.createPortal (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300 ease-in-out">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96 transform transition-all duration-300 ease-in-out scale-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{message1}</h2>
                <p className="mb-6 text-gray-600">
                    {message2}
                </p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200 ease-in-out mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 ease-in-out"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default Modal;
