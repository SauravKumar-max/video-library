import { Sidebar, HorizontalCard, SkeletonHorizontalCard } from "../../components/index";
import { useData } from "../../context/userdata-context";

export function WatchLater(){
    const { stateData, dataLoader } = useData();
    const { watchLater } = stateData;
    return(
        <div className="grid">
            <Sidebar/>
            <div className="page-grid">
                {   dataLoader ? <SkeletonHorizontalCard/> 
                    :
                    watchLater.length === 0 ?
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
                                <HorizontalCard key={item._id} item={item} type={"removeFromWatchLater"}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
} 