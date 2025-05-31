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

const plateConfigs: Record<string, { cols: number; rows: number }> = {
  "1": { cols: 1, rows: 1 },
  "2H": { cols: 2, rows: 1 },
  "3H": { cols: 3, rows: 1 },
  "4H": { cols: 4, rows: 1 },
  "6H": { cols: 3, rows: 2 },
  "6V": { cols: 2, rows: 3 },
  "8H": { cols: 4, rows: 2 },
  "12H": { cols: 4, rows: 3 },
  "16H": { cols: 4, rows: 4 },
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
  },
  {
    type: "Indicator",
    size: "1M",
    label: "Indicator",
    component: <IndicatorComponent />,
  },
  {
    type: "USB",
    size: "1M",
    label: "USB",
    component: <USBComponent />,
  },
  {
    type: "Fan",
    size: "1M",
    label: "Fan Regulator",
    component: <FanRegulatorComponent />,
  },
    {
    type: "TV",
    size: "1M",
    label: "TV Socket",
    component: <TVSocketComponent />,
  },
    {
    type: "Network",
    size: "1M",
    label: "Network/RJ45 Socket",
    component: <NetworkComponent />,
  },
  {
    type: "Socket",
    size: "2M",
    label: "Socket",
    component: <SocketComponent />,
  },
  {
    type: "4GangTouch",
    size: "2M",
    label: "4 Gang Touch Switch",
    component: <FourGangTouchComponent />,
  },
  {
    type: "2GangTouch",
    size: "2M",
    label: "2 Gang Touch Switch",
    component: <TwoGangTouchComponent />,
  },
  {
    type: "2WayTouch",
    size: "2M",
    label: "2 Way Touch Switch",
    component: <TwoWayTouchComponent />,
  },
  {
    type: "FanTouch",
    size: "2M",
    label: "Fan Touch",
    component: <FanTouchSwitchComponent />,
  },
  {
    type: "DoorBellTouch",
    size: "2M",
    label: "Door Bell",
    component: <DoorBellTouchComponent />,
  }
];

export default function ModularPlate() {
  const [plateSize, setPlateSize] = useState<keyof typeof plateConfigs>("8H");
  const [slots, setSlots] = useState<SlotData[]>(() => {
    const { cols, rows } = plateConfigs["8H"];
    return Array(cols * rows)
      .fill(null)
      .map(() => ({
        left: null,
        right: null,
        full: null,
      }));
  });
  const [previewMode, setPreviewMode] = useState<"real" | "text">("real");

  const handlePlateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value as keyof typeof plateConfigs;
    const { cols, rows } = plateConfigs[key];
    setPlateSize(key);
    setSlots(
      Array(cols * rows)
        .fill(null)
        .map(() => ({
          left: null,
          right: null,
          full: null,
        }))
    );
  };

  const handleDrop = (
    index: number,
    half: "left" | "right" | "full",
    item: ItemData
  ) => {
    setSlots((prev) => {
      const newSlots = [...prev];
      const current = newSlots[index];

      if (item.size === "2M" && half === "full") {
        if (!current.full && !current.left && !current.right) {
          newSlots[index] = { full: item, left: null, right: null };
        }
      } else if (item.size === "1M" && (half === "left" || half === "right")) {
        if (!current.full && !current[half]) {
          newSlots[index] = { ...current, [half]: item };
        }
      }

      return newSlots;
    });
  };

  const renderItem = (item: ItemData) => {
    const match = componentItems.find(
      (c) => c.type === item.type && c.size === item.size
    );
    return match?.component || null;
  };

  const dragStart = (e: React.DragEvent, item: ItemData) => {
    e.dataTransfer.setData("type", item.type);
    e.dataTransfer.setData("size", item.size);
  };

  const cols = plateConfigs[plateSize].cols;

  const groupIntoRows = (items: ComponentItem[]): ComponentItem[][] => {
    const rows: ComponentItem[][] = [];
    let currentRow: ComponentItem[] = [];
    let currentWidth = 0;

    for (const item of items) {
      const size = item.size === "2M" ? 2 : 1;
      if (currentWidth + size > 4) {
        rows.push(currentRow);
        currentRow = [item];
        currentWidth = size;
      } else {
        currentRow.push(item);
        currentWidth += size;
      }
    }

    if (currentRow.length > 0) rows.push(currentRow);
    return rows;
  };

  const groupedRows = groupIntoRows(componentItems);

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
          <div className="mb-4 flex gap-2">
            <button
              className={`px-3 py-1 rounded ${previewMode === "real" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setPreviewMode("real")}
            >
              Real View
            </button>
            <button
              className={`px-3 py-1 rounded ${previewMode === "text" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
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
                    item.size === "2M" ? "w-[4.4cm] h-[4.5cm]" : "w-[2.2cm] h-[4.5cm]"
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
        {/* Right: Modular Plate */}
        <div
          className="bg-gray-100 p-8 rounded-3xl"
          style={{ minWidth: "fit-content" }}
        >
          <div
            className="grid gap-2 bg-white p-4 rounded-3xl shadow-xl mx-auto"
            style={{ gridTemplateColumns: `repeat(${cols}, 4.4cm)` }}
          >
            {slots.map((slot, index) => (
              <div
                key={index}
                className="relative w-[4.4cm] h-[4.5cm] bg-gray-50 border border-gray-300 rounded-xl flex flex-row justify-between"
              >
                {slot.full ? (
                  <div
                    className="absolute w-full h-full bg-gray-100 rounded-xl flex items-center justify-center cursor-grab z-10"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("index", index.toString());
                      e.dataTransfer.setData("half", "full");
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
                          const type = e.dataTransfer.getData(
                            "type"
                          ) as ComponentType;
                          const size = e.dataTransfer.getData("size") as
                            | "1M"
                            | "2M";
                          if (size === "1M") {
                            handleDrop(index, side, { type, size });
                          } else if (size === "2M") {
                            handleDrop(index, "full", { type, size });
                          }
                        }}
                      >
                        <div
                          className="w-full h-full flex items-center justify-center cursor-grab"
                          draggable={!!slot[side]}
                          onDragStart={(e) => {
                            e.dataTransfer.setData("index", index.toString());
                            e.dataTransfer.setData("half", side);
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
      </div>

      {/* Trash Area */}
      <div
        className="mt-8 p-4 border-2 border-dashed border-gray-500 bg-white text-gray-800 font-bold text-center rounded-lg w-[300px] mx-auto hover:bg-red-100 transition-all duration-300"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const index = parseInt(e.dataTransfer.getData("index"));
          const half = e.dataTransfer.getData("half") as
            | "left"
            | "right"
            | "full";
          setSlots((prev) => {
            const newSlots = [...prev];
            if (half === "full") newSlots[index].full = null;
            else newSlots[index][half] = null;
            return newSlots;
          });
        }}
      >
        🗑️ Drag here to remove
      </div>
    </div>
  );
}
