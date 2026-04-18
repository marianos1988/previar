
// DEfinir Colecciones
import { defineCollection, z } from "astro:content"; // La zeta valida Esquemas



const products = defineCollection({
    schema: z.object({
        marca: z.string(),
        categoria: z.string(),
        estuche: z.string(),
        variante: z.string(),
        tamano: z.string(),
        proveedor: z.string(),
        precioCosto: z.number(),
        precioMayorista: z.number(),
        precioMinorista: z.number(),
        fechaPrecio: z.string(),
        descuento: z.number().optional(),
        stock: z.boolean(),
        images: z.object({
            img1: z.string().optional(),
            img2: z.string().optional(),
            img3: z.string().optional(),
            img4: z.string().optional(),
            img5: z.string().optional(),
            img6: z.string().optional(),
            img7: z.string().optional(),
            img8: z.string().optional(),
            img9: z.string().optional(),
            img10: z.string().optional(),
        }).optional(),
    })
})

export const collections = { 

    products: products
 } 