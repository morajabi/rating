export const BASE_FONT_SIZE = 16

/**
 * Convert px to rem for styling
 *
 * @param {number} pxValue - Pixel value as a number
 */
export const rem = pxValue => `${pxValue / BASE_FONT_SIZE}rem`
