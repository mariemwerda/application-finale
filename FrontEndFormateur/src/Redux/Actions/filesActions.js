import { FileService } from "../../Services/File-services.js"
export const GetFileByFormation = (id) => {
    return (dispatch) => {
        FileService.GetFileByFormation(id)
            .then(res => {
                dispatch({
                    type: "GET_FILES_BY_FORMATION",
                    payload: res.data
                })
            }).catch((error) => console.log(error));
    }
}
export const loadSinglefile = (_id) => {
    return (dispatch) => {
        FileService.GetFileById(_id)
            .then((res) => {
                dispatch({
                    type: "GET_SINGLE_FILE",
                    payload: res.data
                });
            }).catch((error) => console.log(error));
    }
}

export const addfile = (file) => {
    return (dispatch) => {
        FileService.AddFile(file)
            .then((res) => {
                dispatch({
                    type: "ADD_FILE",
                    payload: res.data
                })
            }).catch((error) => console.log(error));
    }
}
export const deletefile = (_id) => {
    return dispatch => {
        FileService.DeleteFile(_id)
            .then((res) => {
                dispatch({
                    type: "DELETE_FILE",
                    payload: _id
                })
            }).catch((error) => console.log(error));
    }
}
export const modifierFile = (file) => {
    return dispatch => {
        FileService.EditFile(file)
            .then((res) => {
                dispatch({
                    type: "UPDATE_FILE",
                    payload: res.data
                })
            }).catch((error) => console.log(error));
    }
}
