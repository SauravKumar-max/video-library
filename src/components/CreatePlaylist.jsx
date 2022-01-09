import { useRef, useEffect, useState } from "react";
import { useData } from "../context/userdata-context";
import { Loader } from "./index";
import { useDataCall } from "../hooks/userdataAPICalls";

export function CreatePlaylist(){
    const [ inputValue, setValue ] = useState("");
    const { stateData } = useData();
    const playlistInput = useRef(null);
    const { video } = stateData.playlistModal;
    const { loader, createNewPlaylist } = useDataCall();

    useEffect(() => {
        playlistInput.current.focus();
    }, [playlistInput]);

    return(
        <div className="create-playlist">
            <input 
                ref={playlistInput}
                value={inputValue}
                onChange={ (e) => setValue(e.target.value) } 
                maxLength="15"
                className="text-input" 
                placeholder="Enter Playlist Name... "
                type="text"
            />
            <button 
                onClick={ () => createNewPlaylist(inputValue, video, setValue) } 
                className="primary-btn"
                disabled={inputValue === "" ? true : false }
            >
                { loader ? <Loader color={"#fff"}/> : "Create" }
            </button>
        </div>
    )
}
