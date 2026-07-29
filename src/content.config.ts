// src/content.config.ts
// Definisi seluruh "Content Collections" Astro.
// Non-programmer cukup menambah/mengedit file .md di folder terkait
// (src/content/berita, src/content/galeri, dst) — TIDAK perlu menyentuh file ini.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const berita = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/berita' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      kategori: z.enum(['Kegiatan', 'Pembangunan', 'Pengumuman', 'Sosial', 'Ekonomi']),
      ringkasan: z.string(),
      gambar: z.string().optional(), // id ilustrasi bawaan (dipakai kalau tidak ada foto asli)
      fotoUtama: z.string().optional(), // path foto asli di folder public/, contoh: /images/berita/nama-file.jpg
      penulis: z.string().default('Admin Desa'),
      draft: z.boolean().default(false),
    }),
});

const galeri = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/galeri' }),
  schema: z.object({
    judul: z.string(),
    kategori: z.enum(['Kegiatan', 'Alam', 'Budaya', 'Infrastruktur']),
    tipe: z.enum(['foto', 'video']).default('foto'),
    gambar: z.string().optional(),
    fotoUtama: z.string().optional(),
    fotoTambahan: z.array(z.string()).optional().default([]),
    youtubeId: z.string().optional(),
    tanggal: z.coerce.date().optional(),
  }),
});

const perangkat = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/perangkat' }),
  schema: z.object({
    nama: z.string(),
    jabatan: z.string(),
    urutan: z.number(),
    foto: z.string().optional(),
    periode: z.string().optional(),
  }),
});

const dusun = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dusun' }),
  schema: z.object({
    nama: z.string(),
    kepala: z.string(),
    urutan: z.number(),
  }),
});

// Halaman naratif panjang (sejarah, visi & misi, potensi desa) — satu file = satu halaman
const profil = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/profil' }),
  schema: z.object({
    title: z.string(),
    ringkasan: z.string().optional(),
  }),
});

export const collections = { berita, galeri, perangkat, dusun, profil };
