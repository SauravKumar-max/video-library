import './App.css';
import { LoginModal, Navbar, PlaylistModal, Snackbar } from "./components/index";
import { Routes, Route } from "react-router-dom";
import { Home, VideoPlayer, History, WatchLater, Like, Login, SignUp, Playlist, PlaylistItems, PrivateRoute } from "./pages/index";
import { useData } from './context/userdata-context';
import { useVideo } from './context/video-context';


function App() {
  const { stateData } = useData();
  const { state } = useVideo();
  return (
    <div className="App">
      { stateData.playlistModal.show && <PlaylistModal/> }
      { state.toggleLoginModal && <LoginModal/> }
      { stateData.snackbar.show && <Snackbar/> }
      <Navbar/>
      <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/video/:id" element={ <VideoPlayer/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/signup" element={ <SignUp/> } />
          <PrivateRoute path="/watch-later" element={ <WatchLater/>} />
          <PrivateRoute path="/liked-videos" element={ <Like/> } />
          <PrivateRoute path="/playlists" element={ <Playlist/> } />
          <PrivateRoute path="/playlists/:id" element={ <PlaylistItems/> } />
          <PrivateRoute path="/history" element={ <History/> } />
      </Routes>
    </div>
  );
}

export default App;
