import { useEffect, useState } from 'react'
import axios from 'axios'

import './index.css'
import Navbar from './Components/Navbar'
import Intro from './Components/Intro'
import Projects from './Components/Projects'
import Languages from './Components/Languages'
import About from './Components/About'

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios
      .get('https://api.github.com/users/Chimoneg27/repos?per_page=100')
      .then(response => {
        setProjects(response.data.sort((a, b) => {
          return new Date(b.updated_at) - new Date(a.updated_at)
        }).slice(1, 4))
      })
  }, [])

  return (
    <div className="w-full">
      <Navbar  />
      <Intro />
      <Projects gitArr={projects}/>
      <Languages />
      <About />
    </div>
  )
}

export default App
