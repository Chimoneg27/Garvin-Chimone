const Projects = ({ gitArr }) => {
    return (
        <div className="w-full p-3 flex flex-col items-center">
          <h2 className="text-4xl font-bold mt-4 mb-4">Here are some of my projects</h2>
          
          <div className="p-3 w-9/12 mt-5 flex flex-col items-center justify-center">
            {
              gitArr.map((project) => {
                return (
                  <div key={project.id} className="w-4/5 h-40 mt-3 mb-3 flex flex-col items-center justify-between border border-black p-2 rounded-md">
                    <h3 className="text-2xl font-bold">{project.name}</h3>

                    {project.description === null ? <p className="text-xl">No description yet</p> : <p className="text-xl">{project.description}</p>}

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