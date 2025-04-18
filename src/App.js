import './App.css';
import Header from './Components/Header';
import ListOfSongs from './Components/ListOfSongs';
import FunctionProvider from './Components/FunctionProvider';
import AudioPlayer from './Components/AudioPlayer';
import AddSong from './Components/AddSong';
import FetchData from './Components/FetchData';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header></Header>
      {/* <FetchData></FetchData> */}
      <Routes>
        <Route path="/" element={<AudioPlayer />} />
        <Route path="/addsong" element={<AddSong />} />
      </Routes>
    </Router>
  );
}

export default App;
