import { useData } from "../context/userdata-context";
import axios from "axios";
import { useAuth } from "../context/auth-context";
import { useVideo } from "../context/video-context";

export function WatchLaterBtn({item}){
    const { stateData, dispatchData } = useData();
    const { login } = useAuth();
    const { dispatch } = useVideo();

    async function addToWatchLater(video){
        dispatchData({type: "ADD_TO_WATCHLATER", payload: video})
        try {
            const api = `https://Video-Library-Backend.sauravkumar007.repl.co/userdata/watchLater/${video._id}`;
            await axios.post(api);
        } catch (error) {
            console.log(error)
        }
    }

    async function removeFromWatchLater(_id){
        dispatchData({type: "REMOVE_FROM_WATCHLATER", payload: _id})
        try {
            const api = `https://Video-Library-Backend.sauravkumar007.repl.co/userdata/watchLater/${_id}`;
            await axios.delete(api);
        } catch (error) {
            console.log(error) 
        }
    }

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