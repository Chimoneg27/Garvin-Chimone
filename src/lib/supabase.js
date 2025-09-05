import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

export async function addBook(payload) {
  const { data, error } = await supabase.functions.invoke('add-book', {
    method: 'POST',
    body: payload,
    headers: { Authorization: `Bearer ${await supabase.auth.getSession().then(r=>r.data.session?.access_token)}` }
  })

  if (error) throw error
  return data
}