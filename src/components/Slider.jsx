import { motion } from "framer-motion";

const images = import.meta.glob("../assets/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
});
const imagesArr = Object.values(images);
console.log(imagesArr);

const Slider = () => {
  const duplicatedSlides = [...imagesArr, ...imagesArr];

  return (
    <div
      className="relative h-full w-full overflow-hidden py-12 bg-white mx-auto"
      style={{ width: "100%" }}
    >
      <div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent before:filter before:blur-3 after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:filter after:blur-3">
        <motion.div
          className="flex gap-8"
          animate={{
            x: ["0%", "-100%"],
            transition: {
              ease: "linear",
              duration: 17,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedSlides.map((svgString, i) => (
            <div
              key={i}
              className="w-20 h-20 flex items-center justify-center flex-shrink-0"
              dangerouslySetInnerHTML={{ __html: svgString }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slider;
