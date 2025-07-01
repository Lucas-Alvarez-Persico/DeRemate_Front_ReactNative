// src/services/qrCodeService.js

/**
 * Procesa el contenido de un código QR.
 * @param {string} data - El texto del código QR escaneado.
 * @returns {Promise<Object>} - Los datos parseados del QR.
 */
export const processQRCode = async (data) => {
    try {
      const parsed = JSON.parse(data);
      return parsed;
    } catch (error) {
      throw new Error('El contenido del código QR no es JSON válido.');
    }
  };
  