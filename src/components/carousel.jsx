import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const slides = Array.isArray(images) ? images : [];

  if (slides.length === 0) return null;

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div className="mx-auto mt-10 w-full max-w-6xl">
      <div className="border-4 border-black bg-black p-2 shadow-2xl sm:p-4">
        <img
          src={slides[index]}
          alt={`Slide ${index + 1}`}
          className="h-[55vh] min-h-72 max-h-[800px] w-full bg-black object-contain"
        />

        <div className="mt-2 flex items-center justify-center gap-6 py-2 text-white">
          <button
            onClick={prev}
            className="rounded p-2 text-white transition-colors hover:text-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300"
            aria-label="Previous image"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <span className="text-sm tabular-nums">
            {index + 1} / {slides.length}
          </span>

          <button
            onClick={next}
            className="rounded p-2 text-white transition-colors hover:text-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300"
            aria-label="Next image"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
