import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { videoReducer } from "../reducer/video-reducer";
import axios from "axios";

const VideoList = createContext();

export function VideoListProvider({ children }) {
  const [loader, setLoader] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [state, dispatch] = useReducer(videoReducer, {
    toggleProfile: false,
    toggleLoginModal: false,
  });

  useEffect(() => {
    (async () => {
      setLoader(true);
      try {
        const api = "https://neurotube-backend.onrender.com/videos";
        const response = await axios.get(api);
        const fetchData = response.data.videos;
        setVideoData(fetchData);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <VideoList.Provider value={{ videoData, state, dispatch, loader }}>
      {children}
    </VideoList.Provider>
  );
}

export function useVideo() {
  return useContext(VideoList);
}
