import React, { useState, useRef, useEffect } from "react";
import songs from '../Mapper.json';
import "../style/AudioPlayer.css";
import playbutton from '../images/play-button.png';
import pausebutton from '../images/pause-button.png';
import stopbutton from '../images/stop-button.png';
import nextbutton from '../images/next-button.png';
import prevbutton from '../images/prev-button.png';
import shufflebutton from '../images/shuffle-button.png';
import loopbutton from '../images/loop-button.png';
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

/* const songz = songs.songs; */

const AudioPlayer = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);
  const [songz, setSongz] = useState([]);
  const [audioStatus, changeAudioStatus] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const searchValue = useSelector((state) => state.searchValue);
  const [currentListofSongs, setCurrentListofSongs] = useState(songz.filter((song) => song.title.toLowerCase().includes(searchValue.toLowerCase())));

  const fileUrl = "https://docs.google.com/spreadsheets/d/1PAw0exvR4mM7nafxuCqdmoIyBiXIlHlT/edit?usp=drivesdk&ouid=113324868507289636208&rtpof=true&sd=true"; // Replace with actual file ID

  const fetchExcelFile = async () => {      
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const binaryStr = e.target.result;
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          // Transform data into required format
          const formattedSongs = parsedData.filter((row) => row.A != null).map((row) => ({
            id: String(row.__EMPTY),
            title: row.A,
            artist: row.B,
            src: row.C,
          }));
        setSongz(formattedSongs);
        };
        reader.readAsBinaryString(blob);
      } catch (error) {
        console.error("Error fetching the Excel file:", error);
      }      
    };

    useEffect(() => {
      fetchExcelFile();
    }, []);

  const playSong = (song) => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the current song if any
    }
    setCurrentSong(song);
    changeAudioStatus(true);
    setTimeout(() => {
      audioRef.current.play();
    }, 0);
  };

  const stopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentSong(null);
  };

  const nextSong = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the current song if any
    }
    if (shuffle) {
    const songs = songz.map((_, song) => song).filter(song => song !== currentSong);
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    setCurrentSong(songz[randomSong]);
    } else {
      let listOfSongs = songz.filter((song) => song.title.toLowerCase().includes(searchValue.toLowerCase()));
      const currentIndex = listOfSongs.findIndex((song) => song.id === currentSong.id);
      let nextIndex = currentIndex < listOfSongs.length - 1 ? currentIndex + 1 : 0;
      setCurrentSong(listOfSongs[nextIndex]);
    }
    setTimeout(() => {
      audioRef.current.play();
    }, 0);
  };
  const prevSong = () => {
    /* console.log("inside prev song"); */
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the current song if any
    }
    let listOfSongs = songz.filter((song) => song.title.toLowerCase().includes(searchValue.toLowerCase()));
    const currentIndex = listOfSongs.findIndex((song) => song.id === currentSong.id);
    let prevIndex = currentIndex === 0 ? listOfSongs.length-1 : currentIndex - 1;
    setCurrentSong(listOfSongs[prevIndex]);
    setTimeout(() => {
      audioRef.current.play();
    }, 0);
  };

  const shuffleSong = () => {
    setShuffle(shuffle === false ? true : false);
    /* console.log("inside shuffle song"); */
  }

  const startAudio = () => {
    audioRef.current.play();
    changeAudioStatus(true);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    changeAudioStatus(false);
  };

  return (
    <div className="container">
      <h2>Song List</h2>
      <div className="cardContainer">
      {songz.filter((song) => song.title.toLowerCase().includes(searchValue.toLowerCase())).map((song) => (
          <div key={song.id} className="card">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <button className="card-button"
              onClick={() => playSong(song)}
            >
              <img src={playbutton} alt="play" className="card-image"></img>
            </button>
          </div>
        ))}
      </div>
      <div className="sticky-card">
        {currentSong && (
          <audio ref={audioRef} src={currentSong.src} onEnded={nextSong} />
        )}
        {currentSong && (
          <div>
            <h3>{currentSong.title}</h3>
            <h4>{currentSong.artist}</h4>

            <button className="button-play" onClick={() => nextSong()}>
              <img src={nextbutton} alt="next" className="card-image"></img></button>
            {audioStatus ? (
              <button className="button-pause" onClick={() => pauseAudio()}>
                <img src={pausebutton} alt="pause" className="card-image"></img></button>
            ) : (
              <button className="button-play" onClick={() => startAudio()}>
                <img src={playbutton} alt="play" className="card-image"></img></button>
            )}
            <button className="button-play" onClick={() => stopSong()}>
              <img src={stopbutton} alt="stop" className="button-stop"></img></button>
            <button className="button-play" onClick={() => prevSong()}>
              <img src={prevbutton} alt="prev" className="card-image"></img></button>
            {shuffle ? (
              <button className="button-pause" onClick={() => shuffleSong()}>
              <img src={shufflebutton} alt="shuffle" className="button-loop"></img></button>
            ) : (
            <button className="button-play" onClick={() => shuffleSong()}>
              <img src={loopbutton} alt="play" className="button-loop"></img></button>
            )}
          </div>)}
      </div>
    </div>
  );
};

export default AudioPlayer;
