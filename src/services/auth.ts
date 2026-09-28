import { supabase, supabaseConfigured } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  if (!supabaseConfigured) {
    return { user: null, error: 'Supabase no está configurado' }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return { user: null, error: error.message }
  }

  return { user: data.user, error: null }
}

export async function signOut(): Promise<void> {
  if (!supabaseConfigured) return
  await supabase.auth.signOut()
}

export async function getSession(): Promise<Session | null> {
  if (!supabaseConfigured) return null

  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUser(): Promise<User | null> {
  if (!supabaseConfigured) return null

  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export function onAuthStateChange(callback: (session: Session | null) => void) {
  if (!supabaseConfigured) return { data: { subscription: { unsubscribe: () => {} } } }

  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
}
