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

export async function addBlog(payload) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("No active session");
  }

  const { data, error } = await supabase.functions.invoke("add-blog", {
    body: payload,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) throw error;
  return data;
}

export async function bookStatus(payload) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("No active session");
  }

  const { data, error } = await supabase.functions.invoke(
    "update-book-status",
    {
      body: payload,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  if (error) throw error;
  return data;
}

export const getMyBooks = async () => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("name");

  if (error) throw error;

  return { data };
};


export const getMyProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at");

  if (error) throw error;

  return { data };
};

export const getMyBlogs = async () => {
  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .order("created_at")

    if (error) throw error

  return { data }
}

export const getBlogsById = async (id) => {
  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    throw error
  }

  return data
}

export const getBookById = async (id) => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getMovieShowById = async (id) => {
  const { data, error } = await supabase
    .from("movies_shows")
    .select("*")
    .eq("id", id)
    .single()
    .order("name");

  if (error) {
    throw error;
  }

  return data;
};

export async function addMovieShow(payload) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("No active session");
  }

  const { data, error } = await supabase.functions.invoke("add-movie-show", {
    body: payload,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) throw error;
  return data;
}

export async function favBook(payload) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("No active session");
  }

  const { data, error } = await supabase.functions.invoke("favorite-book", {
    body: payload,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) throw error;
  return data;
}

export async function favMovieShow(payload) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("No active session");
  }

  const { data, error } = await supabase.functions.invoke(
    "movie-show-favorite",
    {
      body: payload,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  if (error) throw error;
  return data;
}

export async function movieShowStatus(payload) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("No active session");
  }

  const { data, error } = await supabase.functions.invoke(
    "update-movie-show-status",
    {
      body: payload,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  if (error) throw error;
  return data;
}

export async function getMovieShows(page = 1, limit = 20) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("movies_shows")
    .select("*", { count: "exact" })
    .order("created_at")
    .range(from, to);

  if (error) {
    throw error;
  }

  return { data, count };
}
