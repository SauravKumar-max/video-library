import { Sidebar, HorizontalCard, SkeletonHorizontalCard } from "../../components/index";
import { useData } from "../../context/userdata-context";

export function Like(){
    const { stateData, dataLoader } = useData();
    return(
        <div className="grid">
            <Sidebar/>
            <div className="page-grid">
            {
                dataLoader ? <SkeletonHorizontalCard/> 
                :
                stateData.liked?.length === 0 ? 
                <div className="empty-page"> 
                    <p>You Haven't Liked Anything.</p> 
                    <i className="fas fa-heart-broken"></i>
                </div> 
                : 
                <p className="page-title">Liked Videos</p>
            }
                <div className="page-cards">
                    {stateData.liked?.map(item => {
                        return(
                            <HorizontalCard key={item._id} item={item} type={"removeFromLike"}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}