import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { SiteContentProvider } from './context/SiteContentContext'
import { Layout } from './components/layout/Layout'
import { AdminRoute } from './components/admin/AdminRoute'
import { AdminLayout } from './components/admin/AdminLayout'

import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Personalization from './pages/Personalization'
import Cart from './pages/Cart'
import FAQ from './pages/FAQ'

import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminProductEdit from './pages/admin/ProductEdit'
import AdminCategories from './pages/admin/Categories'
import AdminPhoneModels from './pages/admin/PhoneModels'
import AdminContent from './pages/admin/Content'
import AdminImages from './pages/admin/Images'
import AdminFaq from './pages/admin/Faq'
import AdminSettings from './pages/admin/Settings'

export default function App() {
  return (
    <AuthProvider>
      <SiteContentProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/catalogo/:id" element={<ProductDetail />} />
            <Route path="/personalizar" element={<Personalization />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/faq" element={<FAQ />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="productos" element={<AdminProducts />} />
              <Route path="productos/:id" element={<AdminProductEdit />} />
              <Route path="categorias" element={<AdminCategories />} />
              <Route path="modelos" element={<AdminPhoneModels />} />
              <Route path="contenido" element={<AdminContent />} />
              <Route path="imagenes" element={<AdminImages />} />
              <Route path="faq" element={<AdminFaq />} />
              <Route path="configuracion" element={<AdminSettings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </SiteContentProvider>
    </AuthProvider>
  )
}
