import { useNavigate } from "react-router-dom";
import { WatchLaterBtn } from "./index";
import { useData } from "../context/userdata-context";
import { useState } from "react";
import { useDataCall } from "../hooks/userdataAPICalls";


export function HorizontalCard({ item, type, playlistId }){
    const [ showRemove, setShowRemove ] = useState(false);
    const { _id, thumbnail, title, channelName, time, duration, description } = item;
    const { dispatchData } = useData();
    const { removeFromHistory, removeFromLike, removeFromWatchLater, removeFromPlaylist } = useDataCall();
    const navigate = useNavigate();

    
    function allRemoveActions(type, _id, playlistId){
        switch (type) {
            case "removeFromHistory":
                return removeFromHistory(_id);
            
            case "removeFromLike":
                return removeFromLike(_id);

            case "removeFromWatchLater":
                return removeFromWatchLater(_id);

            case "removeFromPlatlistItems": 
                return removeFromPlaylist(playlistId, _id);
        
            default:
                return null;
        }
    }

    return(
        <div className="hz-card">
            <div className="positioned">
                <img 
                    onClick={() => navigate(`/video/${_id}`)} 
                    className="thumbnail" src={thumbnail} 
                    alt="thumbnail" 
                />
                <WatchLaterBtn item={item}/>
                <div 
                    onClick={() => dispatchData({ type:"TOGGLE_MODAL", payload: item })} 
                    className="playlist-btn"
                >
                    <i className="fas fa-list"></i>
                </div>
            </div>

            <div className="videocard-info">    
                <div className="hz-duration">{duration}</div>
                <div className="hzvideocard-text">
                    <div to={`/video/${_id}`} 
                        onClick={() => navigate(`/video/${_id}`)} 
                        className="title"
                        title={title}
                    >
                        {title}
                    </div>
                    
                    <p className="channel-name">{channelName}</p>
                    <p className="time">{time}</p>
                    <p className="description">{description}</p>

                </div>
                <div className="remove-modal-btn">
                    {
                        showRemove && 
                        <div 
                            className="backdrop" 
                            onClick={() => setShowRemove(false)}
                        >
                        </div>
                    }

                    <button onClick={() => setShowRemove(true)}>
                        <i className="fas fa-ellipsis-v"></i>
                    </button>

                    {
                        showRemove &&
                        <div 
                            className="remove-modal" 
                            onClick={ () => allRemoveActions(type, _id, playlistId) }
                        > 
                            <i className="far fa-trash-alt"></i> 
                            Remove                    
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}