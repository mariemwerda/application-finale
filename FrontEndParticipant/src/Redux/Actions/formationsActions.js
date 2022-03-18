import { GET_FORMATION_BY_FORMATEUR, DELETE_FORMATION, ADD_FORMATION, GET_SINGLE_FORMATION, UPDATE_FORMATION } from "../types"
import { FormationService } from "../../Services/Formation-service.js"
export const GetFormationByFormateur = () => {
    return (dispatch) => {
        FormationService.GetFormationByFormateur()
            .then(res => {
                dispatch({
                    type: GET_FORMATION_BY_FORMATEUR,
                    payload: res.data
                })
            }).catch((error) => console.log(error));
    }
}
export const GetFormations = () => {
    return (dispatch) => {
        FormationService.GetFormations()
            .then(res => {
                dispatch({
                    type: "GET_FORMATIONS",
                    payload: res.data
                })
            }).catch((error) => console.log(error));
    }
}

export const loadSingleformation = (_id) => {
    return (dispatch) => {
        FormationService.GetFormationById(_id)
            .then((res) => {
                dispatch({
                    type: GET_SINGLE_FORMATION,
                    payload: res.data
                });
            }).catch((error) => console.log(error));
    }
}
export const addformation = (formation) => {
    return (dispatch) => {
        FormationService.AddFormation(formation)
            .then((res) => {
                dispatch({
                    type: ADD_FORMATION,
                    payload: res.data
                })
            }).catch((error) => console.log(error));
    }
}
export const deleteformation = (_id) => {
    return dispatch => {
        FormationService.DeleteFormation(_id)
            .then((res) => {
                dispatch({
                    type: DELETE_FORMATION,
                    payload: _id
                })
            }).catch((error) => console.log(error));
    }
}
export const modifierFormation = (formation) => {
    return dispatch => {
        FormationService.EditFormation(formation)
            .then((res) => {
                dispatch({
                    type: UPDATE_FORMATION,
                    payload: res.data
                })
            }).catch((error) => console.log(error));
    }
}
