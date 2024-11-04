const Navbar = () => {
    return (
        <nav className="p-6 flex flex-row justify-between">
          <h2 className="text-4xl font-bold w-1/5">GARVIN</h2>

          <div className="w-40 flex flex-row justify-between">
            <p className="w-1/2">LinkedIn</p>
            <p className="w-1/2">Github</p>
          </div>
        </nav>
    )
}

export default Navbar