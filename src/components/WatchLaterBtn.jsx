import { useData } from "../context/userdata-context";
import { useAuth } from "../context/auth-context";
import { useVideo } from "../context/video-context";
import { useDataCall } from "../hooks/userdataAPICalls";

export function WatchLaterBtn({item}){
    const { stateData } = useData();
    const { login } = useAuth();
    const { dispatch } = useVideo();
    const { addToWatchLater, removeFromWatchLater } = useDataCall()

    return(
        <>
            {
                stateData.watchLater.find(video => video._id === item._id) ? 
                    <div 
                        onClick={() => removeFromWatchLater(item._id)} 
                        className="watch-later-btn"
                    >
                        <i style={{color: "#3d41d7"}} className="fas fa-check"></i>
                    </div> 
                    :
                    <div 
                        onClick={() => login ? addToWatchLater(item) : dispatch({type: "TOGGLE_LOGIN_MODAL"}) } 
                        className="watch-later-btn"
                    >
                        <i className="fas fa-clock"></i>
                    </div>
            }
            
        </>
        
    )
}