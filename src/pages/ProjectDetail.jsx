import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link, useParams } from "react-router";

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
        / <Link className="underline">Projects</Link>{" "}
        / {project.name}
      </h1>
    </div>
  );
};

export default ProjectDetail;
