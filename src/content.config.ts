// ─────────────────────────────────────────────────────────────────────────────
// CONTENT COLLECTION CONFIG
// Define el schema (estructura) de los proyectos que viven en
// src/content/projects/*.md
//
// Cada archivo .md tiene un "frontmatter" al inicio (entre ---) con los campos
// definidos aquí. Astro valida automáticamente que el frontmatter sea correcto.
//
// Para AGREGAR UN NUEVO PROYECTO: crear un archivo .md en src/content/projects/
// con el mismo formato que los existentes. No tocar este archivo.
// ─────────────────────────────────────────────────────────────────────────────

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  // "glob" busca todos los .md dentro de src/content/projects/
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),

  schema: ({ image }) =>
    z.object({
      title:         z.string(),                              // Nombre del proyecto
      description:   z.string().max(300),                    // Resumen corto (máx 300 chars)
      date:          z.coerce.date(),                        // Fecha (YYYY-MM-DD)
      tags:          z.array(z.string()),                    // Etiquetas: design, fabrication, research, robotics
      cover:         image(),                                // Imagen portada (ruta relativa desde el .md)
      featured:      z.boolean().default(false),             // Destacado (no se usa aún)
      status:        z.enum(['published', 'draft']).default('published'), // 'draft' lo oculta
      year:          z.number().optional(),                  // Año del proyecto
      location:      z.string().optional(),                  // Lugar
      collaborators: z.array(z.string()).optional(),         // Lista de colaboradores
    }),
});

export const collections = { projects };
