import { useData } from "../../context/userdata-context";
import { Sidebar, PlaylistCard } from "../../components/index";

export function Playlist(){
    const { stateData } = useData();
    const { playlist } = stateData;
    return(
        <div className="grid">
            <Sidebar/>
            <div className="page-grid">
            {
                playlist.length === 0 ? 
                    <div className="empty-page"> 
                        <p> No Playlist To Show. </p> 
                        <i className="far fa-sad-tear"></i>
                    </div> 
                : 
                    <p className="page-title">Playlists</p> 
            }
                <div className="playlists">
                    {
                        playlist.map(item => {
                        return(
                            <PlaylistCard key={item._id} item={item} from={"playlist"}/>
                        )
                        })
                    }
                </div>
            </div>
        </div>
    )
}