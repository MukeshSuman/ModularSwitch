import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ItemComponent from '../Item';
import { BoxProps } from '../../types';


const Box: React.FC<BoxProps> = ({
    box,
    onAddBox,
    boxes,
    onRemoveBox,
    onSelectItem,
    selectedItem,
    onRemoveItem,
    onAddItem
}) => {
    const sides = ['top', 'right', 'bottom', 'left'];

    const isOccupied = (side: string) => {
        const { x, y } = box;
        return boxes.some(otherBox => {
            if (otherBox.id === box.id) return false;
            switch (side) {
                case 'top':
                    return otherBox.x === x && otherBox.y === y - 226;
                case 'right':
                    return otherBox.x === x + 226 && otherBox.y === y;
                case 'bottom':
                    return otherBox.x === x && otherBox.y === y + 226;
                case 'left':
                    return otherBox.x === x - 226 && otherBox.y === y;
                default:
                    return false;
            }
        });
    };

    const remainingSpace = box.items.reduce((space, item) => space - (item.size === 'full' ? 2 : 1), 2);

    return (
        <div
            className="absolute flex flex-col items-center justify-center border border-gray-400"
            style={{
                width: '226px',
                height: '226px',
                left: `${box.x}px`,
                top: `${box.y}px`
            }}
        >
            {box.items.length === 0 && (
                <span className="text-lg font-bold mb-2">{box.label}</span>
            )}
            <div className={`w-full h-full flex flex-row testing-abc`} onClick={() => remainingSpace > 0 && onAddItem(box.id)}>
                {box.items.map((item, index) => (
                    <ItemComponent
                        key={index}
                        item={item}
                        onRemove={() => onRemoveItem(box.id, item)}
                        isSelected={selectedItem !== null && selectedItem.id === item.id}
                        onClick={() => {
                            // e.stopPropagation();
                            onSelectItem(item);
                        }}
                    />
                ))}
                {remainingSpace > 0 && (
                    <div className={`w-full ${remainingSpace === 2 ? 'h-full' : 'h-full'} flex items-center justify-center bg-gray-300 cursor-pointer`}>
                        <Plus size={24} color="gray" />
                    </div>
                )}
            </div>
            {sides.map(side => !isOccupied(side) && (
                <button
                    key={side}
                    className={`absolute ${side === 'top' || side === 'bottom' ? 'w-full h-8' : 'w-8 h-full'
                        } ${side === 'top' ? 'top-0' :
                            side === 'right' ? 'right-0' :
                                side === 'bottom' ? 'bottom-0' : 'left-0'
                        } flex items-center justify-center bg-blue-500 bg-opacity-0 hover:bg-opacity-75 transition-opacity`}
                    onClick={() => onAddBox(box, side)}
                >
                    <Plus size={24} color="white" />
                </button>
            ))}
            <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                onClick={() => onRemoveBox(box.id)}
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
};

export default Box;
