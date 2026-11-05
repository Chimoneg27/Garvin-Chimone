import NavBar from "../components/navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const formatTime = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Johannesburg",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

const Home = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(formatTime(new Date()));
    const id = setInterval(() => setTime(formatTime(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <NavBar />

      <main className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16 lg:px-10">
        <div className="flex w-full flex-col gap-5 font-extralight tracking-tight sm:gap-6">
          <h1 className="font-bold tracking-tight sm:my-8 md:my-10">
            Garvin Chimone
          </h1>

          <p className="w-full text-3xl max-w-6xl text-left leading-relaxed sm:text-lg md:text-xl lg:text-2xl">
            I&apos;m a <b className="font-medium text-purple-700">Frontend-Focused Full-Stack Software Engineer</b>.
            I build web apps with React, TypeScript, Node.js, Supabase
            and PostgreSQL, and I also have hands-on experience with Angular.
            Previously I&apos;ve worked at Kasi Connect KC and Growit MC. Most of my
            work sits on the frontend, but I like owning a feature end to end,
            from the database schema to the UI. I&apos;m now learning AWS cloud and
            working toward AWS certifications, because I want to understand how
            the apps I build are deployed, secured and scaled. Besides code, I
            enjoy <Link className="underline" to="/books">reading</Link>, mathematics and currently learning Spanish. I live
            in <b className="font-medium text-purple-700">Benoni, South Africa</b> where the local time is{" "}
            <span className="whitespace-nowrap tabular-nums font-medium text-purple-700">{time}</span>. Thanks for stopping by.
          </p>

          <p className="w-full text-3xl max-w-6xl text-left leading-relaxed sm:text-lg md:text-xl lg:text-2xl">
            You can view some of my <Link to="/projects" className="underline">projects</Link> here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
