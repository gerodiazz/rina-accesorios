import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { signIn, isAuthenticated } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    navigate('/admin', { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await signIn(email, password)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      navigate('/admin', { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-light text-[#1A1A1A] mb-2">
              Panel de Admin
            </h1>
            <p className="font-sans text-sm text-[#6B6B6B]">
              Ingresá con tu cuenta
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block font-sans text-sm font-medium text-[#1A1A1A] mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#E5E2DC] bg-white font-sans text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-sans text-sm font-medium text-[#1A1A1A] mb-1.5"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#E5E2DC] bg-white font-sans text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg font-sans text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-sans font-medium text-white bg-[#1A1A1A] hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 font-sans text-xs text-[#6B6B6B]">
          Rina Accesorios · Panel de administración
        </p>
      </div>
    </div>
  )
}
