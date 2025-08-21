import { useTheme } from "./ThemeContext";
import "../styles/index.css";

export default function Footer() {
  const {toggleColor, color} = useTheme()

  return (
    <div>
      <h2 className="text-black text-4xl">Purple</h2>
      <ul className={`h-1/3 w-full p-5`} style={{ backgroundColor: color }}>
        <li
          className="footerCircle w-5 h-5 bg-black"
          onClick={() => toggleColor("black")}
        ></li>
        <li
          className="footerCircle w-5 h-5"
          onClick={() => toggleColor("orange")}
        ></li>
      </ul>
    </div>
  );
}
