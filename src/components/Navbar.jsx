import { Link } from "react-router-dom";

export function Navbar(){
    return(
        <nav className="navbar">
            <p>NeuroTube</p>
                           
            <div className="hamburger">
                <div></div>
                <div></div>
                <div></div>
            </div>

                            
            <ul className="navbar-lists">
                {/* <li><input placeholder="Search" /> </li> */}
                <li><Link to="/" >Home</Link></li>
                <li><Link to="playlists" >Playlist</Link></li>
                <li><Link to="history">History</Link></li>
            </ul>
        </nav>
    )
}