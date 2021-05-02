import { useVideo } from "../context/video-context";
import { HorizontalCard } from "./index";

export function WatchLater(){
    const { state } = useVideo();
    const { watchLater } = state;
    return(
        <div className="watch-later">
            { state.watchLater.length === 0 ?
                <div className="empty-page"> 
                    <p>This List Has No Videos.</p> 
                    <i className="far fa-frown-open"></i>
                </div>  
                :
                <p className="page-title">Watch Later</p> 
            }
            <div className="page-cards">
                {watchLater.map(item => {
                    return(
                            <HorizontalCard item={item} />
                    )
                })}
            </div>
                  
        </div>
        
    )
}