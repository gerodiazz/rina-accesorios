-- =============================================
-- FIX RLS POLICIES
-- Ejecutar en Supabase SQL Editor para corregir permisos
-- =============================================

-- Primero eliminar políticas existentes
DROP POLICY IF EXISTS "Lectura pública de categorías activas" ON categories;
DROP POLICY IF EXISTS "Admin puede insertar categorías" ON categories;
DROP POLICY IF EXISTS "Admin puede actualizar categorías" ON categories;
DROP POLICY IF EXISTS "Admin puede eliminar categorías" ON categories;
DROP POLICY IF EXISTS "Admin lectura completa categorías" ON categories;

DROP POLICY IF EXISTS "Lectura pública de modelos activos" ON phone_models;
DROP POLICY IF EXISTS "Admin puede insertar modelos" ON phone_models;
DROP POLICY IF EXISTS "Admin puede actualizar modelos" ON phone_models;
DROP POLICY IF EXISTS "Admin puede eliminar modelos" ON phone_models;
DROP POLICY IF EXISTS "Admin lectura completa modelos" ON phone_models;

DROP POLICY IF EXISTS "Lectura pública de productos activos" ON products;
DROP POLICY IF EXISTS "Admin puede insertar productos" ON products;
DROP POLICY IF EXISTS "Admin puede actualizar productos" ON products;
DROP POLICY IF EXISTS "Admin puede eliminar productos" ON products;
DROP POLICY IF EXISTS "Admin lectura completa productos" ON products;

DROP POLICY IF EXISTS "Lectura pública de relaciones producto-modelo" ON product_phone_models;
DROP POLICY IF EXISTS "Admin puede gestionar relaciones producto-modelo" ON product_phone_models;

DROP POLICY IF EXISTS "Lectura pública de imágenes de productos" ON product_images;
DROP POLICY IF EXISTS "Admin puede gestionar imágenes de productos" ON product_images;

DROP POLICY IF EXISTS "Lectura pública de contenido del sitio" ON site_content;
DROP POLICY IF EXISTS "Admin puede gestionar contenido del sitio" ON site_content;

DROP POLICY IF EXISTS "Lectura pública de imágenes del sitio" ON site_images;
DROP POLICY IF EXISTS "Admin puede gestionar imágenes del sitio" ON site_images;

DROP POLICY IF EXISTS "Lectura pública de FAQ activos" ON faq_items;
DROP POLICY IF EXISTS "Admin puede gestionar FAQ" ON faq_items;
DROP POLICY IF EXISTS "Admin lectura completa FAQ" ON faq_items;

-- =============================================
-- NUEVAS POLÍTICAS - Más simples y funcionales
-- =============================================

-- CATEGORIES
CREATE POLICY "categories_select" ON categories FOR SELECT USING (true);
CREATE POLICY "categories_insert" ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "categories_update" ON categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "categories_delete" ON categories FOR DELETE TO authenticated USING (true);

-- PHONE_MODELS
CREATE POLICY "phone_models_select" ON phone_models FOR SELECT USING (true);
CREATE POLICY "phone_models_insert" ON phone_models FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "phone_models_update" ON phone_models FOR UPDATE TO authenticated USING (true);
CREATE POLICY "phone_models_delete" ON phone_models FOR DELETE TO authenticated USING (true);

-- PRODUCTS
CREATE POLICY "products_select" ON products FOR SELECT USING (true);
CREATE POLICY "products_insert" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "products_update" ON products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "products_delete" ON products FOR DELETE TO authenticated USING (true);

-- PRODUCT_PHONE_MODELS
CREATE POLICY "product_phone_models_select" ON product_phone_models FOR SELECT USING (true);
CREATE POLICY "product_phone_models_insert" ON product_phone_models FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "product_phone_models_update" ON product_phone_models FOR UPDATE TO authenticated USING (true);
CREATE POLICY "product_phone_models_delete" ON product_phone_models FOR DELETE TO authenticated USING (true);

-- PRODUCT_IMAGES
CREATE POLICY "product_images_select" ON product_images FOR SELECT USING (true);
CREATE POLICY "product_images_insert" ON product_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "product_images_update" ON product_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "product_images_delete" ON product_images FOR DELETE TO authenticated USING (true);

-- SITE_CONTENT
CREATE POLICY "site_content_select" ON site_content FOR SELECT USING (true);
CREATE POLICY "site_content_insert" ON site_content FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "site_content_update" ON site_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "site_content_delete" ON site_content FOR DELETE TO authenticated USING (true);

-- SITE_IMAGES
CREATE POLICY "site_images_select" ON site_images FOR SELECT USING (true);
CREATE POLICY "site_images_insert" ON site_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "site_images_update" ON site_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "site_images_delete" ON site_images FOR DELETE TO authenticated USING (true);

-- FAQ_ITEMS
CREATE POLICY "faq_items_select" ON faq_items FOR SELECT USING (true);
CREATE POLICY "faq_items_insert" ON faq_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "faq_items_update" ON faq_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "faq_items_delete" ON faq_items FOR DELETE TO authenticated USING (true);
