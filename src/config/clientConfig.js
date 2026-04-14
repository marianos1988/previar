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

    // Envíos - Configuración de zonas y precios
    shipping: {
      title: "Envíos a Domicilio",
      description: "Entregamos en Capital y AMBA.",
      subtitle: "Zonas de entrega:",
      zones: [
        { name: "CABA", description: "Capital Federal", price: 0 },
        { name: "Zona Norte", description: "AMBA Norte", price: 0 },
        { name: "Zona Oeste", description: "AMBA Oeste", price: 0 },
        { name: "Zona Sur", description: "AMBA Sur", price: 0 }
      ]
    },

    // Formas de pago
    payment: {
      title: "Formas de Pago",
      description: "Pagá como prefieras.",
      subtitle: "Opciones:",
      methods: [
        { name: "Transferencia", description: "Bancaria" },
        { name: "Efectivo", description: "Contra entrega" }
      ]
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
