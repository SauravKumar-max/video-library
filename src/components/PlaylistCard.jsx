import { usePlaylist } from "../context/playlist-context";
import { Link } from "react-router-dom";

export function PlaylistCard({item}){
    const { statePlaylist, dispatchPlaylist } = usePlaylist();
    const { playlist } = statePlaylist;
    const firstVideo = playlist[item][0];
    return(
        <div className="playlist-card">
            {playlist[item].length === 0 ? null : 
                <Link to={`/playlists/${item}`} 
                    className="full-overlay"
                    onClick={() => dispatchPlaylist( {type: "SHOW_CURRENT_PLAYLIST", payload: item} )}>
                    Show All
                </Link> 
            }
            <div className="playlist-box">
                {firstVideo === undefined ? 
                    <p className="empty-playlist-box"> No Videos </p> 
                    : 
                    <img src={firstVideo.thumbnail} alt="thumbnail"/>
                }
                <div className="overlay-text">
                    <p>{playlist[item].length}</p>
                    <i className="fas fa-list"></i>
                </div>
            </div>
            
            <div className="delete-btn">
                <p>{item}</p>
                {/* <button className="remove-btn"
                    onClick={() => dispatchPlaylist({type: "DELETE_PLAYLIST", payload: item}) }>
                    delete
                </button> */}
            </div>

        </div>
    )
}