/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";
import typography from '@tailwindcss/typography';

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
  ],
});