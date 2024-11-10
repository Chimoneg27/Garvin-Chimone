import styles from "../styles/Intro.module.css"
import { useState, useEffect } from "react"

const Intro = () => {
  const [windowsWidth, setWindowsWidth] = useState(0)

  useEffect(() => {
    setWindowsWidth(window.innerWidth)
  }, [])

  const getBlocks = () => {
    const blockSize = windowsWidth * 0.05
    const nbOfBlocks = Math.ceil(window.innerHeight / blockSize)
    return [...Array(nbOfBlocks).keys()].map((_, index) => {
        return <div onMouseEnter={(e) => {colorize(e.target)}} key={index}></div>
    })
  }

  const colorize = (el) => {
    el.style.backgroundColor = 'black'

    setTimeout( () => {
      el.style.backgroundColor = 'transparent';
    }, 300)
  }

  return (
    <div
      className={`${styles.container} w-full h-auto mt-20 mb-20 flex flex-col items-center justify-center`}
    >
      <div className={`${styles.body} flex flex-col items-center p-2 justify-between h-40`}>
        <h1 className="w-full text-3xl text-center font-bold">GARVIN CHIMONE</h1>

        <p className="w-full mt-4 text-center text-lg">
          Hello! I&apos;m Garvin, a web developer dedicated to delivering top-notch solutions for
          your needs.
        </p>
      </div>

      <div className={styles.grid}>
        {windowsWidth > 0 &&
          [...Array(20).keys()].map((_, index) => {
            return (
              <div key={"b_" + index} className={styles.column}>
                {getBlocks()}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Intro
