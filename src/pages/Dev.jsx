import SplitText from "../components/SplitText";
// import garvin from '../assets/garvin.png'
import basq from "../assets/Basquiat.jpeg";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export default function Dev() {
  return (
    <div>
      <div className="w-4/5 flex items-center justify-start gap-12 p-6 mt-20 mr-auto ml-auto">
        <div className="w-3/5 flex flex-col items-start">
          <SplitText
            text="Garvin Chimone"
            className="text-7xl font-semibold text-left"
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
          <p className="text-left pl-2 mt-3 text-xl font-bold w-9/12">
            Software engineer with expertise in crafting seamless <br/>front-end and
            robust back-end solutions.
          </p>
        </div>

        <div className="w-2/5 flex justify-center">
          <img
            src={basq}
            alt="Garvin Basq Logo"
            className="max-w-xs md:max-w-sm lg:max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
}
