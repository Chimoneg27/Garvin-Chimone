/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../components/ThemeContext";
import { useState, useEffect } from "react";
import { Doughnut, PolarArea, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  BarElement,
  CategoryScale,
  registerables
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, BarElement, CategoryScale, ...registerables
);

export default function Music() {
  const { color } = useTheme();
  const [spotifyData, setSpotifyData] = useState(null);

  useEffect(() => {
    import("../lib/24-25.json")
      .then((mod) => setSpotifyData(mod.default || mod))
      .catch((err) => console.error("Failed to load spotify data", err));
  }, []);

  const minutesPlayed = spotifyData
    ? Math.round(
        spotifyData.reduce((acc, value) => acc + (value.ms_played || 0), 0) /
          60000
      )
    : 0;

  const artists = spotifyData
    ? spotifyData.reduce((acc, obj) => {
        const artist = obj.master_metadata_album_artist_name;
        acc[artist] = (acc[artist] || 0) + 1;
        return acc;
      }, {})
    : 0;
  const totalArtists = Object.keys(artists).length;

  const entriesArtists = Object.entries(artists)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  const labels = entriesArtists.map(([name]) => name);
  const values = entriesArtists.map(([_, plays]) => plays);

  const platforms = spotifyData
    ? spotifyData.reduce((acc, obj) => {
        const platform = obj.platform;
        acc[platform] = (acc[platform] || 0) + 1;
        return acc;
      }, {})
    : 0;

  const platfromLabels = Object.keys(platforms);
  const platfromValues = Object.values(platforms);

  const polarData = {
    labels: platfromLabels,
    datasets: [
      {
        label: "Platforms Used",
        data: platfromValues,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const doughnutData = {
    labels: labels,
    datasets: [
      {
        label: "Play Count",
        data: values,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#FFC300",
          "#DAF7A6",
          "#900C3F",
          "#581845",
          "#1ABC9C",
          "#2ECC71",
          "#E74C3C",
          "#9B59B6",
          "#34495E",
          "#F39C12",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const doughnutAnimations = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
  };

  const songs = spotifyData
    ? spotifyData.reduce((acc, obj) => {
        const song = obj.master_metadata_track_name;
        if (song) {
          acc[song] = (acc[song] || 0) + 1;
        }
        return acc;
      }, {})
    : 0;

  const totalSongs = Object.keys(songs).length;

  const songsWithArtists = spotifyData
    ? spotifyData.reduce((acc, obj) => {
        const song = obj.master_metadata_track_name;
        const artist = obj.master_metadata_album_artist_name;
        if (song && artist) {
          const songWithArtist = `${song} - ${artist}`;
          acc[songWithArtist] = (acc[songWithArtist] || 0) + 1;
        }
        return acc;
      }, {})
    : 0;

  const topSongs = Object.entries(songsWithArtists)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  const topSongLabels = topSongs.map(([name]) => name);

  const topSongValues = topSongs.map(([_, plays]) => plays);
  const pieData = {
    labels: topSongLabels,
    datasets: [
      {
        label: "Plays",
        data: topSongValues,
        backgroundColor: [
          "rgba(255, 20, 147, 0.85)",
          "rgba(0, 191, 255, 0.85)",
          "rgba(50, 205, 50, 0.85)",
          "rgba(255, 69, 0, 0.85)",
          "rgba(138, 43, 226, 0.85)",
          "rgba(255, 215, 0, 0.85)",
          "rgba(220, 20, 60, 0.85)",
          "rgba(0, 206, 209, 0.85)",
          "rgba(255, 105, 180, 0.85)",
          "rgba(124, 252, 0, 0.85)",
          "rgba(255, 140, 0, 0.85)",
          "rgba(72, 61, 139, 0.85)",
          "rgba(255, 182, 193, 0.85)",
          "rgba(0, 255, 127, 0.85)",
          "rgba(219, 112, 147, 0.85)",
          "rgba(30, 144, 255, 0.85)",
          "rgba(255, 99, 71, 0.85)",
          "rgba(186, 85, 211, 0.85)",
          "rgba(255, 218, 185, 0.85)",
          "rgba(60, 179, 113, 0.85)",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const albums = spotifyData
    ? spotifyData.reduce((acc, obj) => {
        const album = obj.master_metadata_album_album_name;
        if (album) {
          acc[album] = (acc[album] || 0) + 1;
        }
        return acc;
      }, {})
    : 0;

  const albumEntries = Object.entries(albums)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  const albumLabels = albumEntries.map(([name]) => name);
  const albumValues = albumEntries.map(([_, plays]) => plays);

  const linedata = {
    labels: albumLabels,
    datasets: [
      {
        label: "Album Plays",
        data: albumValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const lineOptions =  {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    }
  }
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="w-auto mt-20">
        <h1
          className="text-4xl font-bold text-center md:text-5xl"
          style={{ color: color }}
        >
          Music Library
        </h1>
        <p className="text-lg font-semibold text-center p-2 sm:text-xl md:text-2xl">
          This is my Spotify data from January 2024 to August 2025
        </p>
      </div>

      <div className="flex flex-col items-center justify-center mt-12">
        <ul className="flex flex-col gap-4 justify-center items-center sm:flex-row">
          <li className="flex flex-col justify-center items-center p-3 sm:items-center">
            {" "}
            <h2
              className="text-3xl font-semibold sm:text-2xl md:text-3xl"
              style={{ color: color }}
            >
              Minutes Played
            </h2>
            <p className="font-semibold text-2xl">
              {spotifyData ? minutesPlayed : "Loading..."}
            </p>
          </li>
          <li className="flex flex-col justify-center items-center p-3">
            {" "}
            <h2
              className="text-3xl font-semibold sm:text-2xl md:text-3xl"
              style={{ color: color }}
            >
              Artists Listened To
            </h2>
            <p className="font-semibold text-2xl">
              {spotifyData ? totalArtists : "Loading..."}
            </p>
          </li>
          <li className="flex flex-col justify-center items-center p-3">
            {" "}
            <h2
              className="text-3xl font-semibold sm:text-2xl md:text-3xl"
              style={{ color: color }}
            >
              Total Songs
            </h2>
            <p className="font-semibold text-2xl">
              {spotifyData ? totalSongs : "Loading..."}
            </p>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2
          className="text-3xl text-center font-bold mt-16 md:text-5xl"
          style={{ color: color }}
        >
          Charts
        </h2>
        <ul className="list-none flex flex-col justify-center items-center w-full gap-10 mt-4 lg:grid lg:grid-cols-3">
          <li className="flex flex-col justify-center items-center w-full">
            <h2
              className="text-3xl font-semibold md:text-4xl"
              style={{ color: color }}
            >
              Top 20 Artists
            </h2>
            <div className="w-[400px] h-[400px] md:w-[480px] md:h-[480px] sm:w-[450px] sm:h-[450px]">
              <Doughnut data={doughnutData} options={doughnutAnimations} />
            </div>
          </li>
          <li className="flex flex-col justify-center items-center w-full">
            <h2
              className="text-3xl font-semibold md:text-4xl"
              style={{ color: color }}
            >
              Platfroms Used
            </h2>
            <div className="w-[400px] h-[400px] md:w-[480px] md:h-[480px] sm:w-[450px] sm:h-[450px]">
              <PolarArea data={polarData} />
            </div>
          </li>
          <li className="flex flex-col justify-center items-center w-full">
            <h2
              className="text-3xl font-semibold md:text-4xl"
              style={{ color: color }}
            >
              Top 20 Songs
            </h2>
            <div className="w-[300px] h-[300px] md:w-[480px] md:h-[480px] sm:w-[450px] sm:h-[450px]">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </li>
        </ul>

        <div className="flex flex-col justify-center items-center w-full mt-16">
          <h2
            className="text-3xl font-semibold md:text-4xl mb-6"
            style={{ color: color }}
          >
            Top 20 Albums
          </h2>
          <div className="w-full max-w-[800px] h-[400px] md:h-[500px]">
            <Line data={linedata} options={lineOptions}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
