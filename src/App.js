import './App.css';
import { Navbar, Home, VideoPlayer, History, WatchLaterPage, LikedPage, PlaylistPage, PlaylistModal, PlaylistItems} from "./components/index";
import { Routes, Route } from "react-router-dom";
import { usePlaylist } from './context/playlist-context';


function App() {
  const { statePlaylist } = usePlaylist();

  return (
    <div className="App">
      
      { statePlaylist.toggleModal !== null && <PlaylistModal/> }
      <Navbar/>
      <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/video/:id" element={ <VideoPlayer/> } />
          <Route path="/watch-later" element={ <WatchLaterPage/>} />
          <Route path="/liked-videos" element={ <LikedPage/> } />
          <Route path="/playlists" element={ <PlaylistPage/> } />
          <Route path="/playlists/:id" element={ <PlaylistItems/> } />
          <Route path="/history" element={ <History/> } />
      </Routes>
   
    </div>
  );
}

export default App;
