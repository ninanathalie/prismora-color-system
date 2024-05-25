import { hslToColorString, parseToHsl } from "polished";

/**
 * Generates a set of shades for a given base color.
 *
 * @param {string} baseColor - The base color in hexadecimal notation.
 * @returns {Record<string, string>} - An object containing the base color and its lighter and darker shades.
 * @throws {Error} - If the provided color is not in a valid hexadecimal format.
 */
export const generateShades = (baseColor: string): Record<string, string> => {
  const cleanedBaseColor = baseColor.replace("#", "");

  if (!/^([0-9A-Fa-f]{3}){1,2}$/.test(cleanedBaseColor)) {
    throw new Error("Invalid color format. Please provide a color in hex notation.");
  }

  const hsl = parseToHsl(`#${cleanedBaseColor}`);
  const shades: Record<string, string> = {};

  // Ensure cleanedBaseColor is always 6 characters long
  const normalizedBaseColor = cleanedBaseColor.length === 3 ? cleanedBaseColor.replace(/(.)/g, "$1$1") : cleanedBaseColor;

  // Generate lighter shades from white to base color
  for (let i = -100; i <= -10; i += 10) {
    const lightness = hsl.lightness + (1 - hsl.lightness) * (-i / 100);
    const adjustedHsl = { ...hsl, lightness: Math.min(lightness, 1) };
    const shade = hslToColorString(adjustedHsl);
    shades[`${i}%`] = shade;
  }

  // Base color (0%)
  shades["0%"] = hslToColorString(hsl);

  // Generate darker shades from base color to black
  for (let i = 10; i <= 100; i += 10) {
    const lightness = hsl.lightness * (1 - i / 100);
    const adjustedHsl = { ...hsl, lightness: Math.max(lightness, 0) };
    const shade = hslToColorString(adjustedHsl);
    shades[`${i}%`] = shade;
  }

  return shades;
};
