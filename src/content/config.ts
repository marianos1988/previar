
// DEfinir Colecciones
import { defineCollection, z } from "astro:content"; // La zeta valida Esquemas



const products = defineCollection({
    schema: z.object({
        nombre: z.string(),
        precio: z.number(),
        images :  z.object({
            img1: z.string(),
            img2: z.string().optional(),
            img3: z.string().optional(),
            img4: z.string().optional(),
            img5: z.string().optional(),
            img6: z.string().optional(),
            img7: z.string().optional(),
            img8: z.string().optional(),
            img9: z.string().optional(),
            img10: z.string().optional(),
            })

        ,
        categoria: z.string(),

    })
})

export const collections = { 

    products: products
 } 