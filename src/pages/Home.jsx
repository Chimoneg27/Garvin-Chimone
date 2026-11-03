import NavBar from "../components/navbar";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen w-screen bg-white text-black">
      <NavBar />

      <main className="px-6 md:px-10 pb-16 flex flex-col items-center">
        <div className="max-w-7xl text-2xl md:text-3xl flex flex-col gap-6 font-extralight tracking-tight">
          <h1 className="font-bold text-5xl tracking-tighter my-12">
            Garvin Chimone
          </h1>

          <p className="mx-auto w-full max-w-7xl text-justify text-3xl">
            I&apos;m a <b className="font-medium text-purple-700">Frontend-Focused Full-Stack Software Engineer</b>.
            I build web apps with React, TypeScript, Node.js, Supabase
            and PostgreSQL, and I also have hands-on experience with Angular.
            Previously I&apos;ve worked at Kasi Connect KC and Growit MC. Most of my
            work sits on the frontend, but I like owning a feature end to end,
            from the database schema to the UI. I&apos;m now learning AWS cloud and
            working toward AWS certifications, because I want to understand how
            the apps I build are deployed, secured and scaled. Besides code, I
            enjoy reading, mathematics and currently learning Spanish. I live
            in <b className="font-medium text-purple-700">Benoni, South Africa</b> where the local time is{" "}
            <span className="inline-block w-[10em] whitespace-nowrap text-left tabular-nums font-medium text-purple-700">{time}</span>. Thanks for stopping by.
          </p>
        </div>

        <div className="w-full max-w-7xl mt-14">
          <h2 className="text-3xl">Projects</h2>
        </div>
      </main>
    </div>
  );
};

export default Home;
