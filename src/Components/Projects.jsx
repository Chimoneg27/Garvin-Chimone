const Projects = ({ gitArr }) => {
    return (
        <div className="w-full p-3 flex flex-col items-center">
          <h2 className="text-3xl text-center font-semibold mt-4 mb-4 w-full">Here are some of my projects</h2>
          
          <div className="p-3 w-full mt-5 flex flex-col items-center justify-center">
            {
              gitArr.map((project) => {
                return (
                  <div key={project.id} className="w-11/12 h-40 mt-3 mb-3 flex flex-col items-center justify-between border border-black p-2 rounded-md">
                    <h3 className="text-xl font-bold">{project.name}</h3>

                    {project.description === null ? <p className="text-lg">No description yet</p> : <p className="text-lg text-center">{project.description}</p>}

                    <p>Main Language: {project.language}</p>

                    <button className="border-black border-2 p-1 font-bold rounded-sm">
                      <a href={project.html_url} target="_blank">PROJECT REPO</a>
                    </button>
                  </div>
                )
              })
            }
          </div>
        </div>
    )
}

export default Projects