import React, { useState, ReactNode } from 'react';

type ModalSize = 'full' | 'half';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: ModalSize;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'half' }) => {
  if (!isOpen) return null;

  const sizeClasses: Record<ModalSize, string> = {
    full: 'w-full max-w-4xl',
    half: 'w-full max-w-xl',
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <div className={`relative top-20 mx-auto p-5 border shadow-lg rounded-md bg-white ${sizeClasses[size]}`}
           onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{title}</h3>
          <div className="mt-2 px-7 py-3">
            {children}
          </div>
          <div className="mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;