import CountUp from "react-countup";
const About = () => {
    return (
        <div className="mt-10 bg-black text-white p-2 md:flex md:flex-col md:items-center">
          <h2 className="text-5xl sm:text-center mt-4">About Me</h2>

          <p className="mt-4 sm:text-center md:w-2/3 lg:text-xl lg:w-4/5">
          A brief intro about me. My name is Garvin Chimone. 
          I am web developer with a focus on the frontend. Currently 
          working at Growit MC.
          </p>

          <h2 className="text-5xl mt-6 mb-6 w-full text-center">Extras</h2>

          <h3 className="text-3xl lg:text:4xl w-full text-center mb-1">Age</h3>
          <p className="text-md w-full lg:text-xl text-center mb-4"><CountUp start={0} end={22} duration={3} enableScrollSpy /></p>

          <h3 className="text-3xl lg:text:4xl w-full text-center mb-1">Commits</h3>
          <p className="text-md w-full lg:text-xl text-center mb-4"><CountUp start={0} end={2605} duration={5} enableScrollSpy /></p>

          <h3 className="text-3xl lg:text:4xl w-full text-center mb-1">Currently Reading</h3>
          <p className="text-md w-full lg:text-xl text-center mb-4">The Bourne Trilogy</p>

          <h3 className="text-3xl lg:text:4xl w-full text-center mb-1">Dream Destination</h3>
          <p className="text-md w-full lg:text-xl text-center mb-4">Lake Como</p>
        </div>
    )
}

export default About