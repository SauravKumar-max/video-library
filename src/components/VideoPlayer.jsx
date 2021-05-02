import { usePlaylist } from "../context/playlist-context";
import { useVideo } from "../context/video-context";

export function VideoPlayer(){
    const { dispatchPlaylist } = usePlaylist();
    const { state, dispatch } = useVideo();
    const videoDetails = state.data.find(item => item.id === state.currentVideo.id);
    const { id, title, time, allNotes} = videoDetails;

    const url = `https://www.youtube.com/embed/${id}`
    return(
        <div className="video-page">   
            <div className="video-player">
                <iframe 
                    src={url} 
                    title="video player" 
                    frameBorder="0" 
                    allowFullScreen>
                </iframe>

                <div className="video-details">
                    <p className="video-title">{title}</p>
                    <div className="video-action">
                        <p>{time}</p>
                        <div>
                            {
                                state.liked.find(item => item.id === id) ? 
                                <span className="liked-video" onClick={() => dispatch({type: "REMOVE_FROM_LIKE", payload: id})}> <i className="fas fa-thumbs-up"></i> </span>
                                :
                                <span onClick={() => dispatch({type: "ADD_TO_LIKE", payload: state.currentVideo})}> <i className="fas fa-thumbs-up"></i> </span>
                            }
                            {
                                state.watchLater.find(item => item.id === id) ?
                                <span className="liked-video"  onClick={() => dispatch({type: "REMOVE_FROM_WATCHLATER", payload: id})} ><i className="fas fa-clock"></i></span>
                                :
                                <span onClick={() => dispatch({type: "ADD_TO_WATCHLATER", payload: state.currentVideo})}><i className="fas fa-clock"></i></span>
                            }
                            <span onClick={() => dispatchPlaylist({type: "SHOW_MODAL", payload: state.currentVideo})}> <i className="fas fa-list"></i>  </span>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
            <div className="notes-container">
                <div className="notes-list">
                    {allNotes.map(item => {
                        return(
                            <div className="notes-items" key={item}>{item}</div>
                        )
                    })}
                </div>
                <input type="text" placeholder="Take Notes..."
                    className="text-input"
                    onKeyUp={(e) => {
                        if((e.key === "Enter") && (e.target.value !== "")){
                            dispatch({type: "ADD_NOTES", payload: e.target.value});
                            e.target.value = "";
                        }
                    }}
                />
            </div>
        </div>
    )
}
