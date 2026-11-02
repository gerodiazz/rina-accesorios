-- =============================================
-- IMAGEN DE PORTADA (hero del inicio) editable desde /admin/portada
-- Ejecutar en Supabase SQL Editor. Se puede correr más de una vez.
--
-- Qué hace:
--  1. Crea la tabla admin_users + la función is_admin(): solo los usuarios
--     que estén en esa tabla pueden cambiar la portada (el registro público
--     de Supabase está habilitado, así que "estar logueado" no alcanza).
--  2. Crea el bucket "hero-images" con validación del lado del servidor:
--     solo JPG/PNG/WEBP y hasta 8 MB.
--  3. Políticas: lectura pública, escritura solo para administradores.
--  4. En site_images, la fila 'home.hero' solo la puede crear/cambiar/borrar
--     un administrador, y su URL tiene que apuntar al bucket hero-images.
-- =============================================

-- 1. Administradores ---------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Cada usuario solo puede ver si él mismo es admin. Nadie puede escribir
-- desde la web: los admins se agregan desde el SQL Editor.
DROP POLICY IF EXISTS "admin_users_select_self" ON public.admin_users;
CREATE POLICY "admin_users_select_self" ON public.admin_users FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid());
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- Marca como admin a las cuentas que ya existen hoy (la del panel).
-- Revisá el SELECT de abajo: si aparece alguna cuenta que NO es tuya, borrala con
--   DELETE FROM public.admin_users WHERE user_id = '<id>';
-- Para agregar un admin nuevo más adelante:
--   INSERT INTO public.admin_users (user_id)
--   SELECT id FROM auth.users WHERE email = 'mail@ejemplo.com';
INSERT INTO public.admin_users (user_id)
SELECT id FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- 2. Bucket con validación de formato y tamaño en el servidor ---------------

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('hero-images', 'hero-images', TRUE, 8388608, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = TRUE,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 3. Políticas del bucket ---------------------------------------------------

DROP POLICY IF EXISTS "hero_images_select" ON storage.objects;
DROP POLICY IF EXISTS "hero_images_insert" ON storage.objects;
DROP POLICY IF EXISTS "hero_images_update" ON storage.objects;
DROP POLICY IF EXISTS "hero_images_delete" ON storage.objects;

CREATE POLICY "hero_images_select" ON storage.objects FOR SELECT
  USING (bucket_id = 'hero-images');

CREATE POLICY "hero_images_insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'hero-images'
    AND public.is_admin()
    AND lower(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp')
  );

CREATE POLICY "hero_images_update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'hero-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'hero-images' AND public.is_admin());

CREATE POLICY "hero_images_delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'hero-images' AND public.is_admin());

-- 4. Fila 'home.hero' de site_images ----------------------------------------
-- Políticas RESTRICTIVE: se suman a las que ya existen sobre site_images y no
-- cambian nada para la galería ni para el resto de las filas.

DROP POLICY IF EXISTS "site_images_hero_admin_write" ON public.site_images;
DROP POLICY IF EXISTS "site_images_hero_admin_delete" ON public.site_images;
DROP POLICY IF EXISTS "site_images_hero_admin_insert" ON public.site_images;

CREATE POLICY "site_images_hero_admin_insert" ON public.site_images
  AS RESTRICTIVE FOR INSERT TO authenticated
  WITH CHECK (
    key <> 'home.hero'
    OR (public.is_admin() AND url LIKE '%/storage/v1/object/public/hero-images/%')
  );

CREATE POLICY "site_images_hero_admin_write" ON public.site_images
  AS RESTRICTIVE FOR UPDATE TO authenticated
  USING (key <> 'home.hero' OR public.is_admin())
  WITH CHECK (
    key <> 'home.hero'
    OR (public.is_admin() AND url LIKE '%/storage/v1/object/public/hero-images/%')
  );

CREATE POLICY "site_images_hero_admin_delete" ON public.site_images
  AS RESTRICTIVE FOR DELETE TO authenticated
  USING (key <> 'home.hero' OR public.is_admin());

-- Verificación: cuentas marcadas como administradoras
SELECT u.email, a.created_at
FROM public.admin_users a
JOIN auth.users u ON u.id = a.user_id;
