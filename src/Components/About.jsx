import MetaBalls from "../Animations/MetaBalls/MetaBalls"

const About = () => {
    return (
        <div className=" flex flex-row mt-10 text-gray-600 p-2 about w-[70%] border border-s-orange-200 h-96">
          <div className="w-3/5 h-auto">
            <h1 className="text-3xl heading">Software Developer With A Focus On Web Development</h1>

            <p>I&apos;m Garvin Chimone, a Full-Stack web developer passionate about learning and building
              software that is beneficial to developers and the world at large.
            </p>
          </div>
          <div className="w-2/5 bg-white">
            <MetaBalls 
            />
          </div>
        </div>
    )
}

export default About