
export const videoReducer = (state, action) => {    
    switch (action.type) {
        case "PLAY_VIDEO":
            return { ...state, currentVideo: state.data.find(item => item.id === action.payload)};

        case "ADD_TO_HISTORY":
            return {...state, history: [ ...state.history.filter(item => item.id !== action.payload.id), action.payload ]};

        case "ADD_TO_LIKE": 
            return {...state, liked: [...state.liked, action.payload] };

        case "REMOVE_FROM_LIKE": 
            return {...state, liked: [...state.liked.filter(item => item.id !== action.payload)] };
        
        case "ADD_TO_WATCHLATER": 
            return {...state, watchLater: [...state.watchLater, action.payload]};

        case "REMOVE_FROM_WATCHLATER":
            return { ...state, watchLater: [ ...state.watchLater.filter(item => item.id !== action.payload)]};
        
        case "ADD_NOTES":
            return { ...state, data: [...state.data.map(item => item.id === state.currentVideo.id ? {...item, allNotes: [...item.allNotes, action.payload] } : item )]}
        default:
            break;
    }
}