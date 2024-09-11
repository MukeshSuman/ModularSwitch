import React, { useState } from 'react';
import Box from '../Box';
import Modal from '../Modal';
import ComponentForm from '../SelectModuleForm';
import { BoxType, ItemType } from '../../types';
import { modularItems } from '../../constants';

const BoxSystem: React.FC = () => {
    const [boxes, setBoxes] = useState<BoxType[]>([
        { id: 1, x: 0, y: 0, label: 'Box 1', items: [] }
    ]);
    const [boxId, setBoxId] = useState<number>(1)
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleFormSubmit = (data: any) => {
        const selectItem = modularItems.find(item =>
            item.name === data.componentName
        );
        console.log('selectItem', selectItem)
        if(selectItem){
            addItem(boxId, {
                ...selectItem
            })
        }
        setIsModalOpen(false);
    };


    const addBox = (parentBox: BoxType, side: string) => {
        const newId = boxes.length + 1;
        let newX = parentBox.x;
        let newY = parentBox.y;

        switch (side) {
            case 'top':
                newY -= 226;
                break;
            case 'right':
                newX += 226;
                break;
            case 'bottom':
                newY += 226;
                break;
            case 'left':
                newX -= 226;
                break;
        }

        const newBox: BoxType = {
            id: newId,
            x: newX,
            y: newY,
            label: `Box ${newId}`,
            items: []
        };

        setBoxes([...boxes, newBox]);
    };

    const removeBox = (boxId: number) => {
        const boxToRemove = boxes.find(box => box.id === boxId);
        setBoxes(boxes.filter(box => box.id !== boxId));
        if (selectedItem && boxToRemove?.items.some(item => item.id === selectedItem.id)) {
            setSelectedItem(null);
        }
    };

    const selectItem = (item: ItemType) => {
        setSelectedItem(item);
    };

    const removeItem = (bId: number, item: ItemType) => {
        setBoxes(boxes.map(box =>
            box.id === bId
                ? { ...box, items: box.items.filter(i => i.id !== item.id) }
                : box
        ));
        if (selectedItem && selectedItem.id === item.id) {
            setSelectedItem(null);
        }
    };

    const addItem = (bId: number, newItem: ItemType) => {
        setBoxes(boxes.map(box => {
            if (box.id === bId) {
                const remainingSpace = box.items.reduce((space, item) => space - (item.size === 'full' ? 2 : 1), 2);
                if (remainingSpace > 0) {
                    const availableItems = modularItems.filter(item =>
                        item.size === 'full' ? remainingSpace === 2 : true
                    );
                    // const newItem: Item = { ...availableItems[Math.floor(Math.random() * availableItems.length)], id: Date.now() };
                    console.log('newItem', newItem)
                    return { ...box, items: [...box.items, newItem] };
                }
            }
            return box;
        }));
    };

    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add Component"
                size={'half'}
            >
                <ComponentForm onSubmit={handleFormSubmit} />
            </Modal>
            <div className={`relative w-full h-${isModalOpen ? '': 'screen'} overflow-auto`}>
                {boxes.map(box => (
                    <Box
                        key={box.id}
                        box={box}
                        onAddBox={addBox}
                        boxes={boxes}
                        onRemoveBox={removeBox}
                        onSelectItem={selectItem}
                        selectedItem={selectedItem}
                        onRemoveItem={removeItem}
                        onAddItem={(bId) => {
                            setBoxId(bId)
                            setIsModalOpen(true)
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoxSystem;
