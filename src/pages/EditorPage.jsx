import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  CodeToggle,
  StrikeThroughSupSubToggles,
  ListsToggle,
  Separator,
  linkDialogPlugin,
  InsertCodeBlock,
  CreateLink,
  imagePlugin,
  InsertImage,
  BlockTypeSelect,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function EditorPage() {
  const [body, setBody] = useState("# Start here");
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    author: "",
    body: body,
    banner: "",
    tags: "",
    date_published: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    setMsg("")

    const payload = {
      author: form.author.trim(),
      body: form.body.trim(),
      date_published: form.date_published
        ? new Date(form.date_published).toISOString()
        : undefined,
      banner: form.banner?.trim() || undefined,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    }

    if (!payload.author || !payload.body) {
      setStatus("error")
      setMsg("Please provide the author and a proper blog post")
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Add Blog Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Author*
              </label>
              <input
                name="author"
                required
                value={form.author}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Banner URL*
              </label>
              <input
                name="banner"
                required
                value={form.banner}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Image URL*
              </label>
              <input
                name="image"
                required
                value={form.image}
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
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tags* (comma-separated)
            </label>
            <input
              name="tags"
              required
              placeholder="e.g. personal, tech, notes, python"
              value={form.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </form>
      </div>

      <MDXEditor
        markdown={body}
        onChange={(newMarkdown) => setBody(newMarkdown)}
        contentEditableClassName="prose"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          toolbarPlugin({
            toolbarClassName: "tools",
            toolbarContents: () => (
              <>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <ListsToggle />
                <Separator />
                <StrikeThroughSupSubToggles />
                <Separator />
                <CreateLink />
                <InsertCodeBlock />
                <BlockTypeSelect />
                <InsertImage />
              </>
            ),
          }),
        ]}
      />
      <button className="ml-3 p-3 text-white bg-black font-bold w-36 text-center rounded-md active:bg-gray-600">
        Submit Blog
      </button>
    </div>
  );
}
