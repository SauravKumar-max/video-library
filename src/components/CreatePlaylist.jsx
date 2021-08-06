import { useRef, useEffect, useState } from "react";
import { useData } from "../context/userdata-context";
import { Loader } from "./index";
import axios from "axios";

export function CreatePlaylist(){
    const [ inputValue, setValue ] = useState("");
    const [ loader, setLoader ] = useState(false);
    const { stateData, dispatchData } = useData();
    const playlistInput = useRef(null);
    const { video } = stateData.playlistModal;

    useEffect(() => {
        playlistInput.current.focus();
    }, [playlistInput]);

    async function createNewPlaylist(){
        setLoader(true);
        try {
            const api = 'https://Video-Library-Backend.sauravkumar007.repl.co/userdata/playlist';
            const response = await axios.post(api, {name: inputValue, _id: video._id });
            const { updatedList } = response.data;
            const _id = updatedList[updatedList.length - 1]._id;
            setLoader(false);
            dispatchData({type: "CREATE_PLAYLIST", payload: { _id, name: inputValue, list:[video] }});
            setValue("");
        } catch (error) {
            console.log(error);
        }
    }

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
                onClick={ createNewPlaylist } 
                className="primary-btn"
                disabled={inputValue === "" ? true : false }
            >
                { loader ? <Loader color={"#fff"}/> : "Create" }
            </button>
        </div>
    )
}
