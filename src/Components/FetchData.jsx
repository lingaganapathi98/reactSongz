import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import playbutton from '../images/play-button.png';
import songs from '../Mapper.json';

const song2 = songs.songs;

const FetchData = () => {
  const [data, setData] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [songz, setSongz] = useState([
    /* {
      "id": 1,
      "title": "Hukkum",
      "artist": "Anirudh",
      "src": "https://download.dlweb.one/files/Tamil%20Mp3%20Songs/Jailer/Hukum%20-%20Thalaivar%20Alappara.mp3"
    },
    {
      "id": 2,
      "title": "Hukkum",
      "artist": "Anirudh",
      "src": "https://download.dlweb.one/files/Tamil%20Mp3%20Songs/Jailer/Hukum%20-%20Thalaivar%20Alappara.mp3"
    } */
  ]);
  const audioRef = useRef(null);
  

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
      /* console.log("formattedSongs :"+formattedSongs); */
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
    setTimeout(() => {
      audioRef.current.play();
    }, 0);
  };

  return (
    <div>
      <h2>Read Excel from Google Drive</h2>
      <button >Fetch Excel</button>
      <div className="container">
            <h2>Song List</h2>
            <div className="cardContainer">
            {songz.map((song) => (
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
                <audio ref={audioRef} src={currentSong.src}  />
              )}
              {currentSong && (
                <div>
                  <h3>{currentSong.title}</h3>
                  <h4>{currentSong.artist}</h4>
      
                  
                </div>)}
            </div>
          </div>
      {/* <table border="1">
        {/* <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead> 
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
      {/* {data.filter((row, index)=> index!==0).map((row, index)=> (
        <div key={index} className="card">
          {Object.values(row).filter((value,i)=>i!=0).map((value, i) => (
            <h3 key={i}>{value}</h3>
          )
          )}
        </div>
      ))} 
      <pre>{JSON.stringify(data, null, 2)}</pre>*/}

    </div>
  );
};

export default FetchData;
