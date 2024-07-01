// Modal.js
import React from 'react';

const Modal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Confirm Delete</h2>
          <button onClick={onClose} className="text-black">✖️</button>
        </div>
        <p className="mt-4">Are you sure you want to delete this post?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded shadow mr-2">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-black text-white rounded shadow">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
