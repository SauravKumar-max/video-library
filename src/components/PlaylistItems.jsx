import { usePlaylist } from "../context/playlist-context";
import { Sidebar, HorizontalCard } from "./index";

export function PlaylistItems(){
    const { statePlaylist } = usePlaylist();
    const { playlist, currentPlaylist } = statePlaylist;
    return(
        <div className="grid">
            <Sidebar/>
            <div className="history">
                <p className="page-title"> Playlist - { currentPlaylist } </p>
                {playlist[currentPlaylist].map(item => {
                    return(
                        <HorizontalCard key={item.id} item={item}/>
                    )
                })}
            </div>
        </div>
    )
}