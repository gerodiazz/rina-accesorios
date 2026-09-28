-- =============================================
-- RINA ACCESORIOS - SEED DATA
-- Ejecutar en Supabase SQL Editor después de schema.sql
-- =============================================

-- =============================================
-- CATEGORÍAS
-- =============================================

INSERT INTO categories (name, slug, description, active, order_index) VALUES
  ('Funda con stickers / fotos', 'stickers-fotos', 'Fundas decoradas con stickers y tus fotos favoritas', TRUE, 1),
  ('Con stickers y deco', 'stickers-deco', 'Stickers combinados con decoraciones especiales', TRUE, 2),
  ('Con stickers, dijes y deco', 'stickers-dijes-deco', 'La combinación completa: stickers, dijes y decoración', TRUE, 3),
  ('Con dijes', 'dijes', 'Fundas elegantes con dijes decorativos', TRUE, 4),
  ('Con dijes y deco', 'dijes-deco', 'Dijes combinados con decoración especial', TRUE, 5),
  ('Con flores y foto', 'flores-foto', 'Flores naturales secas con tus fotos', TRUE, 6),
  ('Con flores, foto y deco', 'flores-foto-deco', 'Flores, fotos y decoración combinadas', TRUE, 7),
  ('Con flores y deco', 'flores-deco', 'Flores naturales con decoración elegante', TRUE, 8),
  ('Con flores y dijes', 'flores-dijes', 'Flores naturales combinadas con dijes', TRUE, 9),
  ('Con flores, dijes y deco', 'flores-dijes-deco', 'La combinación completa con flores', TRUE, 10),
  ('Series', 'series', 'Fundas inspiradas en tus series favoritas', TRUE, 11),
  ('Artistas', 'artistas', 'Fundas inspiradas en tus artistas favoritos', TRUE, 12),
  ('Straps', 'straps', 'Correas y accesorios para celular', TRUE, 13),
  ('Box', 'box', 'Cajas decoradas personalizadas para regalo', TRUE, 14),
  ('Llaveros', 'llaveros', 'Llaveros personalizados únicos', TRUE, 15),
  ('Gift Card', 'gift-card', 'Tarjetas de regalo para que elijan su diseño', TRUE, 16);

-- =============================================
-- MODELOS DE CELULAR - iPhone
-- =============================================

INSERT INTO phone_models (brand, name, slug, active, order_index) VALUES
  ('Apple', 'iPhone 7/8', 'iphone-7-8', TRUE, 1),
  ('Apple', 'iPhone 7 Plus/8 Plus', 'iphone-7-plus-8-plus', TRUE, 2),
  ('Apple', 'iPhone X/XS', 'iphone-x-xs', TRUE, 3),
  ('Apple', 'iPhone XS Max', 'iphone-xs-max', TRUE, 4),
  ('Apple', 'iPhone XR', 'iphone-xr', TRUE, 5),
  ('Apple', 'iPhone 11', 'iphone-11', TRUE, 6),
  ('Apple', 'iPhone 11 Pro', 'iphone-11-pro', TRUE, 7),
  ('Apple', 'iPhone 11 Pro Max', 'iphone-11-pro-max', TRUE, 8),
  ('Apple', 'iPhone 12', 'iphone-12', TRUE, 9),
  ('Apple', 'iPhone 12 Pro', 'iphone-12-pro', TRUE, 10),
  ('Apple', 'iPhone 12 Mini', 'iphone-12-mini', TRUE, 11),
  ('Apple', 'iPhone 12 Pro Max', 'iphone-12-pro-max', TRUE, 12),
  ('Apple', 'iPhone 13 Pro', 'iphone-13-pro', TRUE, 13),
  ('Apple', 'iPhone 13 Pro Max', 'iphone-13-pro-max', TRUE, 14),
  ('Apple', 'iPhone 13/14', 'iphone-13-14', TRUE, 15),
  ('Apple', 'iPhone 14 Pro', 'iphone-14-pro', TRUE, 16),
  ('Apple', 'iPhone 14 Pro Max', 'iphone-14-pro-max', TRUE, 17),
  ('Apple', 'iPhone 14 Plus', 'iphone-14-plus', TRUE, 18),
  ('Apple', 'iPhone 15', 'iphone-15', TRUE, 19),
  ('Apple', 'iPhone 15 Pro', 'iphone-15-pro', TRUE, 20),
  ('Apple', 'iPhone 15 Pro Max', 'iphone-15-pro-max', TRUE, 21),
  ('Apple', 'iPhone 15 Plus', 'iphone-15-plus', TRUE, 22),
  ('Apple', 'iPhone 16', 'iphone-16', TRUE, 23),
  ('Apple', 'iPhone 16 Pro', 'iphone-16-pro', TRUE, 24),
  ('Apple', 'iPhone 16e', 'iphone-16e', TRUE, 25),
  ('Apple', 'iPhone 16 Pro Max', 'iphone-16-pro-max', TRUE, 26),
  ('Apple', 'iPhone 17', 'iphone-17', TRUE, 27),
  ('Apple', 'iPhone 17 Air', 'iphone-17-air', TRUE, 28),
  ('Apple', 'iPhone 17 Pro', 'iphone-17-pro', TRUE, 29),
  ('Apple', 'iPhone 17 Pro Max', 'iphone-17-pro-max', TRUE, 30);

-- =============================================
-- MODELOS DE CELULAR - Samsung
-- =============================================

INSERT INTO phone_models (brand, name, slug, active, order_index) VALUES
  ('Samsung', 'Samsung A02s', 'samsung-a02s', TRUE, 31),
  ('Samsung', 'Samsung A03', 'samsung-a03', TRUE, 32),
  ('Samsung', 'Samsung A03s', 'samsung-a03s', TRUE, 33),
  ('Samsung', 'Samsung A04', 'samsung-a04', TRUE, 34),
  ('Samsung', 'Samsung A04e', 'samsung-a04e', TRUE, 35),
  ('Samsung', 'Samsung A04s', 'samsung-a04s', TRUE, 36),
  ('Samsung', 'Samsung A05', 'samsung-a05', TRUE, 37),
  ('Samsung', 'Samsung A05s', 'samsung-a05s', TRUE, 38),
  ('Samsung', 'Samsung A06', 'samsung-a06', TRUE, 39),
  ('Samsung', 'Samsung A07', 'samsung-a07', TRUE, 40),
  ('Samsung', 'Samsung A10', 'samsung-a10', TRUE, 41),
  ('Samsung', 'Samsung A10s', 'samsung-a10s', TRUE, 42),
  ('Samsung', 'Samsung A11', 'samsung-a11', TRUE, 43),
  ('Samsung', 'Samsung A13 5G', 'samsung-a13-5g', TRUE, 44),
  ('Samsung', 'Samsung A14', 'samsung-a14', TRUE, 45),
  ('Samsung', 'Samsung A15', 'samsung-a15', TRUE, 46),
  ('Samsung', 'Samsung A16 4G', 'samsung-a16-4g', TRUE, 47),
  ('Samsung', 'Samsung A16 5G', 'samsung-a16-5g', TRUE, 48),
  ('Samsung', 'Samsung A17', 'samsung-a17', TRUE, 49),
  ('Samsung', 'Samsung A20', 'samsung-a20', TRUE, 50),
  ('Samsung', 'Samsung A20s', 'samsung-a20s', TRUE, 51),
  ('Samsung', 'Samsung A21', 'samsung-a21', TRUE, 52),
  ('Samsung', 'Samsung A21s', 'samsung-a21s', TRUE, 53),
  ('Samsung', 'Samsung A22 4G', 'samsung-a22-4g', TRUE, 54),
  ('Samsung', 'Samsung A22 5G', 'samsung-a22-5g', TRUE, 55),
  ('Samsung', 'Samsung A23', 'samsung-a23', TRUE, 56),
  ('Samsung', 'Samsung A24', 'samsung-a24', TRUE, 57),
  ('Samsung', 'Samsung A25', 'samsung-a25', TRUE, 58),
  ('Samsung', 'Samsung A26', 'samsung-a26', TRUE, 59),
  ('Samsung', 'Samsung A30', 'samsung-a30', TRUE, 60),
  ('Samsung', 'Samsung A30s', 'samsung-a30s', TRUE, 61),
  ('Samsung', 'Samsung A31', 'samsung-a31', TRUE, 62),
  ('Samsung', 'Samsung A32 5G', 'samsung-a32-5g', TRUE, 63),
  ('Samsung', 'Samsung A33', 'samsung-a33', TRUE, 64),
  ('Samsung', 'Samsung A34', 'samsung-a34', TRUE, 65),
  ('Samsung', 'Samsung A35', 'samsung-a35', TRUE, 66),
  ('Samsung', 'Samsung A36', 'samsung-a36', TRUE, 67),
  ('Samsung', 'Samsung A50', 'samsung-a50', TRUE, 68),
  ('Samsung', 'Samsung A50s', 'samsung-a50s', TRUE, 69),
  ('Samsung', 'Samsung A51', 'samsung-a51', TRUE, 70),
  ('Samsung', 'Samsung A53', 'samsung-a53', TRUE, 71),
  ('Samsung', 'Samsung A54', 'samsung-a54', TRUE, 72),
  ('Samsung', 'Samsung A55', 'samsung-a55', TRUE, 73),
  ('Samsung', 'Samsung A56', 'samsung-a56', TRUE, 74),
  ('Samsung', 'Samsung A71', 'samsung-a71', TRUE, 75),
  ('Samsung', 'Samsung A72', 'samsung-a72', TRUE, 76),
  ('Samsung', 'Samsung A73', 'samsung-a73', TRUE, 77),
  ('Samsung', 'Samsung J2 Prime', 'samsung-j2-prime', TRUE, 78),
  ('Samsung', 'Samsung J8', 'samsung-j8', TRUE, 79),
  ('Samsung', 'Samsung M10s', 'samsung-m10s', TRUE, 80),
  ('Samsung', 'Samsung M14 4G', 'samsung-m14-4g', TRUE, 81),
  ('Samsung', 'Samsung S10', 'samsung-s10', TRUE, 82),
  ('Samsung', 'Samsung S20 Plus', 'samsung-s20-plus', TRUE, 83),
  ('Samsung', 'Samsung S20 Ultra', 'samsung-s20-ultra', TRUE, 84),
  ('Samsung', 'Samsung S21 Plus', 'samsung-s21-plus', TRUE, 85),
  ('Samsung', 'Samsung S21 Ultra', 'samsung-s21-ultra', TRUE, 86),
  ('Samsung', 'Samsung S21 FE', 'samsung-s21-fe', TRUE, 87),
  ('Samsung', 'Samsung S22', 'samsung-s22', TRUE, 88),
  ('Samsung', 'Samsung S22 Plus', 'samsung-s22-plus', TRUE, 89),
  ('Samsung', 'Samsung S22 Ultra', 'samsung-s22-ultra', TRUE, 90),
  ('Samsung', 'Samsung S23', 'samsung-s23', TRUE, 91),
  ('Samsung', 'Samsung S23 Plus', 'samsung-s23-plus', TRUE, 92),
  ('Samsung', 'Samsung S23 Ultra', 'samsung-s23-ultra', TRUE, 93),
  ('Samsung', 'Samsung S23 FE', 'samsung-s23-fe', TRUE, 94),
  ('Samsung', 'Samsung S24', 'samsung-s24', TRUE, 95),
  ('Samsung', 'Samsung S24 Plus', 'samsung-s24-plus', TRUE, 96),
  ('Samsung', 'Samsung S24 Ultra', 'samsung-s24-ultra', TRUE, 97),
  ('Samsung', 'Samsung S24 FE', 'samsung-s24-fe', TRUE, 98),
  ('Samsung', 'Samsung S25', 'samsung-s25', TRUE, 99),
  ('Samsung', 'Samsung S25 Plus', 'samsung-s25-plus', TRUE, 100),
  ('Samsung', 'Samsung S30 Plus', 'samsung-s30-plus', TRUE, 101);

-- =============================================
-- MODELOS DE CELULAR - Motorola
-- =============================================

INSERT INTO phone_models (brand, name, slug, active, order_index) VALUES
  ('Motorola', 'Motorola E6s', 'moto-e6s', TRUE, 102),
  ('Motorola', 'Motorola E7', 'moto-e7', TRUE, 103),
  ('Motorola', 'Motorola E7i', 'moto-e7i', TRUE, 104),
  ('Motorola', 'Motorola E13', 'moto-e13', TRUE, 105),
  ('Motorola', 'Motorola E14', 'moto-e14', TRUE, 106),
  ('Motorola', 'Motorola E15', 'moto-e15', TRUE, 107),
  ('Motorola', 'Motorola E20', 'moto-e20', TRUE, 108),
  ('Motorola', 'Motorola E30', 'moto-e30', TRUE, 109),
  ('Motorola', 'Motorola E32', 'moto-e32', TRUE, 110),
  ('Motorola', 'Motorola E40', 'moto-e40', TRUE, 111),
  ('Motorola', 'Motorola Edge 20 Pro', 'moto-edge-20-pro', TRUE, 112),
  ('Motorola', 'Motorola Edge 30 Fusion', 'moto-edge-30-fusion', TRUE, 113),
  ('Motorola', 'Motorola Edge 30 Neo', 'moto-edge-30-neo', TRUE, 114),
  ('Motorola', 'Motorola Edge 30 Pro', 'moto-edge-30-pro', TRUE, 115),
  ('Motorola', 'Motorola Edge 30 Ultra', 'moto-edge-30-ultra', TRUE, 116),
  ('Motorola', 'Motorola Edge 40', 'moto-edge-40', TRUE, 117),
  ('Motorola', 'Motorola Edge 40 Neo', 'moto-edge-40-neo', TRUE, 118),
  ('Motorola', 'Motorola Edge 40 Pro', 'moto-edge-40-pro', TRUE, 119),
  ('Motorola', 'Motorola Edge 50 Fusion', 'moto-edge-50-fusion', TRUE, 120),
  ('Motorola', 'Motorola Edge 50 Neo', 'moto-edge-50-neo', TRUE, 121),
  ('Motorola', 'Motorola Edge 50 Pro', 'moto-edge-50-pro', TRUE, 122),
  ('Motorola', 'Motorola Edge 50 Ultra', 'moto-edge-50-ultra', TRUE, 123),
  ('Motorola', 'Motorola Edge 60', 'moto-edge-60', TRUE, 124),
  ('Motorola', 'Motorola Edge 60 Fusion', 'moto-edge-60-fusion', TRUE, 125),
  ('Motorola', 'Motorola Edge 60 Pro', 'moto-edge-60-pro', TRUE, 126),
  ('Motorola', 'Motorola G04', 'moto-g04', TRUE, 127),
  ('Motorola', 'Motorola G05', 'moto-g05', TRUE, 128),
  ('Motorola', 'Motorola G10', 'moto-g10', TRUE, 129),
  ('Motorola', 'Motorola G13', 'moto-g13', TRUE, 130),
  ('Motorola', 'Motorola G14', 'moto-g14', TRUE, 131),
  ('Motorola', 'Motorola G15', 'moto-g15', TRUE, 132),
  ('Motorola', 'Motorola G20', 'moto-g20', TRUE, 133),
  ('Motorola', 'Motorola G22', 'moto-g22', TRUE, 134),
  ('Motorola', 'Motorola G23', 'moto-g23', TRUE, 135),
  ('Motorola', 'Motorola G24', 'moto-g24', TRUE, 136),
  ('Motorola', 'Motorola G24 Power', 'moto-g24-power', TRUE, 137),
  ('Motorola', 'Motorola G30', 'moto-g30', TRUE, 138),
  ('Motorola', 'Motorola G31', 'moto-g31', TRUE, 139),
  ('Motorola', 'Motorola G32', 'moto-g32', TRUE, 140),
  ('Motorola', 'Motorola G34', 'moto-g34', TRUE, 141),
  ('Motorola', 'Motorola G35', 'moto-g35', TRUE, 142),
  ('Motorola', 'Motorola G41', 'moto-g41', TRUE, 143),
  ('Motorola', 'Motorola G42', 'moto-g42', TRUE, 144),
  ('Motorola', 'Motorola G51', 'moto-g51', TRUE, 145),
  ('Motorola', 'Motorola G52', 'moto-g52', TRUE, 146),
  ('Motorola', 'Motorola G53', 'moto-g53', TRUE, 147),
  ('Motorola', 'Motorola G54', 'moto-g54', TRUE, 148),
  ('Motorola', 'Motorola G55', 'moto-g55', TRUE, 149),
  ('Motorola', 'Motorola G56', 'moto-g56', TRUE, 150),
  ('Motorola', 'Motorola G60s', 'moto-g60s', TRUE, 151),
  ('Motorola', 'Motorola G62', 'moto-g62', TRUE, 152),
  ('Motorola', 'Motorola G71', 'moto-g71', TRUE, 153),
  ('Motorola', 'Motorola G72', 'moto-g72', TRUE, 154),
  ('Motorola', 'Motorola G73', 'moto-g73', TRUE, 155),
  ('Motorola', 'Motorola G75', 'moto-g75', TRUE, 156),
  ('Motorola', 'Motorola G84', 'moto-g84', TRUE, 157),
  ('Motorola', 'Motorola G85', 'moto-g85', TRUE, 158),
  ('Motorola', 'Motorola G86', 'moto-g86', TRUE, 159),
  ('Motorola', 'Motorola G82', 'moto-g82', TRUE, 160),
  ('Motorola', 'Motorola G100', 'moto-g100', TRUE, 161);

-- =============================================
-- MODELOS DE CELULAR - Xiaomi
-- =============================================

INSERT INTO phone_models (brand, name, slug, active, order_index) VALUES
  ('Xiaomi', 'Poco X4 Pro 5G', 'poco-x4-pro-5g', TRUE, 162),
  ('Xiaomi', 'Poco X5', 'poco-x5', TRUE, 163),
  ('Xiaomi', 'Poco X6', 'poco-x6', TRUE, 164),
  ('Xiaomi', 'Poco C65', 'poco-c65', TRUE, 165),
  ('Xiaomi', 'Mi Poco M4 Pro 5G', 'poco-m4-pro-5g', TRUE, 166),
  ('Xiaomi', 'Mi Poco M5 4G', 'poco-m5-4g', TRUE, 167),
  ('Xiaomi', 'Mi Poco F5', 'poco-f5', TRUE, 168),
  ('Xiaomi', 'Redmi Note 8', 'redmi-note-8', TRUE, 169),
  ('Xiaomi', 'Redmi Note 8 Pro', 'redmi-note-8-pro', TRUE, 170),
  ('Xiaomi', 'Redmi Note 9', 'redmi-note-9', TRUE, 171),
  ('Xiaomi', 'Redmi Note 9S', 'redmi-note-9s', TRUE, 172),
  ('Xiaomi', 'Redmi Note 9 Pro', 'redmi-note-9-pro', TRUE, 173),
  ('Xiaomi', 'Redmi Note 9T', 'redmi-note-9t', TRUE, 174),
  ('Xiaomi', 'Redmi Note 10 4G', 'redmi-note-10-4g', TRUE, 175),
  ('Xiaomi', 'Redmi Note 10 5G', 'redmi-note-10-5g', TRUE, 176),
  ('Xiaomi', 'Redmi Note 11 4G', 'redmi-note-11-4g', TRUE, 177),
  ('Xiaomi', 'Redmi Note 11 Pro 4G', 'redmi-note-11-pro-4g', TRUE, 178),
  ('Xiaomi', 'Redmi Note 11 Pro 5G', 'redmi-note-11-pro-5g', TRUE, 179),
  ('Xiaomi', 'Redmi Note 12', 'redmi-note-12', TRUE, 180),
  ('Xiaomi', 'Redmi Note 12 Turbo', 'redmi-note-12-turbo', TRUE, 181),
  ('Xiaomi', 'Redmi Note 12 Pro 4G', 'redmi-note-12-pro-4g', TRUE, 182),
  ('Xiaomi', 'Redmi Note 12 Pro 5G', 'redmi-note-12-pro-5g', TRUE, 183),
  ('Xiaomi', 'Redmi Note 13 4G', 'redmi-note-13-4g', TRUE, 184),
  ('Xiaomi', 'Redmi Note 13 5G', 'redmi-note-13-5g', TRUE, 185),
  ('Xiaomi', 'Redmi Note 13 Pro 5G', 'redmi-note-13-pro-5g', TRUE, 186),
  ('Xiaomi', 'Redmi Note 14 5G', 'redmi-note-14-5g', TRUE, 187),
  ('Xiaomi', 'Redmi A3', 'redmi-a3', TRUE, 188),
  ('Xiaomi', 'Redmi A3x', 'redmi-a3x', TRUE, 189),
  ('Xiaomi', 'Redmi A5', 'redmi-a5', TRUE, 190),
  ('Xiaomi', 'Redmi 10C', 'redmi-10c', TRUE, 191),
  ('Xiaomi', 'Redmi 10A', 'redmi-10a', TRUE, 192),
  ('Xiaomi', 'Redmi 11A', 'redmi-11a', TRUE, 193),
  ('Xiaomi', 'Redmi 12', 'redmi-12', TRUE, 194),
  ('Xiaomi', 'Redmi 12C', 'redmi-12c', TRUE, 195),
  ('Xiaomi', 'Redmi 13C', 'redmi-13c', TRUE, 196),
  ('Xiaomi', 'Redmi 14C', 'redmi-14c', TRUE, 197),
  ('Xiaomi', 'Redmi 15C', 'redmi-15c', TRUE, 198),
  ('Xiaomi', 'Redmi C55', 'redmi-c55', TRUE, 199),
  ('Xiaomi', 'Redmi C75', 'redmi-c75', TRUE, 200);

-- =============================================
-- CONTENIDO DEL SITIO - Hero
-- =============================================

INSERT INTO site_content (key, value, description, section) VALUES
  ('home.hero.eyebrow', 'Fundas personalizadas · Hecho en Argentina', 'Texto pequeño arriba del título', 'home'),
  ('home.hero.title_line1', 'Fundas que', 'Primera línea del título (cursiva)', 'home'),
  ('home.hero.title_line2', 'te definen.', 'Segunda línea del título (bold)', 'home'),
  ('home.hero.subtitle', 'Tu celular, tu estilo, tu historia. Cada pieza es única como vos.', 'Subtítulo debajo del título', 'home'),
  ('home.hero.cta_primary', 'Ver catálogo', 'Texto del botón principal', 'home'),
  ('home.hero.cta_secondary', 'Personalizar la mía', 'Texto del botón secundario', 'home'),
  ('home.hero.social_proof', '+200 clientes satisfechas', 'Texto de prueba social', 'home'),
  ('home.hero.badge1_title', 'Diseño único', 'Título del badge flotante 1', 'home'),
  ('home.hero.badge1_subtitle', '100% personalizado', 'Subtítulo del badge flotante 1', 'home'),
  ('home.hero.badge2_title', 'Todo el país 🇦🇷', 'Título del badge flotante 2', 'home'),
  ('home.hero.badge2_subtitle', 'Envíos a', 'Subtítulo del badge flotante 2', 'home');

-- =============================================
-- CONTENIDO DEL SITIO - Benefits
-- =============================================

INSERT INTO site_content (key, value, description, section) VALUES
  ('home.benefits.eyebrow', 'Por qué elegirnos', 'Texto pequeño arriba del título', 'home'),
  ('home.benefits.title', 'Lo que nos hace diferentes', 'Título de la sección', 'home'),
  ('home.benefits.item1_title', 'Diseños únicos', 'Título beneficio 1', 'home'),
  ('home.benefits.item1_desc', 'Cada funda es un diseño exclusivo, no hay dos iguales.', 'Descripción beneficio 1', 'home'),
  ('home.benefits.item2_title', 'Personalización completa', 'Título beneficio 2', 'home'),
  ('home.benefits.item2_desc', 'Subí tu foto, pedí tu diseño o elegí del catálogo.', 'Descripción beneficio 2', 'home'),
  ('home.benefits.item3_title', 'Gran variedad de modelos', 'Título beneficio 3', 'home'),
  ('home.benefits.item3_desc', '+100 modelos disponibles. Siempre actualizamos.', 'Descripción beneficio 3', 'home'),
  ('home.benefits.item4_title', 'Atención personalizada', 'Título beneficio 4', 'home'),
  ('home.benefits.item4_desc', 'Hablás directo con la creadora. Sin intermediarios.', 'Descripción beneficio 4', 'home');

-- =============================================
-- CONTENIDO DEL SITIO - How It Works
-- =============================================

INSERT INTO site_content (key, value, description, section) VALUES
  ('home.how.eyebrow', 'El proceso', 'Texto pequeño arriba del título', 'home'),
  ('home.how.title', 'Pedido en 4 pasos', 'Título de la sección', 'home'),
  ('home.how.step1_title', 'Elegís tu modelo', 'Título paso 1', 'home'),
  ('home.how.step1_desc', 'Buscá tu celular entre más de 100 modelos disponibles.', 'Descripción paso 1', 'home'),
  ('home.how.step2_title', 'Elegís tu diseño', 'Título paso 2', 'home'),
  ('home.how.step2_desc', 'Del catálogo o personalizás desde cero con tu idea.', 'Descripción paso 2', 'home'),
  ('home.how.step3_title', 'Enviás el pedido', 'Título paso 3', 'home'),
  ('home.how.step3_desc', 'Todo queda registrado en tu carrito con todos los detalles.', 'Descripción paso 3', 'home'),
  ('home.how.step4_title', 'Coordinamos por WhatsApp', 'Título paso 4', 'home'),
  ('home.how.step4_desc', 'Te contactamos para confirmar, pagar y coordinar la entrega.', 'Descripción paso 4', 'home');

-- =============================================
-- CONTENIDO DEL SITIO - Testimonials
-- =============================================

INSERT INTO site_content (key, value, description, section) VALUES
  ('home.testimonials.eyebrow', 'Lo que dicen', 'Texto pequeño arriba del título', 'home'),
  ('home.testimonials.title', 'Clientes que nos eligen de nuevo', 'Título de la sección', 'home');

-- =============================================
-- CONTENIDO DEL SITIO - CTA Final
-- =============================================

INSERT INTO site_content (key, value, description, section) VALUES
  ('home.cta.eyebrow', 'Empezá ahora', 'Texto pequeño arriba del título', 'home'),
  ('home.cta.title_line1', '¿Lista para tu', 'Primera línea del título', 'home'),
  ('home.cta.title_line2', 'funda perfecta?', 'Segunda línea del título (cursiva)', 'home'),
  ('home.cta.subtitle', 'Diseñada para vos, entregada con amor.', 'Subtítulo', 'home'),
  ('home.cta.button_primary', 'Empezar mi diseño', 'Texto del botón principal', 'home'),
  ('home.cta.button_secondary', 'Ver el catálogo', 'Texto del link secundario', 'home');

-- =============================================
-- CONTENIDO DEL SITIO - FAQ Page
-- =============================================

INSERT INTO site_content (key, value, description, section) VALUES
  ('faq.eyebrow', 'Preguntas frecuentes', 'Texto pequeño arriba del título', 'faq'),
  ('faq.title_line1', 'Todo lo que necesitás', 'Primera línea del título', 'faq'),
  ('faq.title_line2', 'saber', 'Segunda línea del título (cursiva)', 'faq'),
  ('faq.cta_text', '¿Tenés otra duda? Escribinos directamente.', 'Texto antes del botón de WhatsApp', 'faq'),
  ('faq.cta_button', 'Consultá por WhatsApp', 'Texto del botón de WhatsApp', 'faq');

-- =============================================
-- CONTENIDO DEL SITIO - Configuración
-- =============================================

INSERT INTO site_content (key, value, description, section) VALUES
  ('config.brand_name', 'Rina Accesorios', 'Nombre de la marca', 'config'),
  ('config.whatsapp_number', '', 'Número de WhatsApp (sin +)', 'config'),
  ('config.instagram_url', '', 'URL de Instagram', 'config'),
  ('config.tiktok_url', '', 'URL de TikTok', 'config'),
  ('config.email', '', 'Email de contacto', 'config');

-- =============================================
-- FAQ ITEMS
-- =============================================

INSERT INTO faq_items (question, answer, order_index, active) VALUES
  ('¿Qué modelos de celular trabajan?', 'Trabajamos con más de 100 modelos incluyendo iPhone (toda la línea), Samsung Galaxy (S y A series), Motorola, Xiaomi y más. Si no encontrás el tuyo, consultanos por WhatsApp y lo averiguamos.', 1, TRUE),
  ('¿Cuánto tarda en llegar mi pedido?', 'El tiempo de producción es de 5 a 7 días hábiles. Los envíos se coordinan según tu localidad. Pedidos urgentes pueden consultarse de forma especial.', 2, TRUE),
  ('¿Cómo le envío mi foto o diseño?', 'Podés subir tu imagen directamente en la sección de personalización de la web. También podés enviarnos las imágenes por WhatsApp después de hacer tu pedido.', 3, TRUE),
  ('¿Puedo usar mis propias fotos?', 'Absolutamente. Es uno de los pedidos más populares. Cuanto mayor resolución tenga la foto, mejor queda el resultado. Te recomendamos imágenes de al menos 1500px de ancho.', 4, TRUE),
  ('¿Hacen envíos a todo el país?', 'Sí, enviamos a todo el país a través de correo privado y correo argentino. Los costos de envío se coordinan por WhatsApp según tu zona.', 5, TRUE),
  ('¿Cómo se coordina el pago?', 'Los pedidos se cierran por WhatsApp. Coordinamos el pago por transferencia bancaria, Mercado Pago o efectivo según tu preferencia.', 6, TRUE),
  ('¿Puedo pedir una funda como regalo?', '¡Claro! Podés indicarnos que es un regalo y coordinar el envío directamente a la dirección del destinatario.', 7, TRUE),
  ('¿Qué material tienen las fundas?', 'Todas nuestras fundas son de TPU flexible con acabado matte. El diseño se imprime directamente sobre la funda con tintas de alta calidad y durabilidad.', 8, TRUE),
  ('¿Hacen cambios o devoluciones?', 'Dado que son productos personalizados, no aceptamos devoluciones por arrepentimiento. Sin embargo, si hubo un error de producción de nuestra parte, lo resolvemos sin costo.', 9, TRUE),
  ('¿Puedo encargar varias fundas juntas?', 'Sí, de hecho ofrecemos descuentos en pedidos múltiples (3 o más fundas). Consultanos por WhatsApp para coordinar.', 10, TRUE);

-- =============================================
-- PRODUCTOS DE EJEMPLO
-- =============================================

-- Obtener IDs de categorías para relacionar
DO $$
DECLARE
  cat_flores_foto UUID;
  cat_dijes_deco UUID;
  cat_stickers_deco UUID;
  cat_dijes UUID;
  cat_stickers_fotos UUID;
  cat_flores_deco UUID;
  cat_stickers_dijes_deco UUID;
  cat_series UUID;
  cat_artistas UUID;
  cat_flores_dijes_deco UUID;
  cat_straps UUID;
  cat_box UUID;
  cat_llaveros UUID;
  cat_giftcard UUID;
BEGIN
  SELECT id INTO cat_flores_foto FROM categories WHERE slug = 'flores-foto';
  SELECT id INTO cat_dijes_deco FROM categories WHERE slug = 'dijes-deco';
  SELECT id INTO cat_stickers_deco FROM categories WHERE slug = 'stickers-deco';
  SELECT id INTO cat_dijes FROM categories WHERE slug = 'dijes';
  SELECT id INTO cat_stickers_fotos FROM categories WHERE slug = 'stickers-fotos';
  SELECT id INTO cat_flores_deco FROM categories WHERE slug = 'flores-deco';
  SELECT id INTO cat_stickers_dijes_deco FROM categories WHERE slug = 'stickers-dijes-deco';
  SELECT id INTO cat_series FROM categories WHERE slug = 'series';
  SELECT id INTO cat_artistas FROM categories WHERE slug = 'artistas';
  SELECT id INTO cat_flores_dijes_deco FROM categories WHERE slug = 'flores-dijes-deco';
  SELECT id INTO cat_straps FROM categories WHERE slug = 'straps';
  SELECT id INTO cat_box FROM categories WHERE slug = 'box';
  SELECT id INTO cat_llaveros FROM categories WHERE slug = 'llaveros';
  SELECT id INTO cat_giftcard FROM categories WHERE slug = 'gift-card';

  -- Fundas del catálogo
  INSERT INTO products (name, slug, description, category_id, active, featured, order_index) VALUES
    ('Floral Blush', 'floral-blush-01', 'Acuarela floral en tonos blush y sage sobre fondo crema. Delicada y atemporal.', cat_flores_foto, TRUE, TRUE, 1),
    ('Dark Marble', 'dark-marble-01', 'Mármol negro con vetas doradas. Elegancia en cada detalle.', cat_dijes_deco, TRUE, TRUE, 2),
    ('Luna Gradient', 'luna-gradient', 'Degradé lavanda a rosa. Suave, onírico, perfecto como regalo.', cat_stickers_deco, TRUE, FALSE, 3),
    ('Sage Minimal', 'sage-minimal', 'Verde sage con líneas abstractas en dorado. Sofisticado y moderno.', cat_dijes, TRUE, TRUE, 4),
    ('Retro Sunset', 'retro-sunset', 'Paleta retro años 70: terracota, mostaza y marrón tostado.', cat_stickers_fotos, TRUE, FALSE, 5),
    ('White Daisy', 'white-daisy', 'Margaritas blancas sobre fondo negro profundo. Contraste máximo, estilo editorial.', cat_flores_deco, TRUE, TRUE, 6),
    ('Pastel Cloud', 'pastel-cloud', 'Nubes suaves en degradé pastel. Para las que aman lo dreamy.', cat_stickers_dijes_deco, TRUE, FALSE, 7),
    ('Mono Lines', 'mono-lines', 'Líneas geométricas en blanco y negro. Minimalismo llevado al límite.', cat_series, TRUE, FALSE, 8),
    ('K-Pop Vibes', 'kpop-vibes', 'Inspirada en tus artistas favoritos. Photocards y deco personalizada.', cat_artistas, TRUE, TRUE, 9),
    ('Botanical Bloom', 'botanical-bloom', 'Flores secas prensadas con dijes dorados. Naturaleza y elegancia.', cat_flores_dijes_deco, TRUE, FALSE, 10);

  -- Straps
  INSERT INTO products (name, slug, description, category_id, active, featured, order_index) VALUES
    ('Strap Perlas', 'strap-pearls', 'Correa elegante con perlas y cuentas doradas. Ideal para eventos.', cat_straps, TRUE, TRUE, 11),
    ('Strap Multicolor', 'strap-colorful', 'Correa tejida con cuentas de colores vibrantes. Alegre y divertida.', cat_straps, TRUE, FALSE, 12),
    ('Strap Personalizado', 'strap-custom', 'Diseñá tu strap con los colores y charms que más te gusten. Único como vos.', cat_straps, TRUE, TRUE, 13);

  -- Actualizar strap personalizado como whatsapp_only
  UPDATE products SET whatsapp_only = TRUE, whatsapp_message = 'Hola! Quiero consultar sobre un strap personalizado 🎨', price_display = 'A consultar' WHERE slug = 'strap-custom';

  -- Box personalizada
  INSERT INTO products (name, slug, description, category_id, whatsapp_only, whatsapp_message, price_display, active, featured, order_index) VALUES
    ('Box Personalizada', 'box-custom', 'Cajas decoradas a mano para regalo. Perfectas para cumpleaños, aniversarios o fechas especiales.', cat_box, TRUE, 'Hola! Quiero consultar sobre una box personalizada 🎁', 'A consultar', TRUE, TRUE, 14);

  -- Llaveros
  INSERT INTO products (name, slug, description, category_id, whatsapp_only, whatsapp_message, price_display, active, featured, order_index) VALUES
    ('Llavero Personalizado', 'keychain-custom', 'Llaveros únicos con tus fotos, iniciales o diseños favoritos. El complemento ideal.', cat_llaveros, TRUE, 'Hola! Quiero consultar sobre un llavero personalizado 🔑', 'A consultar', TRUE, TRUE, 15);

  -- Gift Card
  INSERT INTO products (name, slug, description, category_id, whatsapp_only, whatsapp_message, price_display, active, featured, order_index) VALUES
    ('Gift Card', 'gift-card', 'Regalá la experiencia de elegir. La persona elige el monto y el diseño que más le guste.', cat_giftcard, TRUE, 'Hola! Quiero consultar sobre una Gift Card 🎀', 'A consultar', TRUE, TRUE, 16);

END $$;

-- =============================================
-- IMÁGENES DE PRODUCTOS (placeholder URLs)
-- =============================================

INSERT INTO product_images (product_id, url, alt, order_index, is_primary)
SELECT p.id, 'https://picsum.photos/seed/' || p.slug || '/480/640', p.name, 0, TRUE
FROM products p;
