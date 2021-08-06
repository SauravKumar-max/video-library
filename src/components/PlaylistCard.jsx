import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/userdata-context";



export function PlaylistCard({item}){
    const [ showRemove, setShowRemove ] = useState(false);
    const { dispatchData } = useData();
    const { _id, name, list } = item;
    const firstVideo = list[ list.length - 1 ];

    async function removePlaylist(){
        dispatchData({ type: "REMOVE_PLAYLIST", payload: _id });
        try{
            const api = 'https://Video-Library-Backend.sauravkumar007.repl.co/userdata/playlist/remove'
            await axios.post(api, { playlistId: _id });
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="playlist-card">

            {
                list.length !== 0 &&
                <Link to={`/playlists/${_id}`} 
                    className="full-overlay"
                >
                    Show All
                </Link> 
            }
            <div className="playlist-box">
                {
                    list.length === 0 ? 
                    <p className="empty-playlist-box"> No Videos </p> 
                    : 
                    <img src={firstVideo.thumbnail} alt="thumbnail"/>
                }
                <div className="overlay-text">
                    <p>{list.length}</p>
                    <i className="fas fa-list"></i>
                </div>
            </div>
            
            <div className="delete-btn">
            {showRemove && <div className="backdrop" onClick={() => setShowRemove(false)}></div>}
                <p>{name}</p>
                <button className="remove-btn"
                onClick={() => setShowRemove(true)}
                >
                    <i className="fas fa-ellipsis-v"></i> 
                </button>
                {                
                    showRemove && 
                    <div className="remove-modal" 
                        onClick={ removePlaylist }
                    > 
                        <i className="far fa-trash-alt"></i> 
                        Remove                    
                    </div>
                }
            </div>

        </div>
    )
}