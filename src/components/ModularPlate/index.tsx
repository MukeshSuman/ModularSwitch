"use client";
import React, { useState } from "react";
import { SwitchComponent } from "./SwitchComponent";
import { IndicatorComponent } from "./IndicatorComponent";
import { TouchComponent } from "./TouchComponent";
import { SocketComponent } from "./SocketComponent";
import { USBComponent } from "./USBComponent";
import { FanRegulatorComponent } from "./FanRegulatorComponent";
import { FanTouchSwitchComponent } from "./FanTouchSwitchComponent";
import { DoorBellTouchComponent } from "./DoorBellTouchComponent";

const plateConfigs = {
  "4H": { cols: 2, rows: 2 },
  "6H": { cols: 3, rows: 2 },
  "8H": { cols: 4, rows: 2 },
};

type ComponentType =
  | "Switch"
  | "Indicator"
  | "Touch"
  | "Socket"
  | "USB"
  | "Fan"
  | "FanTouch"
  | "DoorBellTouch";

type ItemData = {
  type: ComponentType;
  size: "1M" | "2M";
};

interface SlotData {
  left: ItemData | null;
  right: ItemData | null;
  full: ItemData | null;
}

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
    switch (item.type) {
      case "Switch":
        return <SwitchComponent />;
      case "Indicator":
        return <IndicatorComponent />;
      case "Touch":
        return <TouchComponent />;
      case "Socket":
        return <SocketComponent />;
      case "USB":
        return <USBComponent />;
      case "Fan":
        return <FanRegulatorComponent />;
      case "FanTouch":
        return <FanTouchSwitchComponent />;
      case "DoorBellTouch":
        return <DoorBellTouchComponent />;
    }
  };

  const dragStart = (e: React.DragEvent, item: ItemData) => {
    e.dataTransfer.setData("type", item.type);
    e.dataTransfer.setData("size", item.size);
  };

  const cols = plateConfigs[plateSize].cols;

  return (
    <div className="text-center bg-[#d9d9d9] font-sans p-[1cm]">
      <h2 className="text-xl font-semibold mb-4">
        Modular Plate UI – All Components
      </h2>

      <select
        value={plateSize}
        onChange={handlePlateChange}
        className="text-base px-4 py-2 mb-6 rounded border"
      >
        <option value="4H">4M Horizontal (2 × 2)</option>
        <option value="6H">6M Horizontal (3 × 2)</option>
        <option value="8H">8M Horizontal (4 × 2)</option>
      </select>

      <div className="flex justify-center gap-8 flex-wrap mb-8">
        {[
          { type: "Socket", size: "2M" },
          { type: "Switch", size: "1M" },
          { type: "Indicator", size: "1M" },
          { type: "USB", size: "1M" },
          { type: "Fan", size: "1M" },
          { type: "Touch", size: "2M" },
          { type: "FanTouch", size: "2M" },
          { type: "DoorBellTouch", size: "2M" },
        ].map((item, i) => (
          <div
            key={i}
            className={`border border-gray-500 rounded-lg shadow cursor-grab flex items-center justify-center ${
              item.size === "2M" ? "w-[4.4cm] h-[4.5cm]" : "w-[2.2cm] h-[4.5cm]"
            }`}
            draggable
            onDragStart={(e) => dragStart(e, item)}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      <div className="inline-block bg-gray-100 p-8 rounded-3xl">
        <div
          className="grid gap-2 bg-white p-4 rounded-3xl shadow-xl"
          style={{ gridTemplateColumns: `repeat(${cols}, 4.4cm)` }}
        >
          {slots.map((slot, index) => (
            <div
              key={index}
              className="relative w-[4.4cm] h-[4.5cm] bg-gray-50 border border-gray-300 rounded-xl flex flex-row justify-between"
            >
              <div className="absolute top-1 left-2 text-xs text-gray-500">
                {index + 1}
              </div>

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
