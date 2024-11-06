const Projects = ({gitArr}) => {
    return (
        <div className="w-3/4 p-3">
          <h2 className="text-3xl font-bold mt-4">Here are some of my projects</h2>

            {
              gitArr.map((project) => {
                return (
                  <div key={project.id}>
                    <h3>{project.name}</h3>
                  </div>
                )
              })
            }
        </div>
    )
}

export default Projects