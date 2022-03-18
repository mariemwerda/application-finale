const initialState={
    formations:[],
    formation:{}
    };
    const formationsReducers =(state=initialState,action)=>{
        switch(action.type){
        case "GET_USER_BY_MAIL":
            return { ...state,
                user:action.payload };
      
                default: return state
            }
        }
        export default formationsReducers
        