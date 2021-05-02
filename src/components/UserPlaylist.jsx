import { usePlaylist } from "../context/playlist-context";
import { PlaylistCard } from "./index";


export function UserPlaylist(){
    const { statePlaylist } = usePlaylist();
    const { playlist } = statePlaylist;
    return(
        <div className="history">
            {Object.keys(playlist).length === 0 ? 
                <div className="empty-page"> 
                    <p>Your Playlist is Empty!</p> 
                    <i className="far fa-sad-tear"></i>
                </div> 
            : 
                <p className="page-title">Playlists</p> }
                <div className="playlists">
                    {Object.keys(playlist).map(key => {
                        return(
                            <PlaylistCard key={key} item={key}/>
                        )
                    })}
                </div>
        </div>
    )
}