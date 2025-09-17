import { useState } from "react";
import { addMovieShow } from "../lib/supabase";

export default function MovieShowForm() {
  const [form, setForm] = useState({
    name: "",
    starring: "",
    director: "",
    genres: "",
    poster_url: "",
    banner_url: "",
    description: "",
    year_released_date: "",
    watching: false,
    want_to_watch: false,
    watched: false,
  });

  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    const payload = {
      name: form.name.trim(),
      director: form.director.trim(),
      genres: form.genres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      starring: form.starring
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      year_released_date: form.year_released_date
        ? new Date(form.year_released_date).toISOString()
        : undefined,
      poster_url: form.poster_url?.trim() || undefined,
      banner_url: form.banner_url?.trim() || undefined,
      description: form.description?.trim() || undefined,
      watched: form.watched,
      watching: form.watching,
      want_to_watch: form.want_to_watch,
    };

    if (!payload.name || !payload.director || payload.genres === 0) {
      setStatus("error");
      setMsg("Please provide a title, director and at least one genre");
    }

    try {
      const result = await addMovieShow(payload);
      console.log("Edge response →", result);
      setStatus("success");
      setMsg("Movie/Show added successfully!");
      setForm({
        name: "",
        director: "",
        genres: "",
        starring: "",
        year_released_date: "",
        poster_url: "",
        banner_url: "",
        description: "",
        watched: false,
        watching: false,
        want_to_watch: false,
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMsg(
        err.message || "Someething went wrong, you can't add a movie or show"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          Add A Movie Or Show
        </h2>
        {/*Movie title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title*
            </label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          {/*director*/}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Director*
            </label>
            <input
              name="director"
              required
              value={form.director}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Published Date
            </label>
            <input
              name="year_released_date"
              type="date"
              value={form.year_released_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Cover Image URL
            </label>
            <input
              name="poster_url"
              type="url"
              value={form.poster_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Cover Image URL
            </label>
            <input
              name="banner_url"
              type="url"
              value={form.banner_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Genres* (comma-separated)
          </label>
          <input
            name="genres"
            required
            placeholder="e.g. fiction, mystery"
            value={form.genres}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Starring* (comma-separated)
          </label>
          <input
            name="starring"
            required
            placeholder="e.g. fiction, mystery"
            value={form.starring}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
          />
        </div>

        <fieldset className="border border-gray-200 rounded-lg p-4 space-y-4">
          <legend className="text-lg font-medium text-gray-900 px-2">
            Watch Status
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="watched"
                checked={form.watched}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Watched</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="want_to_watch"
                name="want_to_read"
                checked={form.want_to_watch}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Want to watch
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="watching"
                checked={form.watching}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Currently watching
              </span>
            </label>
          </div>
        </fieldset>

        <div className="pt-4">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === "loading" ? "Saving..." : "Add Book"}
          </button>
        </div>

        {status === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm font-medium">{msg}</p>
          </div>
        )}

        {status === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm font-medium">{msg}</p>
          </div>
        )}
      </form>
    </div>
  );
}
