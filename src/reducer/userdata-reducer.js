export const dataReducer = ( stateData, action ) => {
    switch (action.type) {

        case "FETCH_DATA": 
            const { likedVideos: liked, history, watchLater, allNotes, playlist } = action.payload;
            return { ...stateData, liked, history, watchLater, playlist, allNotes };
            
        // Liked Videos

        case "ADD_TO_LIKE": 
            return {...stateData, liked: [...stateData.liked, action.payload] };

        case "REMOVE_FROM_LIKE": 
            return {...stateData, liked: [...stateData.liked.filter(item => item._id !== action.payload)] };
        
        // History 

        case "ADD_TO_HISTORY":
                return {...stateData, history: [ ...stateData.history.filter(item => item._id !== action.payload._id), action.payload ]};
    
        case "REMOVE_FROM_HISTORY":
            return { ...stateData, history: stateData.history.filter(item => item._id !== action.payload)}
        // Watch Later

        case "ADD_TO_WATCHLATER": 
            return {...stateData, watchLater: [...stateData.watchLater, action.payload]};

        case "REMOVE_FROM_WATCHLATER":
            return { ...stateData, watchLater: [ ...stateData.watchLater.filter(item => item._id !== action.payload)]};
        
        // All Notes 

        case "ADD_NEW_NOTES":
            return { ...stateData, allNotes: [...stateData.allNotes, { _id: action.payload.videoId, notes: [ action.payload.inputValue ]}]}

        case "ADD_NOTES":
            return { ...stateData, allNotes: stateData.allNotes.map(item => item._id === action.payload.videoId ? { ...item, notes: [...item.notes, action.payload.inputValue ]} : item )};
        
        // Playlist

        case "TOGGLE_MODAL":
            return { ...stateData, playlistModal: { show: !stateData.playlistModal.show, video: action.payload } };

        case "CREATE_PLAYLIST":
            return { ...stateData, playlist: [...stateData.playlist, { ...action.payload }] }
    
        case "ADD_TO_PLAYLIST": 
            return { ...stateData, playlist: stateData.playlist.map(item => item._id === action.payload.playlistId ? {...item, list: [...item.list, action.payload.video]} : item ) };

        case "REMOVE_FROM_PLAYLIST":
            return { ...stateData, playlist: stateData.playlist.map(item => item._id === action.payload.playlistId ? {...item, list: item.list.filter(video => video._id !== action.payload.videoId )} : item )};

        case "REMOVE_PLAYLIST":
            return {...stateData, playlist: stateData.playlist.filter(list => list._id !== action.payload) };

        default:
            break;
    }
}
