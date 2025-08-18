import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import { supabase } from '../lib/supabase'

import type { Session, User } from '@supabase/supabase-js'

type Ctx = {
  session: Session | null
  user: User | null
  signIn: (email: string, password: string) => Promise<Error | null>
  signUp: (email: string, password: string) => Promise<Error | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<Ctx | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session ?? null))
      .catch(error => {
        console.error('Supabase getSession failed:', error)
        setSession(null)
      })

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(s),
    )

    return () => sub?.subscription?.unsubscribe()
  }, [])

  const signIn: Ctx['signIn'] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return error ?? null
  }

  const signUp: Ctx['signUp'] = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password })
    return error ?? null
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
