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
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
// import { useState } from "react";

export default function EditorPage() {
  return (
    <MDXEditor
      markdown={"Hello Garvin"}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
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
            </>
          ),
        }),
      ]}
    />
  );
}
