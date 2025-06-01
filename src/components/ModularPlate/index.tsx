"use client";
import React, { useState } from "react";
import { SwitchComponent } from "./SwitchComponent";
import { IndicatorComponent } from "./IndicatorComponent";
import { FourGangTouchComponent } from "./FourGangTouchComponent";
import { SocketComponent } from "./SocketComponent";
import { USBComponent } from "./USBComponent";
import { FanRegulatorComponent } from "./FanRegulatorComponent";
import { FanTouchSwitchComponent } from "./FanTouchSwitchComponent";
import { DoorBellTouchComponent } from "./DoorBellTouchComponent";
import { TwoGangTouchComponent } from "./TwoGangTouchComponent";
import { TwoWayTouchComponent } from "./TwoWayTouchComponent";
import { NetworkComponent } from "./NetworkComponent";
import { TVSocketComponent } from "./TVSocketComponent";

const plateConfigs: Record<string, { cols: number; rows: number; price: number }> = {
  "1": { cols: 1, rows: 1, price: 50 },
  "2H": { cols: 2, rows: 1, price: 80 },
  "3H": { cols: 3, rows: 1, price: 100 },
  "4H": { cols: 4, rows: 1, price: 120 },
  "6H": { cols: 3, rows: 2, price: 180 },
  "6V": { cols: 2, rows: 3, price: 180 },
  "8H": { cols: 4, rows: 2, price: 220 },
  "12H": { cols: 4, rows: 3, price: 300 },
  "16H": { cols: 4, rows: 4, price: 400 },
};

type ComponentType =
  | "Switch"
  | "Indicator"
  | "4GangTouch"
  | "2GangTouch"
  | "2WayTouch"
  | "Socket"
  | "USB"
  | "Fan"
  | "FanTouch"
  | "DoorBellTouch"
  | "Network"
  | "TV";

type ItemData = {
  type: ComponentType;
  size: "1M" | "2M";
};

type ComponentItem = ItemData & {
  label: string;
  component: React.ReactNode;
  price: number;
};

interface SlotData {
  left: ItemData | null;
  right: ItemData | null;
  full: ItemData | null;
}

const componentItems: ComponentItem[] = [
  {
    type: "Switch",
    size: "1M",
    label: "Switch",
    component: <SwitchComponent />,
    price: 100,
  },
  {
    type: "Indicator",
    size: "1M",
    label: "Indicator",
    component: <IndicatorComponent />,
    price: 50,
  },
  {
    type: "USB",
    size: "1M",
    label: "USB",
    component: <USBComponent />,
    price: 150,
  },
  {
    type: "Fan",
    size: "1M",
    label: "Fan Regulator",
    component: <FanRegulatorComponent />,
    price: 200,
  },
  {
    type: "TV",
    size: "1M",
    label: "TV Socket",
    component: <TVSocketComponent />,
    price: 120,
  },
  {
    type: "Network",
    size: "1M",
    label: "Network/RJ45 Socket",
    component: <NetworkComponent />,
    price: 130,
  },
  {
    type: "Socket",
    size: "2M",
    label: "Socket",
    component: <SocketComponent />,
    price: 180,
  },
  {
    type: "4GangTouch",
    size: "2M",
    label: "4 Gang Touch Switch",
    component: <FourGangTouchComponent />,
    price: 400,
  },
  {
    type: "2GangTouch",
    size: "2M",
    label: "2 Gang Touch Switch",
    component: <TwoGangTouchComponent />,
    price: 250,
  },
  {
    type: "2WayTouch",
    size: "2M",
    label: "2 Way Touch Switch",
    component: <TwoWayTouchComponent />,
    price: 260,
  },
  {
    type: "FanTouch",
    size: "2M",
    label: "Fan Touch",
    component: <FanTouchSwitchComponent />,
    price: 300,
  },
  {
    type: "DoorBellTouch",
    size: "2M",
    label: "Door Bell",
    component: <DoorBellTouchComponent />,
    price: 90,
  },
];

export default function ModularPlate() {
  const [plateSize, setPlateSize] = useState<keyof typeof plateConfigs>("8H");
  const [plates, setPlates] = useState<{
    name: string;
    slots: SlotData[];
    size: keyof typeof plateConfigs;
  }[]>(() => {
    const { cols, rows } = plateConfigs["8H"];
    return [
      {
        name: "Plate 1",
        slots: Array.from({ length: cols * rows }, () => ({ left: null, right: null, full: null })) as SlotData[],
        size: "8H" as keyof typeof plateConfigs,
      },
    ];
  });
  const [previewMode, setPreviewMode] = useState<"real" | "text">("real");
  const [editingPlateIdx, setEditingPlateIdx] = useState<number | null>(null);
  const [editingPlateName, setEditingPlateName] = useState<string>("");
  const [draggedPlateIdx, setDraggedPlateIdx] = useState<number | null>(null);
  const [dragOverPlateIdx, setDragOverPlateIdx] = useState<number | null>(null);

  const handlePlateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value as keyof typeof plateConfigs;
    setPlateSize(key);
    setPlates((prev) =>
      prev.map((plate) => {
        const { cols, rows } = plateConfigs[key];
        return {
          ...plate,
          size: key,
          slots: Array.from({ length: cols * rows }, () => ({ left: null, right: null, full: null })) as SlotData[],
        };
      })
    );
  };

  const handleDrop = (
    plateIdx: number,
    index: number,
    half: "left" | "right" | "full",
    item: ItemData
  ) => {
    setPlates((prev) => {
      const newPlates = [...prev];
      const plate = { ...newPlates[plateIdx] };
      const newSlots: SlotData[] = [...plate.slots];
      const current = newSlots[index] ?? { left: null, right: null, full: null };
      if (item.size === "2M" && half === "full") {
        if (!current.full && !current.left && !current.right) {
          newSlots[index] = { full: item, left: null, right: null };
        }
      } else if (item.size === "1M" && (half === "left" || half === "right")) {
        if (!current.full && !current[half]) {
          newSlots[index] = {
            ...current,
            [half]: item,
          };
        }
      }
      plate.slots = newSlots;
      newPlates[plateIdx] = plate;
      return newPlates;
    });
  };

  const renderItem = (item: ItemData) => {
    const match = componentItems.find(
      (c) => c.type === item.type && c.size === item.size
    );
    return match?.component || null;
  };

  const dragStart = (
    e: React.DragEvent,
    item: ItemData,
    plateIdx?: number,
    slotIdx?: number,
    half?: "left" | "right" | "full"
  ) => {
    e.dataTransfer.setData("type", item.type);
    e.dataTransfer.setData("size", item.size);
    if (plateIdx !== undefined) e.dataTransfer.setData("plateIdx", plateIdx.toString());
    if (slotIdx !== undefined) e.dataTransfer.setData("index", slotIdx.toString());
    if (half) e.dataTransfer.setData("half", half);
  };

  const addPlate = () => {
    const { cols, rows } = plateConfigs[plateSize];
    setPlates((prev) => [
      ...prev,
      {
        name: `Plate ${prev.length + 1}`,
        slots: Array.from({ length: cols * rows }, () => ({ left: null, right: null, full: null })) as SlotData[],
        size: plateSize,
      },
    ]);
  };

  const handleDeletePlate = (plateIdx: number) => {
    if (plates.length > 1) {
      if (window.confirm('Are you sure you want to delete this plate?')) {
        setPlates((prev) => prev.filter((_, idx) => idx !== plateIdx));
      }
    }
  };

  const handleStartEditName = (plateIdx: number, currentName: string) => {
    setEditingPlateIdx(plateIdx);
    setEditingPlateName(currentName);
  };

  const handleSavePlateName = (plateIdx: number) => {
    setPlates((prev) => prev.map((plate, idx) => idx === plateIdx ? { ...plate, name: editingPlateName } : plate));
    setEditingPlateIdx(null);
    setEditingPlateName("");
  };

  const handlePlateSizeChange = (plateIdx: number, newSize: keyof typeof plateConfigs) => {
    const { cols, rows } = plateConfigs[newSize];
    setPlates((prev) => prev.map((plate, idx) => idx === plateIdx
      ? {
          ...plate,
          size: newSize,
          slots: Array.from({ length: cols * rows }, () => ({ left: null, right: null, full: null })) as SlotData[],
        }
      : plate
    ));
  };

  return (
    <div className="text-center bg-[#d9d9d9] font-sans p-[1cm] min-h-screen">
      <h2 className="text-xl font-semibold mb-4">
        Modular Plate UI – All Components
      </h2>

      <select
        value={plateSize}
        onChange={handlePlateChange}
        className="text-base px-4 py-2 mb-6 rounded border"
      >
        {Object.keys(plateConfigs).map((key) => (
          <option key={key} value={key}>
            {key.includes("H") ? "Horizontal" : "Vertical"} {key} (
            {plateConfigs[key].cols} × {plateConfigs[key].rows})
          </option>
        ))}
      </select>

      <div className="flex flex-row justify-center items-start gap-12 mb-12">
        {/* Left: Components Palette */}
        <div
          className="flex flex-col items-center flex-shrink-0"
          style={{ flexBasis: "35%", maxWidth: "35%" }}
        >
          <h3 className="text-sm text-gray-500 mb-4">
            Switch/Socket Components
          </h3>
          <div className="mb-4 flex gap-2">
            <button
              className={`px-3 py-1 rounded ${
                previewMode === "real"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setPreviewMode("real")}
            >
              Real View
            </button>
            <button
              className={`px-3 py-1 rounded ${
                previewMode === "text"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setPreviewMode("text")}
            >
              Text View
            </button>
          </div>

          {previewMode === "real" ? (
            <div className="flex justify-center gap-8 flex-wrap mb-8">
              {componentItems.map((item, i) => (
                <div
                  key={i}
                  className={`border border-gray-500 rounded-lg shadow cursor-grab flex items-center justify-center ${
                    item.size === "2M"
                      ? "w-[4.4cm] h-[4.5cm]"
                      : "w-[2.2cm] h-[4.5cm]"
                  }`}
                  draggable
                  onDragStart={(e) => dragStart(e, item)}
                >
                  {item.component}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {componentItems.map((item, i) => (
                <button
                  key={i}
                  className="bg-blue-500 text-white font-semibold rounded-md py-3 px-4 shadow"
                  draggable
                  onDragStart={(e) => dragStart(e, item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Right: Modular Plates */}
        <div
          className="bg-gray-100 p-8 rounded-3xl"
          style={{ minWidth: "fit-content" }}
        >
          {plates.map((plate, plateIdx) => {
            const cols = plateConfigs[plate.size].cols;
            return (
              <div
                key={plateIdx}
                className={`mb-12 transition-all duration-200 ${dragOverPlateIdx === plateIdx ? 'ring-4 ring-blue-400' : ''}`}
                draggable
                onDragStart={() => setDraggedPlateIdx(plateIdx)}
                onDragOver={e => {
                  e.preventDefault();
                  if (draggedPlateIdx !== null && draggedPlateIdx !== plateIdx) setDragOverPlateIdx(plateIdx);
                }}
                onDragLeave={() => setDragOverPlateIdx(null)}
                onDrop={() => {
                  if (draggedPlateIdx !== null && draggedPlateIdx !== plateIdx) {
                    setPlates(prev => {
                      const newPlates = [...prev];
                      const [removed] = newPlates.splice(draggedPlateIdx, 1);
                      newPlates.splice(plateIdx, 0, removed);
                      return newPlates;
                    });
                  }
                  setDragOverPlateIdx(null);
                  setDraggedPlateIdx(null);
                }}
                onDragEnd={() => {
                  setDragOverPlateIdx(null);
                  setDraggedPlateIdx(null);
                }}
              >
                <div className="mt-4 mb-4 flex items-center justify-center gap-4">
                  {/* Plate name editing */}
                  {editingPlateIdx === plateIdx ? (
                    <input
                      className="text-2xl font-bold text-center border-b border-gray-400 bg-white px-2 py-1 w-48"
                      value={editingPlateName}
                      onChange={e => setEditingPlateName(e.target.value)}
                      onBlur={() => handleSavePlateName(plateIdx)}
                      onKeyDown={e => { if (e.key === 'Enter') handleSavePlateName(plateIdx); }}
                      autoFocus
                    />
                  ) : (
                    <span
                      className="text-2xl font-bold cursor-pointer hover:underline"
                      onClick={() => handleStartEditName(plateIdx, plate.name)}
                    >
                      {plate.name}
                    </span>
                  )}
                  {/* Plate size select */}
                  <select
                    className="ml-2 px-2 py-1 rounded border text-base"
                    value={plate.size}
                    onChange={e => handlePlateSizeChange(plateIdx, e.target.value as keyof typeof plateConfigs)}
                  >
                    {Object.keys(plateConfigs).map((key) => (
                      <option key={key} value={key}>
                        {key.includes("H") ? "Horizontal" : "Vertical"} {key} (
                        {plateConfigs[key].cols} × {plateConfigs[key].rows})
                      </option>
                    ))}
                  </select>
                  {/* Delete plate button */}
                  <button
                    className="ml-2 px-2 py-1 rounded bg-red-500 text-white font-bold hover:bg-red-600 disabled:opacity-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePlate(plateIdx);
                    }}
                    disabled={plates.length === 1}
                    title={plates.length === 1 ? 'At least one plate required' : 'Delete plate'}
                  >
                    🗑️
                  </button>
                </div>
                <div
                  className="grid gap-2 bg-white p-4 rounded-3xl shadow-xl mx-auto"
                  style={{ gridTemplateColumns: `repeat(${cols}, 4.4cm)` }}
                >
                  {plate.slots.map((slot, index) => (
                    <div
                      key={index}
                      className="relative w-[4.4cm] h-[4.5cm] bg-gray-50 border border-gray-300 rounded-xl flex flex-row justify-between"
                    >
                      {slot.full ? (
                        <div
                          className="absolute w-full h-full bg-gray-100 rounded-xl flex items-center justify-center cursor-grab z-10"
                          draggable
                          onDragStart={(e) => {
                            dragStart(e, slot.full!, plateIdx, index, "full");
                          }}
                        >
                          {renderItem(slot.full)}
                        </div>
                      ) : (
                        <>
                          {(["left", "right"] as const).map((side) => (
                            <div
                              key={side}
                              className={`w-1/2 h-full flex items-center justify-center relative ${
                                side === "left"
                                  ? "border-r border-gray-200"
                                  : "border-l border-gray-200"
                              }`}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                const type = e.dataTransfer.getData("type") as ComponentType;
                                const size = e.dataTransfer.getData("size") as "1M" | "2M";
                                if (size === "1M") {
                                  handleDrop(plateIdx, index, side, { type, size });
                                } else if (size === "2M") {
                                  handleDrop(plateIdx, index, "full", { type, size });
                                }
                              }}
                            >
                              <div
                                className="w-full h-full flex items-center justify-center cursor-grab"
                                draggable={!!slot[side]}
                                onDragStart={(e) => {
                                  if (slot[side]) {
                                    dragStart(e, slot[side]!, plateIdx, index, side);
                                  }
                                }}
                              >
                                {slot[side] && renderItem(slot[side]!)}
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="mt-4 mb-4">
            <button
              className="px-6 py-2 rounded bg-green-500 text-white font-bold hover:bg-green-600"
              onClick={addPlate}
            >
              + Add More Plate
            </button>
          </div>
          {/* Trash Area */}
          <div
            className="mt-8 p-4 border-2 border-dashed border-gray-500 bg-white text-gray-800 font-bold text-center rounded-lg w-[300px] mx-auto hover:bg-red-100 transition-all duration-300"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const plateIdx = parseInt(e.dataTransfer.getData("plateIdx"));
              const index = parseInt(e.dataTransfer.getData("index"));
              const half = e.dataTransfer.getData("half") as "left" | "right" | "full";
              setPlates((prev) => {
                const newPlates = [...prev];
                const plate = { ...newPlates[plateIdx] };
                const newSlots: SlotData[] = [...plate.slots];
                if (half === "full") newSlots[index].full = null;
                else newSlots[index][half] = null;
                plate.slots = newSlots;
                newPlates[plateIdx] = plate;
                return newPlates;
              });
            }}
          >
            🗑️ Drag here to remove
          </div>
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Plate-wise Item List & Pricing</h3>
            {plates.map((plate, plateIdx) => {
              // Count items in this plate
              const itemCount: Record<string, { label: string; price: number; qty: number }> = {};
              plate.slots.forEach(slot => {
                if (slot.full) {
                  const key = slot.full.type + "-" + slot.full.size;
                  const item = componentItems.find(i => i.type === slot.full!.type && i.size === slot.full!.size);
                  if (item) {
                    if (!itemCount[key]) itemCount[key] = { label: item.label, price: item.price, qty: 0 };
                    itemCount[key].qty += 1;
                  }
                } else {
                  ["left", "right"].forEach(side => {
                    const s = slot[side as "left" | "right"];
                    if (s) {
                      const key = s.type + "-" + s.size;
                      const item = componentItems.find(i => i.type === s.type && i.size === s.size);
                      if (item) {
                        if (!itemCount[key]) itemCount[key] = { label: item.label, price: item.price, qty: 0 };
                        itemCount[key].qty += 1;
                      }
                    }
                  });
                }
              });
              const platePrice = plateConfigs[plate.size]?.price || 0;
              const subtotal = Object.values(itemCount).reduce((sum, v) => sum + v.price * v.qty, 0) + platePrice;
              return (
                <div key={plateIdx} className="mb-8">
                  <div className="font-semibold text-lg mb-2">{plate.name}</div>
                  <table className="w-full text-left border mb-2">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-1 px-2">Item</th>
                        <th className="py-1 px-2">Qty</th>
                        <th className="py-1 px-2">Price</th>
                        <th className="py-1 px-2">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(itemCount).map((v, i) => (
                        <tr key={i}>
                          <td className="py-1 px-2">{v.label}</td>
                          <td className="py-1 px-2">{v.qty}</td>
                          <td className="py-1 px-2">₹{v.price}</td>
                          <td className="py-1 px-2">₹{v.price * v.qty}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-semibold">
                        <td className="py-1 px-2">Plate ({plate.size})</td>
                        <td className="py-1 px-2">1</td>
                        <td className="py-1 px-2">₹{platePrice}</td>
                        <td className="py-1 px-2">₹{platePrice}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-right font-bold">Subtotal: ₹{subtotal}</div>
                </div>
              );
            })}
            <div className="text-right text-xl font-bold border-t pt-4">Grand Total: ₹{
              plates.reduce((grand, plate) => {
                // recalc subtotal for each plate
                const itemCount: Record<string, { label: string; price: number; qty: number }> = {};
                plate.slots.forEach(slot => {
                  if (slot.full) {
                    const key = slot.full.type + "-" + slot.full.size;
                    const item = componentItems.find(i => i.type === slot.full!.type && i.size === slot.full!.size);
                    if (item) {
                      if (!itemCount[key]) itemCount[key] = { label: item.label, price: item.price, qty: 0 };
                      itemCount[key].qty += 1;
                    }
                  } else {
                    ["left", "right"].forEach(side => {
                      const s = slot[side as "left" | "right"];
                      if (s) {
                        const key = s.type + "-" + s.size;
                        const item = componentItems.find(i => i.type === s.type && i.size === s.size);
                        if (item) {
                          if (!itemCount[key]) itemCount[key] = { label: item.label, price: item.price, qty: 0 };
                          itemCount[key].qty += 1;
                        }
                      }
                    });
                  }
                });
                const platePrice = plateConfigs[plate.size]?.price || 0;
                return grand + Object.values(itemCount).reduce((sum, v) => sum + v.price * v.qty, 0) + platePrice;
              }, 0)
            }</div>
          </div>
        </div>
      </div>
    </div>
  );
}
