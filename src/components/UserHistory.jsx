import { useVideo } from "../context/video-context";
import { HorizontalCard } from "./index";

export function UserHistory(){
    const { state } = useVideo();
    const { history } = state;
    return( 
        <div className="history">
            {history.length === 0 ? 
            <div className="empty-page"> 
                <p>Your Watch History is Empty!</p> 
                <i class="far fa-sad-tear"></i>
            </div> 
            : 
            <p className="page-title">History</p> }
            <div className="page-cards">
                {history.map(item => {
                    return(
                        <HorizontalCard key={item.id} item={item}/>
                    )
                })}
            </div>
            
        </div>
    )
}