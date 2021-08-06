import { useNavigate } from "react-router-dom";
import { WatchLaterBtn } from "./index";
import { useData } from "../context/userdata-context";
import { useState } from "react";
import axios from "axios";


export function HorizontalCard({item, type, playlistId}){
    const [ showRemove, setShowRemove ] = useState(false);
    const { _id, thumbnail, title, channelName, time, duration, description } = item;
    const { dispatchData } = useData();
    const navigate = useNavigate();

    
    
    async function removeFromHistory(_id){
        dispatchData({type: "REMOVE_FROM_HISTORY", payload: _id});
        try{
            const api = `https://Video-Library-Backend.sauravkumar007.repl.co/userdata/history/${_id}`;
            await axios.delete(api);
        }catch(error){
            console.log(error);
        }
    }

    async function removeFromLike(_id){
        dispatchData({type: "REMOVE_FROM_LIKE", payload: _id});
        try {
            const api = `https://Video-Library-Backend.sauravkumar007.repl.co/userdata/likedVideos/${_id}`;
            await axios.delete(api);
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

    async function removeFromPlaylist(playlistId, videoId){
        dispatchData({type: "REMOVE_FROM_PLAYLIST", payload: { playlistId, videoId }})
        try {
            const api = 'https://Video-Library-Backend.sauravkumar007.repl.co/userdata/playlist/remove';
            await axios.post(api, { playlistId, videoId });
        } catch (error) {
            console.log(error);
        }
    }

    
    function allRemoveActions(type, _id){
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
                break;
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