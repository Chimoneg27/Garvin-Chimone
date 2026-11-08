import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  return (
    <nav className="mt-3 mb-2 flex w-full justify-end px-5 sm:px-8 lg:px-10">
      <ul className="flex gap-4">
        <li><a href="https://www.linkedin.com/in/garvin-chimone/" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} style={{ color: "#9814cd" }} size="lg" /></a></li>
        <li><a href="https://github.com/Chimoneg27" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} style={{ color: "#9814cd" }} size="lg" /></a></li>
        <li><a href="mailto:chimonegarvin27@gmail.com" aria-label="Email"><FontAwesomeIcon icon={faEnvelope} style={{ color: "#9814cd" }} size="lg" /></a></li>
      </ul>
    </nav>
  )
}

export default NavBar