import { usePlaylist } from "../context/playlist-context";

export function PlaylistModal(){
    const { statePlaylist, dispatchPlaylist } = usePlaylist();
    const { playlist, inputEl, toggleModal } = statePlaylist;
    console.log(playlist);
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
                    <div className="create-playlist">
                        <input 
                        value={inputEl}
                        onChange={(e) => dispatchPlaylist({ type: "TAKE_INPUT", payload: e.target.value })} 
                        className="text-input" 
                        placeholder="Enter Playlist Name... " 
                        type="text"/>
                        <button 
                            onClick={() => dispatchPlaylist({ type: "CREATE_PLAYLIST", payload: inputEl })} 
                            className="primary-btn"
                            disabled={ inputEl === "" ? true : false }
                            >
                                Create
                            </button>
                    </div>
                    : 
                    <button 
                        onClick={() => dispatchPlaylist({ type: "SHOW_CREATE"})} 
                        className="create-btn"
                        >
                            + Create new playlist
                    </button>
                }
                
            </div>
        </div>
    )
}