import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
  
  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-full">
          <div className="flex justify-end">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };
  
  interface SwitchboardItemProps {
    label: string;
    isOn: boolean;
    size: 'full' | 'half';
    onToggle: () => void;
    onRemove: () => void;
  }
  
  const SwitchboardItem: React.FC<SwitchboardItemProps> = ({ label, isOn, size, onToggle, onRemove }) => (
    <div className={`bg-white rounded-lg p-4 shadow-md flex flex-col items-center space-y-2 relative ${size === 'full' ? 'w-full h-full' : 'w-1/2 h-full'}`}>
      <button 
        className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
      >
        <X size={16} />
      </button>
      <div className="font-bold">{label}</div>
      <div 
        className={`w-12 h-6 rounded-full ${isOn ? 'bg-black' : 'bg-gray-300'} flex items-center ${isOn ? 'justify-end' : 'justify-start'} cursor-pointer`}
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
      >
        <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 mx-0.5"></div>
      </div>
      {isOn && <div className="text-xs">ON</div>}
      {label === 'ANCHOR' && <div className="text-xs">Uno</div>}
      {label === 'ANCHOR' && <div className="text-xs mt-1">↓</div>}
      {label === 'ANCHOR' && <div className="text-xs">C6</div>}
    </div>
  );
  
  interface BoxItem {
    label: string;
    size: 'full' | 'half';
    isOn: boolean;
  }
  
  interface Box {
    id: number;
    x: number;
    y: number;
    items: BoxItem[];
  }

const TailwindModalBoxSystem: React.FC = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    { id: 1, x: 0, y: 0, items: [] }
  ]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBoxId, setSelectedBoxId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const addBox = (parentId: number, direction: 'left' | 'right' | 'top' | 'bottom') => {
    const parentBox = boxes.find(box => box.id === parentId);
    if (!parentBox) return;

    let newX = parentBox.x;
    let newY = parentBox.y;

    switch (direction) {
      case 'left':
        newX -= 226;
        break;
      case 'right':
        newX += 226;
        break;
      case 'top':
        newY -= 226;
        break;
      case 'bottom':
        newY += 226;
        break;
    }

    const newBox: Box = {
      id: boxes.length + 1,
      x: newX,
      y: newY,
      items: []
    };

    setBoxes([...boxes, newBox]);
  };

  const removeBox = (boxId: number) => {
    setBoxes(boxes.filter(box => box.id !== boxId));
  };

  const isOccupied = (x: number, y: number): boolean => {
    return boxes.some(box => box.x === x && box.y === y);
  };

  const openModal = (boxId: number) => {
    const box = boxes.find(b => b.id === boxId);
    if (box && (box.items.length === 0 || (box.items.length === 1 && box.items[0].size === 'half'))) {
      setSelectedBoxId(boxId);
      setIsModalOpen(true);
    }
  };

  const addItemToBox = (item: Omit<BoxItem, 'isOn'>) => {
    setBoxes(boxes.map(box => {
      if (box.id === selectedBoxId) {
        if (box.items.length === 0) {
          return { ...box, items: [{ ...item, isOn: false }] };
        } else if (box.items.length === 1 && box.items[0].size === 'half' && item.size === 'half') {
          return { ...box, items: [...box.items, { ...item, isOn: false }] };
        }
      }
      return box;
    }));
    setIsModalOpen(false);
  };

  const toggleItem = (boxId: number, itemIndex: number) => {
    setBoxes(boxes.map(box => 
      box.id === boxId 
        ? {
            ...box,
            items: box.items.map((item, index) => 
              index === itemIndex ? { ...item, isOn: !item.isOn } : item
            )
          }
        : box
    ));
  };

  const removeItem = (boxId: number, itemIndex: number) => {
    setBoxes(boxes.map(box => 
      box.id === boxId 
        ? {
            ...box,
            items: box.items.filter((_, index) => index !== itemIndex)
          }
        : box
    ));
  };

  const centerX = containerSize.width / 2 - 113; // 113 is half of the box width (226/2)
  const centerY = containerSize.height / 2 - 113; // 113 is half of the box height (226/2)

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center overflow-hidden">
      <div ref={containerRef} className="relative w-3/4 h-3/4 border border-gray-300 overflow-auto">
        {boxes.map(box => (
          <div
            key={box.id}
            className="absolute border-2 border-gray-400 bg-white"
            style={{
              width: '226px',
              height: '226px',
              left: `${centerX + box.x}px`,
              top: `${centerY + box.y}px`
            }}
            onClick={() => openModal(box.id)}
          >
          <button 
          className="absolute -top-6 right-0 bg-red-500 text-white px-2 py-1 rounded-t"
          onClick={(e) => { e.stopPropagation(); removeBox(box.id); }}
        >
          Remove Box
        </button>
        <div className="p-2 h-full flex flex-row justify-center items-center">
          {box.items.length === 0 ? (
            <div className="text-gray-400">Click to add items</div>
          ) : (
            box.items.map((item, index) => (
              <SwitchboardItem 
                key={index}
                label={item.label}
                isOn={item.isOn}
                size={item.size}
                onToggle={() => toggleItem(box.id, index)}
                onRemove={() => removeItem(box.id, index)}
              />
            ))
          )}
        </div>
        {!isOccupied(box.x - 226, box.y) && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full bg-blue-500 text-white px-2 py-1"
            onClick={(e) => { e.stopPropagation(); addBox(box.id, 'left'); }}
          >
            +
          </button>
        )}
        {!isOccupied(box.x + 226, box.y) && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full bg-blue-500 text-white px-2 py-1"
            onClick={(e) => { e.stopPropagation(); addBox(box.id, 'right'); }}
          >
            +
          </button>
        )}
        {!isOccupied(box.x, box.y - 226) && (
          <button
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-blue-500 text-white px-2 py-1"
            onClick={(e) => { e.stopPropagation(); addBox(box.id, 'top'); }}
          >
            +
          </button>
        )}
        {!isOccupied(box.x, box.y + 226) && (
          <button
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-blue-500 text-white px-2 py-1"
            onClick={(e) => { e.stopPropagation(); addBox(box.id, 'bottom'); }}
          >
            +
          </button>
        )}
          </div>
        ))}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Add Item to Box</h2>
        <p className="mb-4">Choose an item to add to this box.</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button className="p-2 bg-blue-500 text-white rounded" onClick={() => addItemToBox({ label: 'ANCHOR', size: 'full' })}>ANCHOR (Full)</button>
          <button className="p-2 bg-green-500 text-white rounded" onClick={() => addItemToBox({ label: 'FLOAT', size: 'full' })}>FLOAT (Full)</button>
          <button className="p-2 bg-blue-300 text-white rounded" onClick={() => addItemToBox({ label: 'ANCHOR', size: 'half' })}>ANCHOR (Half)</button>
          <button className="p-2 bg-green-300 text-white rounded" onClick={() => addItemToBox({ label: 'FLOAT', size: 'half' })}>FLOAT (Half)</button>
        </div>
        <button className="w-full p-2 bg-gray-300 text-gray-700 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </Modal>
      </div>
    </div>
  );
};

export default TailwindModalBoxSystem;
