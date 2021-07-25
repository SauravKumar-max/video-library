import { usePlaylist } from "../context/playlist-context";
import { CreatePlaylist } from "./index";

export function PlaylistModal(){
    const { statePlaylist, dispatchPlaylist } = usePlaylist();
    const { playlist, toggleModal } = statePlaylist;

    return(
        <div className="playlist-modal">
            <div className="playlist-container">
                <div className="playlist-heading">
                    <p>Add To.. </p>
                    <i onClick={() => {
                        dispatchPlaylist({type: "HIDE_MODAL"});
                        dispatchPlaylist({type: "HIDE_CREATE"})
                    }} 
                    className="fas fa-times">
                    </i>
                </div>

                <div className="playlist-items">
                    {
                        Object.keys(playlist).map(key => {
                            return(
                                <label key={key}>
                                    <input 
                                    checked={playlist[key].find(item => item.id === toggleModal.id) ? true : false}
                                    onChange={ () => playlist[key].find(item => item.id === toggleModal.id) ? dispatchPlaylist({type: "REMOVE_FROM_PLAYLIST", payload: key }) : dispatchPlaylist({type: "ADD_TO_PLAYLIST", payload: key }) }
                                    type="checkbox"/>
                                    {key}
                                </label>
                            )
                        })
                    }
                </div>

                {
                    statePlaylist.createPlaylist === "show" ?
                    <CreatePlaylist/>
                    :    
                    <button className="create-btn"
                        onClick={() => dispatchPlaylist({ type: "SHOW_CREATE"})} 
                    >
                        + Create new playlist
                    </button>
                }
                
            </div>
        </div>
    )
}