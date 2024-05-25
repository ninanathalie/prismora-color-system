import toast from "react-hot-toast";
import { generateShades } from "./generate-shades";

// Expand hex utility function
export const expandHex = (color: string): string => {
  if (!color.startsWith("#")) {
    color = `#${color}`;
  }
  if (color.length === 4) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
  }
  return color;
};

// Check if color is light utility function
export const isLightColor = (color: string) => {
  const hex = color.length === 4 ? color.replace(/#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])/i, "#$1$1$2$2$3$3") : color;
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const brightness = (r + g + b) / 3;
  return brightness > 128;
};

// Generate shades function
export const handleGenerate = (color: string, setColorShades: (shades: Record<string, string>) => void) => {
  if (!color) {
    return;
  }

  const hashColor = color.replace("#", "");

  if (!/^([0-9A-Fa-f]{3}){1,2}$/.test(hashColor)) {
    toast.error("Invalid color format. Please provide a color in hex notation.");
    return;
  }

  try {
    const shades = generateShades(`#${hashColor}`);
    setColorShades(shades);
  } catch (error) {
    toast.error((error as Error).message);
  }
};

// Copy to clipboard function
export const handleCopy = (color: string) => {
  navigator.clipboard
    .writeText(color)
    .then(() => {
      toast.success(`Copied ${color} to clipboard!`);
    })
    .catch(() => {
      toast.error("Failed to copy!");
    });
};
