import { useRef, useEffect } from "react";
import { usePlaylist } from "../context/playlist-context";

export function CreatePlaylist(){
    const { statePlaylist, dispatchPlaylist } = usePlaylist();
    const playlistInput = useRef(null);

    useEffect(() => {
        playlistInput.current.focus();
    }, [playlistInput]);

    return(
        <div className="create-playlist">
            <input 
                ref={playlistInput}
                value={statePlaylist.inputEl}
                onChange={(e) => dispatchPlaylist({ type: "TAKE_INPUT", payload: e.target.value })} 
                className="text-input" 
                placeholder="Enter Playlist Name... " 
                type="text"
            />
            <button 
                onClick={() => dispatchPlaylist({ type: "CREATE_PLAYLIST", payload: playlistInput.current.value })} 
                className="primary-btn"
                disabled={ statePlaylist.inputEl === "" ? true : false }
            >
                Create
            </button>
        </div>
    )
}