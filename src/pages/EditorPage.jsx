import {MDXEditor, headingsPlugin} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { useState } from 'react';

export default function EditorPage() {
  return <MDXEditor markdown={'# Hello Garvin'} plugins={[headingsPlugin()]} />;
}