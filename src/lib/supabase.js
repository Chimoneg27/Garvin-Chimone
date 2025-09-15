import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function addBook(payload) {
  // Get the session first
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("No active session");
  }

  const { data, error } = await supabase.functions.invoke("add-book", {
    body: payload,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) throw error;
  return data;
}

export async function bookStatus(payload) {
  const { data: {session} } = await supabase.auth.getSession()

  if (!session?.access_token) {
    throw new Error("No active session")
  }

  const { data, error } = await supabase.functions.invoke('update-book-status', {
    body: payload,
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  })

  if (error) throw error
  return data
}

export const getMyBooks = async () => {
  const { data, error } = await supabase
    .from('books')
    .select("*")

  if(error) {
    throw error
  }

  return data
}

export async function addMovieShow(payload) {
  const { data: { session }, } = await supabase.auth.getSession()

  if (!session?.access_token) {
    throw new Error("No active session")
  }

  const { data, error } = await supabase.functions.invoke("add-movie-show", {
    body: payload,
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  })

  if(error) throw error
  return data
}

export async function movieShowStatus(payload) {
  const { data: {session} } = await supabase.auth.getSession()

  if(!session?.access_token) {
    throw new Error("No active session")
  }

  const { data, error } = await supabase.functions.invoke("update-movie-show-status", {
    body: payload,
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  })

  if(error) throw error
  return data
}

export async function getMovieShows() {
  const { data, error } = await supabase.from("movies_shows").select("*")

  if (error) {
    throw error
  }

  return data
}
