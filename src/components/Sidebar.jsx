import { NavLink } from "react-router-dom";

export function Sidebar(){
    return(
        <>
            <div className="sidebar-container">
                <ul className="sidebar-lists">
                
                    <li className="sidebar-item">
                        <NavLink end to="/" activeStyle={{color: "#3d41d7"}}>
                            <i className="fas fa-home"></i>
                            Home
                        </NavLink>
                    </li>

                    <li className="sidebar-item">
                        <NavLink to="/playlists" activeStyle={{color: "#3d41d7"}}>
                            <i className="fas fa-list"></i>
                            Playlist
                        </NavLink>
                    </li>

                    <li className="sidebar-item">
                        <NavLink to="/watch-later" activeStyle={{color: "#3d41d7"}}>
                            <i className="fas fa-clock"></i>
                            Watch Later
                        </NavLink> 
                    </li>

                    <li className="sidebar-item">
                        <NavLink to="/liked-videos" activeStyle={{color: "#3d41d7"}}>
                            <i className="fas fa-thumbs-up"></i>
                            Liked Videos
                        </NavLink>
                    </li>

                    <li className="sidebar-item">
                        <NavLink to="/history" activeStyle={{color: "#3d41d7"}}>
                            <i className="fas fa-history"></i>
                            History
                        </NavLink>
                    </li>

                </ul>            
            </div>

            {/* Bottome navigation bar for mobiles */}

            <div className="bottom-navigation-bar">
                <ul>
                    <li>
                        <NavLink end to="/" activeStyle={{color: "#3d41d7"}}>
                            <i className="fas fa-home"></i>
                            Home
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to="/playlists" activeStyle={{color: "#3d41d7"}}>
                            <i className="fas fa-list"></i>
                            Playlist
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/watch-later" activeStyle={{color: "#3d41d7"}}>
                            <i className="fas fa-clock"></i>
                            Watch Later
                        </NavLink> 
                    </li>

                    <li>
                        <NavLink to="/liked-videos" activeStyle={{color: "#3d41d7"}}>
                            <i className="fas fa-thumbs-up"></i>
                            Liked Videos
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/history" activeStyle={{color: "#3d41d7"}}>
                            <i className="fas fa-history"></i>
                            History
                        </NavLink>
                    </li>

                </ul>

            </div>

        </>
    )
}

