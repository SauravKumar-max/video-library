import { useVideo } from "../context/video-context";
import { HorizontalCard } from "./index";

export function UserLikedVideo(){
    const { state } = useVideo();
    return(
        <div className="user-liked">
            {
            state.liked.length === 0 ? 
            <div className="empty-page"> 
                <p>You Haven't Liked Anything.</p> 
                <i className="fas fa-heart-broken"></i>
            </div> 
            : 
            <p className="page-title">Liked Videos</p>
            }
            <div className="page-cards">
                {state.liked.map(item => {
                    return(
                        <HorizontalCard key={item.id} item={item}/>
                    )
                })}
            </div>
        </div>
    )
}