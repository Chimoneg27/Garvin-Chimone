import { Link } from "react-router"

const Books = () => {
  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col items-center px-6 py-10 md:py14">
      <div className="w-full max-w-7xl">
        <h1 className="my-8 font-bold tracking-tight sm:my-10 md:my-12">
          <Link className="underline" to="/">Garvin Chimone</Link>{" "}
          / Books 
        </h1>

        <i>The books in purple are my favorites</i>
      </div>
      
    </div>
  )
}

export default Books