import React, { useEffect } from "react";
import ReactDom from "react-dom";

const Modal = ({ isOpen, onClose, onConfirm, message1, message2, button }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  });
  if (!isOpen) return null;

  return ReactDom.createPortal(
   <div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  tabIndex={-1}
  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
>
  <div className="bg-white rounded-2xl shadow-lg border border-gray-300 w-full max-w-md mx-4 p-6 relative transform transition-all duration-300 ease-in-out scale-100 animate-modal-scale-in">
    {/* Close button top right */}
    <button
      aria-label="Close modal"
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {/* Modal header */}
    <h2 id="modal-title" className="text-xl font-semibold mb-4 text-gray-800">
      {message1}
    </h2>

    {/* Modal description */}
    <p id="modal-description" className="mb-6 text-gray-600 text-base">
      {message2}
    </p>

    {/* Action buttons */}
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="px-4 py-2 rounded-md font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors duration-200"
      >
        {button}
      </button>
    </div>
  </div>

  <style>
    {`
      @media (max-width: 640px) {
        .max-w-md {
          max-width: 90vw;
          padding: 1.5rem;
        }
      }
      .animate-modal-scale-in {
        animation: modal-scale-in 0.22s cubic-bezier(.23, 1, .32, 1);
      }
      @keyframes modal-scale-in {
        0% {
          opacity: 0;
          transform: scale(0.95);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}
  </style>
</div>
,
    document.getElementById("modal-root")
  );
};

export default Modal;
