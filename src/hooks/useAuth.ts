import { useState, useEffect, useCallback } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { signIn as authSignIn, signOut as authSignOut, getSession, onAuthStateChange } from '../services/auth'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true
  })

  useEffect(() => {
    getSession().then(session => {
      setState({
        user: session?.user ?? null,
        session,
        loading: false
      })
    })

    const { data: { subscription } } = onAuthStateChange(session => {
      setState({
        user: session?.user ?? null,
        session,
        loading: false
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true }))
    const result = await authSignIn(email, password)
    setState(prev => ({ ...prev, loading: false }))
    return result
  }, [])

  const signOut = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }))
    await authSignOut()
    setState({ user: null, session: null, loading: false })
  }, [])

  return {
    ...state,
    signIn,
    signOut,
    isAuthenticated: !!state.session
  }
}
