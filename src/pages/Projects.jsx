import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from("Projects").select("*");

      if (error) {
        setErrorMsg(error.message);
      } else {
        setProjects(data);
        console.log(data);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>Error: {errorMsg}</p>;

  return (
    <div className="h-full md:h-screen w-screen overflow-y-auto bg-white text-black flex flex-col px-6 md:px-10 py-8 md:py-1 mt-3">
      <h1 className="my-10 text-3xl font-bold tracking-tight sm:my-12 sm:text-4xl md:my-16 md:text-5xl">
        <Link className="underline" to="/">
          Garvin Chimone
        </Link>{" "}
        / Projects
      </h1>

      <ul className="-mx-6 mt-8 w-[calc(100%+3rem)] text-purple-700 md:-mx-10 md:w-[calc(100%+5rem)]">
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              to={`/projects/${project.id}`}
              className="flex items-center justify-between border-y border-solid border-purple-700 px-6 py-5 hover:bg-purple-700 hover:text-white md:px-10"
            >
              <div className="flex items-center gap-5">
                <h3>{project.name}</h3>
                <p>{project.short_desc}</p>
              </div>
              <FontAwesomeIcon icon={faArrowRight} size="lg" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
