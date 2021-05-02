import { useVideo } from "../context/video-context";

export function WatchLaterBtn({item}){
    const { state, dispatch } = useVideo();
    return(
        <div>
            {
                state.watchLater.find(video => video.id === item.id) ? 
                    <div onClick={() => dispatch({type: "REMOVE_FROM_WATCHLATER", payload: item.id})} 
                        className="watch-later-btn">
                        <i style={{color: "#3d41d7"}} className="fas fa-check"></i>
                    </div> 
                    :
                    <div onClick={() => dispatch({type: "ADD_TO_WATCHLATER", payload: item})} 
                        className="watch-later-btn">
                        <i className="fas fa-clock"></i>
                    </div>
            }
            
        </div>
        
    )
}