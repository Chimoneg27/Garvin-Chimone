import { useState } from "react";
import { addBook } from "../lib/supabase";

export default function BookForm() {
  const [form, setForm] = useState({
    name: "",
    author: "",
    date_published: "",
    cover_image_url: "",
    genres: "",
    description: "",
    read: false,
    reading: false,
    likes: 0,
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
      author: form.author.trim(),
      date_published: form.date_published
        ? new Date(form.date_published).toISOString()
        : undefined,
      cover_image_url: form.cover_image_url?.trim() || undefined,
      genres: form.genres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      description: form.description?.trim() || undefined,
      read: form.read,
      want_to_read: form.want_to_read,
      reading: form.reading,
    };

    if(!payload.name || !payload.author || payload.genres.length === 0) {
      setStatus('error')
      setMsg('Please provide a title, author and at least one genre.')
    }

    try {
      const result = await addBook(payload)
      console.log('Edge response →', result);
      setStatus('success')
      setMsg("Book added successfully!")
    } catch (err){
      console.error(err)
      setStatus('error')
      setMsg(err.message || 'Something went wrong or you are not allowed to add books')
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          Add a Book
        </h2>

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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Author*
            </label>
            <input
              name='author'
              required
              value={form.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Published Date
            </label>
            <input
              name="date_published"
              type="date"
              value={form.date_published}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Cover Image URL
            </label>
            <input
              name='cover_image_url'
              type="url"
              value={form.cover_image_url}
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

        {/* ---Boolean flags--- */}
        <fieldset className="border border-gray-200 rounded-lg p-4 space-y-4">
          <legend className="text-lg font-medium text-gray-900 px-2">Reading Status</legend>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox"
                name="read"
                checked={form.read}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Read</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="want_to_read"
                checked={form.want_to_read}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Want to read</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type='checkbox'
                name="reading"
                checked={form.reading}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Currently reading</span>
            </label>
          </div>
        </fieldset>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'loading' ? 'Saving...' : 'Add Book'}
          </button>
        </div>

        {status === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm font-medium">{msg}</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm font-medium">{msg}</p>
          </div>
        )}
      </form>
    </div>
  );
}
