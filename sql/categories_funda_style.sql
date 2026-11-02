-- =============================================
-- RINA ACCESORIOS - Categorías: marcar estilos de funda
-- Ejecutar en Supabase SQL Editor (una sola vez)
-- =============================================
--
-- Las fundas no tienen una categoría propia: cada funda pertenece a una
-- categoría de estilo ("Con dijes", "Series", "Funda pintada a mano"...).
-- Esta columna indica explícitamente qué categorías son estilos de funda,
-- para que el filtro "Fundas" del catálogo no dependa del nombre o del slug.
-- Se edita desde /admin/categorias.

ALTER TABLE categories
  ADD COLUMN IF NOT EXISTS is_funda_style BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE categories SET is_funda_style = TRUE WHERE slug IN (
  'stickers-fotos',
  'stickers-deco',
  'stickers-dijes-deco',
  'dijes',
  'dijes-deco',
  'flores-foto',
  'flores-foto-deco',
  'flores-deco',
  'flores-dijes',
  'flores-dijes-deco',
  'series',
  'artistas',
  'funda-con-deco',
  'funda-pintada-a-mano',
  'funda-con-foto-dijes-y-deco',
  'funda-con-solo-flores-'
);
