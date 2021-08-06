import { Sidebar, HorizontalCard, SkeletonHorizontalCard } from "../../components/index";
import { useLocation } from "react-router-dom";
import { useData } from "../../context/userdata-context";

export function PlaylistItems(){
    const { stateData, dataLoader } = useData();
    const location = useLocation();
    const splitURL = location.pathname.split("/");
    const playlistId = splitURL[splitURL.length - 1];
    const getPlaylist = stateData.playlist.find(item => item._id === playlistId);


    return(
        <div className="grid">
            <Sidebar/>
            <div className="page-grid">
                {
                    dataLoader ? <SkeletonHorizontalCard/> 
                    : 
                    getPlaylist?.list.length === 0 ? 
                    <div className="empty-page"> 
                        <p>Your Playlist is Empty!</p> 
                        <i className="far fa-sad-tear"></i>
                     </div>
                    : 
                    <p className="page-title"> Playlist - { getPlaylist?.name } </p>

                }
                <div className="page-cards">
                {
                    getPlaylist?.list.map(item => {
                        return(
                            <HorizontalCard 
                                key={item._id} 
                                item={item} 
                                type={"removeFromPlatlistItems"} 
                                playlistId={playlistId}
                            />
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}