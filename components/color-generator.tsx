"use client";

import React, { useEffect, useState } from "react";
import { PiCopySimpleBold } from "react-icons/pi";
import { VscCircleFilled } from "react-icons/vsc";
import { Toaster } from "react-hot-toast";
import { expandHex, isLightColor, handleGenerate, handleCopy } from "@/utils/color-helper";

export default function ColorGenerator() {
  const [baseColor, setBaseColor] = useState<string>("#d5f7ff");
  const [colorShades, setColorShades] = useState<Record<string, string>>({});

  useEffect(() => {
    handleGenerate(baseColor, setColorShades);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseColor(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGenerate(baseColor, setColorShades);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col mb-4 p-4 sm:p-6">
        <h1>Color System Generator</h1>
        <form className="flex" onSubmit={(e) => e.preventDefault()}>
          <div className="border rounded-full h-8 w-8 mr-4" style={{ backgroundColor: expandHex(baseColor) || "#ffffff" }}></div>
          <input className="bg-transparent border-b border-slate-400 focus-within:shadow-none focus-visible:outline-none" type="text" value={baseColor} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Enter a base color (e.g., #d5f7ff)" />
        </form>
      </div>

      <ul className="flex-1 grid grid-cols-7 overflow-auto">
        {Object.entries(colorShades).map(([level, color]) => {
          const textColor = isLightColor(color) ? "#000" : "#fff";
          return (
            <li key={level} style={{ backgroundColor: color, padding: "10px", color: textColor }} className="group">
              <div className="text-xs flex items-center opacity-50">
                <VscCircleFilled className="opacity-50" /> {level}
              </div>
              <div className="flex items-center">
                {color}
                <button className="pl-2 text-xl opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleCopy(color)}>
                  <PiCopySimpleBold />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <Toaster />
    </div>
  );
}
