// ====================================================
// CONFIGURACIÓN DE LA TIENDA
// ====================================================
// Personaliza estos valores para tu negocio
// El WhatsApp se configura en el archivo .env
// ====================================================

import logoImage from "../assets/web/logo.png";

export const clientConfig = {
  brand: {
    name: "Previar",
    slogan: "Tienda de bebidas",
    logo: logoImage
  },

  contact: {
    address: "",
    phone: "+54 11 1234-5678",
    email: "contacto@previar.com"
  },

  // WhatsApp - El número se lee de .env (PUBLIC_WHATSAPP_NUMBER)
  whatsapp: {
    number: import.meta.env.PUBLIC_WHATSAPP_NUMBER,
    messagePrefix: "¡Hola! Quiero realizar el siguiente pedido:",
    enabled: true
  },

  // Redes sociales
  social: {
    instagram: "",
    facebook: ""
  },

  // Configuración de la tienda
  store: {
    currency: "$",
    currencyPosition: "left"
  }
};
