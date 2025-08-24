import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../components/ThemeContext";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

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

  const artists = spotifyData ? spotifyData.reduce((acc, obj) => {
    const artist = obj.master_metadata_album_artist_name
    acc[artist] = (acc[artist] || 0) + 1
    return acc
  }, {}) : 0;
  const totalArtists = Object.keys(artists).length

  const entriesArtists = Object.entries(artists)
    .sort((a, b) => b[1] -a[1])
    .slice(0, 20)
  
  const labels = entriesArtists.map(([name]) => name)
  // eslint-disable-next-line no-unused-vars
  const values = entriesArtists.map(([_, plays]) => plays)

  const doughnutData = {
    labels: labels,
    datasets: [{
      label: 'Play Count',
      data: values,
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        '#9966FF', '#FF9F40', '#C9CBCF', '#FF5733',
        '#33FF57', '#3357FF', '#FFC300', '#DAF7A6',
        '#900C3F', '#581845', '#1ABC9C', '#2ECC71',
        '#E74C3C', '#9B59B6', '#34495E', '#F39C12'
      ],
      borderColor: '#fff',
      borderWidth: 2
    }],
  }

  const doughnutAnimations = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  animation: {
    duration: 2000,
    easing: 'easeOutBounce',
  },
}

  const songs = spotifyData ? spotifyData.reduce((acc, obj) => {
    const song = obj.master_metadata_track_name
    acc[song] = (acc[song] || 0) + 1
    return acc
  }, {}) : 0;

  const totalSongs = Object.keys(songs).length
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="w-auto mt-20">
        <h1 className="text-4xl font-bold text-center" style={{ color: color }}>
          Music Library
        </h1>
        <p className="text-lg font-semibold text-center">
          This is my Spotify data from January 2024 to August 2025
        </p>
      </div>

      <div className="flex flex-col items-center justify-center mt-12">
        <ul className="flex flex-col gap-4 justify-center items-center"> 
          <li className="flex flex-col justify-center items-center p-3">
            {" "}
            <h2 className="text-3xl font-semibold" style={{ color: color }}>
              Minutes Played
            </h2>
            <p className="font-semibold text-2xl">
              {spotifyData ? minutesPlayed : "Loading..."}
            </p>
          </li>
          <li className="flex flex-col justify-center items-center p-3">
            {" "}
            <h2 className="text-3xl font-semibold" style={{ color: color }}>
              Artists Listened To
            </h2>
            <p className="font-semibold text-2xl">
              {spotifyData ? totalArtists : "Loading..."}
            </p>
          </li>
          <li className="flex flex-col justify-center items-center p-3">
            {" "}
            <h2 className="text-3xl font-semibold" style={{ color: color }}>
              Total Songs
            </h2>
            <p className="font-semibold text-2xl">
              {spotifyData ? totalSongs : "Loading..."}
            </p>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-3xl text-center font-bold mt-16" style={{ color: color }}>Charts</h2>
         <ul className="list-none flex flex-col justify-center items-center w-full gap-4 mt-4">
          <li className="flex flex-col justify-center items-center w-full">
            <h2 className="text-3xl font-semibold" style={{ color: color }}>Top 20 Artists</h2>
            <Doughnut data={doughnutData} options={doughnutAnimations}/>
          </li>
         </ul>
      </div>
      <Footer />
    </div>
  );
}
