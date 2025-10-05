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
  InsertImage
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useState } from "react";

export default function EditorPage() {
  const [body, setBody] = useState('')

  return (
    <MDXEditor
      markdown={body}
      onChange={(newMarkdown) => setBody(newMarkdown)}
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
              <InsertImage />
            </>
          ),
        }),
      ]}
    />
  );
}

/*
import { useState } from 'react'
import { MDXEditor } from '@mdxeditor/editor'
import { headingsPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

function App() {
  const [body, setBody] = useState('# Hello world')

  return (
    <MDXEditor
      markdown={body}
      onChange={(newMarkdown) => setBody(newMarkdown)} // update state safely
      plugins={[headingsPlugin()]}
    />
  )
}

export default App
*/