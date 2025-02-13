const Projects = ({ gitArr }) => {
  return (
      <div className="w-full p-3 flex flex-col items-center h-auto">
        <h2 className="text-3xl lg:text-4xl text-center font-semibold mt-4 mb-4 w-full">Here are some of my projects</h2>
        
        <div className="p-3 w-full mt-5 flex flex-col items-center justify-center lg:h-auto">
          {
            gitArr.map((project) => {
              return (
                <div key={project.id} className="w-11/12  mt-3 mb-3 flex flex-col items-center justify-between border border-black p-2 rounded-md h-52">
                  <h3 className="text-xl lg:text-3xl font-bold">{project.name}</h3>

                  {project.description === null ? <p className="text-lg lg:text-xl">No description yet</p> : <p className="text-lg lg:text-2xl text-center">{project.description}</p>}

                  <p className="lg:text-xl">Main Language: {project.language}</p>

                  <button className="border-black border-2 p-1 font-bold rounded-sm">
                    <a href={project.html_url} target="_blank">PROJECT REPO</a>
                  </button>
                </div>
              )
            })
          }
        </div>

        <button className="border-black border-2 p-1 font-bold rounded-sm w-1/2 hover:bg-black hover:text-white lg:w-44">
          <a href="https://github.com/Chimoneg27?tab=repositories" target="_blank">See More</a>
        </button>
      </div>
  )
}

export default Projects