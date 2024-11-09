import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"

const Navbar = () => {
  return (
    <nav className="p-6 flex flex-row justify-between mb-10">
      <h2 className="text-4xl font-bold w-1/5">GARVIN</h2>

      <div className="w-20 flex flex-row justify-between text-4xl items-center">
        <a href="https://www.linkedin.com/in/garvin-chimone/" target="_blank">
          <LinkedInIcon fontSize="inherit" className="w-1/2">
            LinkedIn
          </LinkedInIcon>
        </a>
        <a href="https://github.com/Chimoneg27" target="_blank">
          <GitHubIcon fontSize="inherit" className="w-1/2">
            GitHub
          </GitHubIcon>
        </a>
      </div>
    </nav>
  )
}

export default Navbar
