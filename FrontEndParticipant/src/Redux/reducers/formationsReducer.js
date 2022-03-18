import
{GET_FORMATION_BY_FORMATEUR,DELETE_FORMATION,ADD_FORMATION,GET_SINGLE_FORMATION,UPDATE_FORMATION} from '../types.js'
const initialState={
    formations:[],
    formation:{}
    };
    const formationsReducers =(state=initialState,action)=>{
        switch(action.type){
        case GET_FORMATION_BY_FORMATEUR:
        return{
        ...state,
        formations:action.payload,
        };
        case "GET_FORMATIONS":
            return{
            ...state,
            formations:action.payload,
            };

        case ADD_FORMATION:
        return{
        ...state,
        formations : [...state.formations, action.payload],
        formation:action.payload
        };
        case DELETE_FORMATION:
        return{
        ...state,
        formations: state.formations.filter(formation=> formation._id
        !== action.payload)
        };
        case UPDATE_FORMATION:
        return {
        ...state,
        formations:state.formations.map(formation => formation._id ===
        action.payload._id ? (formation = action.payload) : formation)
        };
        case GET_SINGLE_FORMATION:
        return { ...state,
        formation:action.payload };
        default: return state
        }
        }
        export default formationsReducers
        