import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../auth/AuthProvider";

export function useUserRole() {
  const { user } = useAuth()
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchuseUserRole() {
      if(!user) {
        setRole(null)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

          if (error) throw error
          setRole(data?.role || null)
      } catch (err){
        setError(err.message)
        setRole(null)
      } finally {
        setLoading(false)
      }
    }

    fetchuseUserRole()
  }, [user])

  const isAdmin = role === 'admin'
  const isUser = role === 'user'

  return {
    role, 
    loading,
    error,
    isAdmin,
    isUser
  }
}