import { createContext, useContext, useReducer } from "react";
import { playlistReducer } from "../reducer/playlist-reducer";


const Playlist = createContext();

export function PlaylistProvider({children}){
    const [ statePlaylist, dispatchPlaylist ] = useReducer(playlistReducer, { toggleModal: null, createPlaylist: "hide", inputEl: "", playlist: { Learning: [], Testing: [] }, currentPlaylist: "" })
    return(
        <Playlist.Provider value={{ statePlaylist, dispatchPlaylist }}>
            {children}
        </Playlist.Provider>
    )
}

export function usePlaylist(){
    return useContext(Playlist);
}
