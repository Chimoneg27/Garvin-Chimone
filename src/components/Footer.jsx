import { useTheme } from "./ThemeContext";
import "../styles/index.css";

export default function Footer() {
  const { toggleColor } = useTheme();

  return (
    <div className="p-6 flex flex-col justify-start items-start bg-gray-100 mt-8 relative bottom-0 w-full">
      <ul
        className={`h-1/3 w-auto p-2 flex items-center gap-2 flex-wrap rounded-lg`}
      >
        <li
          className="footerCircle w-5 h-5 bg-black flex items-center justify-center"
          onClick={() => toggleColor("black")}
        ></li>
        <li
          className="footerCircle w-5 h-5 bg-orange-700"
          onClick={() => toggleColor("#ffa200")}
        ></li>
        <li
          className="footerCircle w-5 h-5 bg-purple-700"
          onClick={() => toggleColor("#970fd1")}
        ></li>
        <li
          className="footerCircle w-5 h-5 bg-pink-300"
          onClick={() => toggleColor("#ff00e1")}
        ></li>
        <li
          className="footerCircle w-5 h-5 bg-blue-800"
          onClick={() => toggleColor("#0805e3")}
        ></li>
      </ul>
        <div className="ml-4 text-sm text-gray-600 flex items-center mt-4 w-full justify-center">
          <span aria-hidden="true">©</span>
          <span className="ml-1">Garvin Chimone <span className="sr-only">Copyright</span>{' '}{new Date().getFullYear()}</span>
        </div>
    </div>
  );
}
