import { createContext, useContext, useReducer, useState } from "react";
import { videoData } from "../database/database";
import { videoReducer } from "../reducer/video-reducer";

const VideoList = createContext();

export function VideoListProvider({children}){
    const [ route, setRoute ] = useState(null);
    const [ state, dispatch ] = useReducer(videoReducer, { data: videoData, currentVideo: "", history: [], watchLater: [], liked: [] });
    return(
        <VideoList.Provider value={{ state, dispatch, route, setRoute }}>
            {children}
        </VideoList.Provider>
    )
}

export function useVideo(){
    return useContext(VideoList);
}