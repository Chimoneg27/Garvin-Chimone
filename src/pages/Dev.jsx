import SplitText from "../components/SplitText";
// import garvin from '../assets/garvin.png'
import basq from "../assets/Basquiat.jpeg";

const modules = import.meta.glob('../assets/*.svg', { eager: true, query: '?url', import: 'default'})
const svgImages = Object.values(modules)

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
            Software engineer with expertise in crafting seamless <br />
            front-end and robust back-end solutions.
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

      <div className="w-4/5 flex flex-row-reverse items-center justify-start gap-12 p-10 mt-20 mr-auto ml-auto">
        <div className="w-3/5 flex flex-col items-start">
          <h2 className="text-xl font-semibold">About</h2>

          <h1 className="text-3xl font-semibold">Who Am I</h1>
          <p className="text-left pl-2 mt-3 text-lg font-light w-12/12">
            I’m Garvin Chimone, a full-stack software engineer with experience
            in both frontend and backend development. I’ve worked with
            technologies like React, TypeScript, Node.js, Supabase, and React
            Native to build web and mobile applications. Currently, I’m
            sharpening my expertise by shipping real projects, experimenting
            with Supabase Edge Functions, and exploring secure, scalable
            architectures. My mission is to grow into a highly capable engineer
            — building products that don’t just work, but scale — while
            developing the technical depth to take ideas from vision to reality.
          </p>

          <div className="mt-12">
            <h2 className="text-2xl font-bold">Tech Stack</h2>

            <ul className="list-none flex gap-3 flex-wrap mt-16">
              {
                svgImages.map((src, i) => (
                  <li key={i} className="w-20 h-20">
                    <img  src={src} alt={`imgae-${i}`} className="w-20 h-20"/>
                  </li>
                ))
              }
            </ul>
          </div>
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
