import { useState } from "react";
import { Link } from "react-router-dom";
import { useDataCall } from "../hooks/userdataAPICalls";



export function PlaylistCard({item}){
    const [ showRemove, setShowRemove ] = useState(false);
    const { removePlaylist } = useDataCall()
    const { _id, name, list } = item;
    const firstVideo = list[ list.length - 1 ];

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
                        onClick={ () => removePlaylist(_id) }
                    > 
                        <i className="far fa-trash-alt"></i> 
                        Remove                    
                    </div>
                }
            </div>

        </div>
    )
}