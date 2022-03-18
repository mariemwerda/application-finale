
const initialState={
    files:[],
    file:{}
    };
    const filesReducers =(state=initialState,action)=>{
        switch(action.type){
        case "GET_FILES_BY_FORMATION":
        return{
        ...state,
        formations:action.payload,
        };

        case "GET_SINGLE_FORMATION":
            return { ...state,
            formation:action.payload };
            
        case "DELETE_FILE":
        return{
        ...state,
        files: state.files.filter(file=> file._id
        !== action.payload)
        };
        case "UPDATE_FILE":
        return {
        ...state,
        files:state.files.map(file => file._id ===
        action.payload._id ? (file = action.payload) : file)
        };
        
        default: return state
        }
        }
        export default filesReducers
        