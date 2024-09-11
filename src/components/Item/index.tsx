import React from 'react';
import { X } from 'lucide-react';
import { ItemProps } from '../../types';


const ItemComponent: React.FC<ItemProps> = ({ item, onRemove, isSelected, onClick }) => {
    const itemStyle = item.size === 'full' ? 'w-full h-full' : 'w-full h-full'; //'w-1/2 h-full';

    return (
        <div
            className={`${itemStyle} flex items-center justify-center relative cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onClick={onClick}
        >
            <item.component />
          

            <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(item);
                }}
            >
                <X size={12} />
            </button>
        </div>
    );
};

export default ItemComponent;
