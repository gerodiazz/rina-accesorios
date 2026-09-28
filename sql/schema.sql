-- =============================================
-- RINA ACCESORIOS - DATABASE SCHEMA
-- Ejecutar en Supabase SQL Editor
-- =============================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLAS
-- =============================================

-- Categorías de productos
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Modelos de celular
CREATE TABLE phone_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand TEXT NOT NULL CHECK (brand IN ('Apple', 'Samsung', 'Motorola', 'Xiaomi')),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0
);

-- Productos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  price_display TEXT,
  whatsapp_only BOOLEAN DEFAULT FALSE,
  whatsapp_message TEXT,
  active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Relación productos <-> modelos compatibles
CREATE TABLE product_phone_models (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  phone_model_id UUID REFERENCES phone_models(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, phone_model_id)
);

-- Imágenes de productos
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  order_index INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE
);

-- Textos editables del sitio
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  section TEXT NOT NULL
);

-- Imágenes del sitio
CREATE TABLE site_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  alt TEXT,
  section TEXT NOT NULL,
  description TEXT
);

-- FAQ
CREATE TABLE faq_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE
);

-- =============================================
-- ÍNDICES
-- =============================================

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_phone_models_brand ON phone_models(brand);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_site_content_section ON site_content(section);
CREATE INDEX idx_site_images_section ON site_images(section);
CREATE INDEX idx_faq_items_active ON faq_items(active);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE phone_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_phone_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública (anon puede leer todo lo activo)
CREATE POLICY "Lectura pública de categorías activas"
  ON categories FOR SELECT
  USING (active = TRUE);

CREATE POLICY "Lectura pública de modelos activos"
  ON phone_models FOR SELECT
  USING (active = TRUE);

CREATE POLICY "Lectura pública de productos activos"
  ON products FOR SELECT
  USING (active = TRUE);

CREATE POLICY "Lectura pública de relaciones producto-modelo"
  ON product_phone_models FOR SELECT
  USING (TRUE);

CREATE POLICY "Lectura pública de imágenes de productos"
  ON product_images FOR SELECT
  USING (TRUE);

CREATE POLICY "Lectura pública de contenido del sitio"
  ON site_content FOR SELECT
  USING (TRUE);

CREATE POLICY "Lectura pública de imágenes del sitio"
  ON site_images FOR SELECT
  USING (TRUE);

CREATE POLICY "Lectura pública de FAQ activos"
  ON faq_items FOR SELECT
  USING (active = TRUE);

-- Políticas de escritura (solo usuarios autenticados)
CREATE POLICY "Admin puede insertar categorías"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "Admin puede actualizar categorías"
  ON categories FOR UPDATE
  TO authenticated
  USING (TRUE);

CREATE POLICY "Admin puede eliminar categorías"
  ON categories FOR DELETE
  TO authenticated
  USING (TRUE);

CREATE POLICY "Admin lectura completa categorías"
  ON categories FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "Admin puede insertar modelos"
  ON phone_models FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "Admin puede actualizar modelos"
  ON phone_models FOR UPDATE
  TO authenticated
  USING (TRUE);

CREATE POLICY "Admin puede eliminar modelos"
  ON phone_models FOR DELETE
  TO authenticated
  USING (TRUE);

CREATE POLICY "Admin lectura completa modelos"
  ON phone_models FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "Admin puede insertar productos"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "Admin puede actualizar productos"
  ON products FOR UPDATE
  TO authenticated
  USING (TRUE);

CREATE POLICY "Admin puede eliminar productos"
  ON products FOR DELETE
  TO authenticated
  USING (TRUE);

CREATE POLICY "Admin lectura completa productos"
  ON products FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "Admin puede gestionar relaciones producto-modelo"
  ON product_phone_models FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Admin puede gestionar imágenes de productos"
  ON product_images FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Admin puede gestionar contenido del sitio"
  ON site_content FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Admin puede gestionar imágenes del sitio"
  ON site_images FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Admin puede gestionar FAQ"
  ON faq_items FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Admin lectura completa FAQ"
  ON faq_items FOR SELECT
  TO authenticated
  USING (TRUE);

-- =============================================
-- STORAGE BUCKETS
-- =============================================

-- Crear buckets (ejecutar como service_role o desde dashboard)
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('product-images', 'product-images', TRUE),
  ('site-images', 'site-images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage: lectura pública
CREATE POLICY "Lectura pública de imágenes de productos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Lectura pública de imágenes del sitio"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-images');

-- Políticas de Storage: escritura solo autenticados
CREATE POLICY "Admin puede subir imágenes de productos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Admin puede actualizar imágenes de productos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin puede eliminar imágenes de productos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin puede subir imágenes del sitio"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Admin puede actualizar imágenes del sitio"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-images');

CREATE POLICY "Admin puede eliminar imágenes del sitio"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-images');
