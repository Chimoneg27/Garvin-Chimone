import SplitText from "../components/SplitText";
import basq from "../assets/Basquiat.jpeg";
import cv from "../assets/GarvinCV.pdf";
import Slider from "../components/Slider";
import geye from "../assets/GEYE.jpg";
import BasicForm from "../components/BasicForm";
import Footer from "../components/Footer";
import { useTheme } from "../components/ThemeContext";
import Navbar from "../components/Navbar";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

function handleClick() {
  const link = document.createElement("a");
  const pdfURL = cv;
  link.href = pdfURL;
  link.setAttribute("download", "GarvinCV.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Dev() {
  const { color } = useTheme();
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="w-11/12 md:w-4/5 flex flex-col md:flex-row items-center justify-start gap-12 p-6 mt-20 mx-auto">
        <div className="w-full md:w-3/5 flex flex-col items-center md:items-start">
          <div className="w-full">
            <SplitText
              text="Garvin Chimone"
              className="text-4xl sm:text-5xl md:text-7xl font-semibold w-full text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </div>
          <p className="mt-3 text-xl md:text-2xl font-bold w-full text-center md:text-left">
            Software engineer with expertise in crafting seamless <br />
            front-end and robust back-end solutions.
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-2/5 flex justify-center">
          <img
            src={geye}
            alt="Garvin Basq Logo"
            className="max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-md object-contain"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="w-11/12 md:w-4/5 flex flex-col md:flex-row-reverse items-center gap-12 p-6 md:p-10 mt-20 mx-auto">
        {/* Text */}
        <div className="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-semibold">About</h2>
          <h1
            className="text-3xl md:text-4xl mt-6 font-semibold"
            style={{ color }}
          >
            Who Am I
          </h1>
          <p className="mt-3 text-lg md:text-xl font-semibold">
            I&apos;m Garvin Chimone, a full-stack software engineer with experience
            in both frontend and backend development. I&apos;ve worked with
            technologies like React, TypeScript, Node.js, Supabase, and React
            Native...
          </p>

          <div className="mt-8 md:mt-12 w-full md:w-4/5 flex flex-col items-center md:items-start">
            <h2 className="text-2xl md:text-3xl font-bold">My CV</h2>
            <button
              onClick={handleClick}
              className="p-3 rounded-lg text-lg font-bold text-white w-full md:w-auto mt-3 bg-black"
              style={{ backgroundColor: color }}
            >
              Download CV
            </button>
          </div>
        </div>
        <div className="w-full md:w-2/5 flex justify-center">
          <img
            src={basq}
            alt="Garvin Basq Logo"
            className="max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-md object-contain"
          />
        </div>
      </div>

      {/* Tech Slider */}
      <div className="w-full flex flex-col justify-center items-center mt-12 mb-12 p-5">
        <h2
          className="w-11/12 md:w-4/5 text-4xl sm:text-5xl md:text-6xl text-center font-bold mb-10"
          style={{ color }}
        >
          The Tech I Use
        </h2>
        <Slider />
      </div>

      {/* Contact Form */}
      <div className="p-6 flex flex-col justify-center items-center">
        <h2
          className="text-4xl sm:text-5xl md:text-7xl font-bold w-full text-center"
          style={{ color }}
        >
          Contact Me
        </h2>
        <p className="text-center w-11/12 md:w-4/5 text-lg md:text-xl font-bold mt-2 mb-6">
          Want to hire me or want to connect? Fill in the form below
        </p>
        <BasicForm />
      </div>

      <Footer />
    </div>
  );
}