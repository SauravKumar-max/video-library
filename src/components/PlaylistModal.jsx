import { useState } from "react";
import { useData } from "../context/userdata-context";
import { useDataCall } from "../hooks/userdataAPICalls";
import { CreatePlaylist } from "./index";

export function PlaylistModal(){
    const [ toggle, setToggle ] = useState(false);
    const { stateData, dispatchData } = useData();
    const { playlist, playlistModal } = stateData;
    const { _id: videoId } = playlistModal.video;
    const { addToPlaylist, removeFromPlaylist } = useDataCall()

    return(
        <div className="playlist-modal">
            <div className="playlist-container">
                <div className="playlist-heading">
                    <p>Add To.. </p>
                    <i onClick={() => {
                        dispatchData({type: "TOGGLE_MODAL", payload: null});
                    }} 
                    className="fas fa-times">
                    </i>
                </div>

                <div className="playlist-items">
                    { 
                        playlist.length === 0 && 
                            <p style={{
                                margin: "auto", 
                                fontSize: "0.9rem", 
                                fontWeight: "bold", 
                                color: "#3d41d7"
                            }}> 
                                Create your first Playlist. 
                            </p> 
                    }

                    {
                        playlist.map(item => {
                            const findVideo = item.list.find(item => item._id === playlistModal.video._id);
                            return(
                                <label key={item._id}>
                                    <input 
                                        checked={ findVideo ? true : false}
                                        onChange={ () => findVideo ? removeFromPlaylist(item._id, videoId) : addToPlaylist(item, videoId, playlistModal) }
                                        type="checkbox"
                                    />
                                    {item.name}
                                </label>
                            )
                        })
                    }
                </div>

                {
                    toggle ?
                    <CreatePlaylist/>
                    :    
                    <button className="create-btn"
                        onClick={() => setToggle(true)} 
                    >
                        + Create new playlist
                    </button>
                }
                
            </div>
        </div>
    )
}