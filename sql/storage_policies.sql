-- =============================================
-- STORAGE: buckets y permisos para subir fotos desde el admin
-- Ejecutar en Supabase SQL Editor. Se puede correr más de una vez.
-- =============================================

-- Buckets públicos (lectura abierta para el sitio)
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('product-images', 'product-images', TRUE),
  ('site-images', 'site-images', TRUE)
ON CONFLICT (id) DO UPDATE SET public = TRUE;

-- Limpiar políticas previas (las de schema.sql y las de este archivo)
DROP POLICY IF EXISTS "Lectura pública de imágenes de productos" ON storage.objects;
DROP POLICY IF EXISTS "Lectura pública de imágenes del sitio" ON storage.objects;
DROP POLICY IF EXISTS "Admin puede subir imágenes de productos" ON storage.objects;
DROP POLICY IF EXISTS "Admin puede actualizar imágenes de productos" ON storage.objects;
DROP POLICY IF EXISTS "Admin puede eliminar imágenes de productos" ON storage.objects;
DROP POLICY IF EXISTS "Admin puede subir imágenes del sitio" ON storage.objects;
DROP POLICY IF EXISTS "Admin puede actualizar imágenes del sitio" ON storage.objects;
DROP POLICY IF EXISTS "Admin puede eliminar imágenes del sitio" ON storage.objects;
DROP POLICY IF EXISTS "rina_images_select" ON storage.objects;
DROP POLICY IF EXISTS "rina_images_insert" ON storage.objects;
DROP POLICY IF EXISTS "rina_images_update" ON storage.objects;
DROP POLICY IF EXISTS "rina_images_delete" ON storage.objects;

-- Lectura pública
CREATE POLICY "rina_images_select" ON storage.objects FOR SELECT
  USING (bucket_id IN ('product-images', 'site-images'));

-- Escritura solo para usuarios logueados (admin)
CREATE POLICY "rina_images_insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('product-images', 'site-images'));

CREATE POLICY "rina_images_update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id IN ('product-images', 'site-images'));

CREATE POLICY "rina_images_delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id IN ('product-images', 'site-images'));
