import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link, useParams } from "react-router";
import Carousel from "../components/carousel";

const ProjectDetail = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const { id } = useParams();

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

  const project = projects.find((p) => String(p.id) === id);

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>Error: {errorMsg}</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div className="h-full md:h-screen w-screen overflow-y-auto bg-white text-black flex flex-col px-6 md:px-10 py-8 md:py-1 mt-3">
      <h1 className="my-10 text-3xl font-bold tracking-tight sm:my-12 sm:text-4xl md:my-16 md:text-5xl">
        <Link className="underline" to="/">
          Garvin Chimone
        </Link>{" "}
        /{" "}
        <Link className="underline" to="/projects">
          Projects
        </Link>{" "}
        / {project.name}
      </h1>

      <ul className="space-y-6">
        <li className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-16">
          <h4>Link</h4>
          <a
            href={`https://preview--playful-design-start.lovable.app/`}
            className="underline"
          >
            {project.name}
          </a>
        </li>
        <li className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-16">
          <h4 className="shrink-0">Tech</h4>
          <div className="flex flex-wrap">
            {project.tech_stack?.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-gray-200 px-3 py-1.5 text-sm font-medium text-black"
              >
                {tech}
              </span>
            ))}
          </div>
        </li>
      </ul>

      <p className="text-2xl mt-14">{project.full_desc}</p>

      <Carousel images={project.images} />
    </div>
  );
};

export default ProjectDetail;
