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
  BlockTypeSelect
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useState } from "react";

export default function EditorPage() {
  const [body, setBody] = useState('# Start here')

  return (
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
  );
}
