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
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <img src="/images/nn-logo.svg" alt="NN Logo" width={32} height={32} />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Color System Generator</h1>
            <p className="text-xs text-slate-400">Enter a hex color and press Enter</p>
          </div>
        </div>
        <form className="flex items-center gap-3" onSubmit={(e) => e.preventDefault()}>
          <div
            className="rounded-full h-9 w-9 shrink-0 border border-slate-200 shadow-sm transition-colors"
            style={{ backgroundColor: expandHex(baseColor) || "#ffffff" }}
          />
          <input
            className="bg-slate-50 rounded-lg px-3 py-2 text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 w-52"
            type="text"
            value={baseColor}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="#d5f7ff"
          />
        </form>
      </header>

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
