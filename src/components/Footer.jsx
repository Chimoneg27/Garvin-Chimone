import { useTheme } from "./ThemeContext";
import "../styles/index.css";

export default function Footer() {
  const { toggleColor } = useTheme();
  
  return (
    <footer className=" bottom-0 left-0 right-0 p-6 flex flex-col items-center bg-gray-100 w-full z-10">
      <ul className="flex items-center justify-center gap-3 flex-wrap mb-4 list-none m-0 p-0">
        <li
          className="footerCircle w-9 h-9 bg-black cursor-pointer hover:scale-110 transition-transform"
          onClick={() => toggleColor("black")}
        ></li>
        <li
          className="footerCircle w-9 h-9 bg-orange-700 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => toggleColor("#ffa200")}
        ></li>
        <li
          className="footerCircle w-9 h-9 bg-purple-700 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => toggleColor("#970fd1")}
        ></li>
        <li
          className="footerCircle w-9 h-9 bg-pink-300 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => toggleColor("#ff00e1")}
        ></li>
        <li
          className="footerCircle w-9 h-9 bg-blue-800 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => toggleColor("#0805e3")}
        ></li>
      </ul>
      
      <div className="text-sm text-gray-600 text-center w-full mt-4">
        © Garvin Chimone {new Date().getFullYear()}
      </div>
    </footer>
  );
}