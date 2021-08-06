import { HorizontalCard, Sidebar, SkeletonHorizontalCard } from "../../components/index";
import { useData } from "../../context/userdata-context";

export function History(){
    const { stateData, dataLoader } = useData();
    const { history } = stateData;
    return(
        <div className="grid">
            <Sidebar/>
            <div className="page-grid">
                {
                    dataLoader ? <SkeletonHorizontalCard/> 
                    :
                    history.length === 0 ? 
                    <div className="empty-page"> 
                        <p>Your Watch History is Empty!</p> 
                        <i className="far fa-sad-tear"></i>
                    </div> 
                    : 
                    <p className="page-title">History</p> 
                }
                    <div className="page-cards">
                        {history.map(item => {
                            return(
                                <HorizontalCard key={item._id} item={item} type={"removeFromHistory"}/>
                            )
                        })}
                    </div>
            </div>         
        </div>
    )
}